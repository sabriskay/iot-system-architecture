import './App.css';
import Home from './views/Home/Home';
import { useInterpret } from '@xstate/react'
import * as DataPointsMachine from './machines/DataPoints';

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
  const dataPoints = useInterpret(DataPointsMachine.machine);

  return (
    <DataPointsMachine.context.Provider value={{ dataPoints }}>
      <div className="App">
        <Home/>
      </div>
    </DataPointsMachine.context.Provider>

  );
}

export default App;
