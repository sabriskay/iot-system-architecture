import { createMachine, forwardTo, assign } from 'xstate';
import mqtt from 'mqtt';

export const machine = createMachine ({

  id: 'real_time_data_points',

  context: {
    data_points: [],
  },

  on: {

    SEND: {
      actions: forwardTo('websocket'),
    },

    ADD: {
      actions: [
        assign({ data_points: (context, event) => [
          ...context.data_points, event.data
        ]}),
      ]
    },

  },

  invoke: {

    id: 'websocket',

    src: () => (send, onReceive) => {
      
      const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
      const host = 'ws://localhost:9001';

      const options = {
        keepalive: 60,
        clientId: clientId,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
            topic: 'WillMsg',
            payload: 'Connection Closed abnormally..!',
            qos: 0,
            retain: false
        },
      }

        console.log('Connecting mqtt client')
        const client = mqtt.connect(host, options)

        client.on('error', (err) => {
            console.log('Connection error: ', err)
            client.end()
        })

        client.on('reconnect', () => {
            console.log('Reconnecting...')
        })

        client.subscribe('demo_ca1_t_axm/Psum', { qos: 0 })

        client.on('message', (topic, data, packet) => {
          console.log(data)
          send({ type: 'ADD', data });
        })

      onReceive((event) => {
        if (event.type === 'SEND') {
          client.send(event.message);
        }
      });

      return () => {
        client.disconnect();
      };
    },
  },
});