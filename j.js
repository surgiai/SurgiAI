const { Layer, Network } = require("synaptic");

// Create input and output layers
const inputLayer = new Layer(43000000);
const outputLayer = new Layer(43000000);

// Create hidden layers with 100000 neurons each
const hiddenLayers = [];
for (let i = 0; i < 430; i++) {
  hiddenLayers.push(new Layer(100000));
}

// Connect the layers
inputLayer.project(hiddenLayers[0]);
for (let i = 0; i < hiddenLayers.length - 1; i++) {
  hiddenLayers[i].project(hiddenLayers[i + 1]);
}
hiddenLayers[hiddenLayers.length - 1].project(outputLayer);

// Create the network
const myNetwork = new Network({
  input: inputLayer,
  hidden: hiddenLayers,
  output: outputLayer,
});

// Test the network
const input = [];
for (let i = 0; i < 43000000; i++) {
  input.push(Math.random());
}

console.log(myNetwork.activate(input));
