const mqtt = require('mqtt');
const axios = require('axios');
const crypto = require('crypto');

const TIMESTAMP = 'timestamp';
const METRIC_ID = 'metricid';
const DEVICE_ID = 'deviceid';
const REC_VALUE = 'recvalue';
const CALC_VALUE = 'calcvalue';
const ECX_THRESHOLD = 'excthreshold';
const EXC_LIMIT = 'exclimit';
const DEVIATION = 'deviation';

const MAPPINGS = {
    'Psum_kW': 'Psum',
    'Psum_ng': 'Psum',
    'PSUM_KW': 'Psum',
};

(async function () {
    const client  = mqtt.connect('mqtt://broker:1883');
    const lastKnownState = {
        "Psum": {
            "value": 0
        },
    };

    client.on('connect', function () {

        // This shoulnd't be hardcoded, instead should
        // be based on the actual availalbe devices
        client.subscribe('demo_ca1_t_axm', function (err) {
            console.log(err);
        });

    });
      
    client.on('message', async function (topic, message) {
        const pumpData = JSON.parse(message.toString());
        const timestamp = pumpData[TIMESTAMP];
        const metricid = pumpData[METRIC_ID];
        const deviceid = pumpData[DEVICE_ID];
        const recvalue = pumpData[REC_VALUE];
        const calcvalue = pumpData[CALC_VALUE];
        const excthreshold = pumpData[ECX_THRESHOLD];
        const excthlimit = pumpData[EXC_LIMIT];
        const deviation = pumpData[DEVIATION];

        /**
         * In real life, we wouldn't be filtering
         * but using all values. For the sake
         * of the demo we want to focus on this 
         * only value.
         */
        //console.log(metricid, parseFloat(calcvalue));
        if (MAPPINGS[metricid] !== 'Psum') {
            return;
        }

        lastKnownState[metricid] = {
            value: calcvalue
        };

        client.publish(
            `${deviceid}/${MAPPINGS[metricid]}`,
            JSON.stringify({
                timestamp, value: calcvalue
            })
        );

        try {
            await axios.post(`${process.env.HOST}/data-points`, {
                "id": crypto.randomUUID(),
                "device_id": deviceid,
                "timestamp": new Date(parseInt(timestamp)),
                "metric_id": MAPPINGS[metricid],
                "value": parseFloat(calcvalue)
            });    
        } catch (error) {
            console.log(error.message);
        }
    });

})();

