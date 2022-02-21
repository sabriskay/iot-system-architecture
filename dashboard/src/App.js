import './App.css';
import MachineList from './components/Machine/MachineList';

import mqtt from 'mqtt';

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
  return (
    <div className="App">
      <header className="App-header">
        <MachineList/>
      </header>
    </div>
  );
}

export default App;