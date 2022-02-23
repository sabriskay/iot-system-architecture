import { createMachine, assign } from 'xstate';
import { createContext } from 'react';
import axios from 'axios';

const baseURL = `http://localhost:3000/historical-data/`;

export const machine = createMachine({

  id: 'data_points',

  initial: 'empty',

  context: {
    data_points: [],
    start_date: new Date('2018-08-20'),
    end_date: new Date(new Date('2018-08-20').getTime() + 86400000),
    interval: 10,
    interval_type: 'minute',
    device_id: 'demo_ca1_t_axm'
  },

  states: {

    empty: {
      always: {
        target: 'fetching'
      }
    },

    fetching: {
      invoke: {
        id: 'getDataPoints',
        src: (context, event) => axios.get(`${baseURL}/${context.device_id}`, {
          params: {
            start_date: context.start_date,
            end_date: context.end_date,
            interval: context.interval,
            intervalType: context.interval_type
          }
        }),
        onError:  {
          target: "idle",
          actions: [
            (context, event) => { console.log(context, event); },
          ]
        },
        onDone: {
          target: "idle",
          actions: [
            assign({ 
              data_points: (_, event) => event.data.data
            })
          ]
        }
      },
    },

    idle: {
      on: {
        UPDATE: {
          target: 'fetching',
          actions: [
            (context, event) => { },
            assign({ 
              start_date: (context, event) => event.start_date || context.start_date,
              end_date: (context, event) => event.end_date || context.end_date,
              interval: (context, event) => event.interval || context.interval,
              interval_type: (context, event) => event.interval_type || context.interval_type,
            })
          ]
        }
      }
    }
  }

});

export const context = createContext({});
