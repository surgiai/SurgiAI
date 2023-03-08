const { Layer, Network, Trainer } = require("synaptic");

// Define the network architecture
const inputLayer = new Layer(2);
const hiddenLayer1 = new Layer(5);
const hiddenLayer2 = new Layer(4);
const hiddenLayer3 = new Layer(3);
const outputLayer = new Layer(1);

inputLayer.project(hiddenLayer1);
hiddenLayer1.project(hiddenLayer2);
hiddenLayer2.project(hiddenLayer3);
hiddenLayer3.project(outputLayer);

const myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer1, hiddenLayer2, hiddenLayer3],
  output: outputLayer,
});

// Define the training data
const trainingData = [
  {
    input: [0, 0],
    output: [0],
  },
  {
    input: [0, 1],
    output: [1],
  },
  {
    input: [1, 0],
    output: [1],
  },
  {
    input: [1, 1],
    output: [0],
  },
];

// Train the network
const trainer = new Trainer(myNetwork);
trainer.train(trainingData, {
  rate: 0.1,
  iterations: 100000,
  error: 0.005,
});

// Test the network
console.log(myNetwork.activate([0, 0])); // [0.007855030346032807]
console.log(myNetwork.activate([0, 1])); // [0.9917340808578421]
console.log(myNetwork.activate([1, 0])); // [0.9908439792148203]
console.log(myNetwork.activate([1, 1])); // [0.012237499605316127]
