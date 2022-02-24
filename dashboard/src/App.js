import './App.css';
import Home from './views/Home/Home';
import { useInterpret } from '@xstate/react'
import * as HistoricalDataPointsMachine from './machines/HistoricalDataPoints';
//import * as RealTimeDataPointsMachine from './machines/RealTimeDataPoints';

//import mqtt from 'mqtt';

/*var options = {
	protocol: 'mqtts',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'b0908853' 	
};
var client  = mqtt.connect('mqtt://broker:9001', options);

client.subscribe(`demo_ca1_t_axm/Psum`);

client.on('message', function (topic, message) {
  console.log(message.toString());
});*/

function App() {
  const historicalDataPoints = useInterpret(HistoricalDataPointsMachine.machine);
  //const realTimeDataPoints = useInterpret(RealTimeDataPointsMachine.machine);

  return (
    <HistoricalDataPointsMachine.context.Provider value={{ historicalDataPoints }}>
      <div className="App">
        <Home/>
      </div>
    </HistoricalDataPointsMachine.context.Provider>

  );
}

export default App;
