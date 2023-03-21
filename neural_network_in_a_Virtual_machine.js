const vm = require('vm');
const brain = require('brain.js');

// Define the network architecture with two hidden layers
const net = new brain.NeuralNetwork({
  hiddenLayers: [6, 4],
  activation: 'sigmoid',
  learningRate: 0.1
});

// Define the training data and options
const trainingData = [
  { input: [0, 0, 0], output: [0] },
  { input: [0, 0, 1], output: [0] },
  { input: [0, 1, 1], output: [1] },
  { input: [1, 0, 1], output: [1] },
  { input: [1, 1, 1], output: [0] }
];

const trainingOptions = {
  iterations: 5000,
  errorThresh: 0.005,
  log: true,
  logPeriod: 100
};

// Train the network on the training data
net.train(trainingData, trainingOptions);

// Create a sandboxed context for running the neural network
const sandbox = {
  net: net,
  input: [1, 0, 0]
};

const script = new vm.Script(`
  const output = net.run(input);
  console.log(output);
`);

const context = new vm.createContext(sandbox);
script.runInContext(context);
