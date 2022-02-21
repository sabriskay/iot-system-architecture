const csv = require('csv-parser')
const fs = require('fs')
const mqtt = require('mqtt')

function readCsv (path) {
    const results = [];

    return new Promise ((resolve, reject) => {
        fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results));
    });
}

(async function () {
    const pumpData = await readCsv("./data/demoCompressorWeekData.csv");
    const client  = mqtt.connect('mqtt://broker:1883')

    client.on('connect', function () {
        setInterval(() => {
            client.publish(`demo_ca1_t_axm`, JSON.stringify(pumpData.shift()));
        }, 10);
    });
})();

