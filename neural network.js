const brain = require('brain.js');

// Define the network architecture with two hidden layers
const net = new brain.NeuralNetwork({
  hiddenLayers: [6, 4],
  activation: 'sigmoid',
  learningRate: 0.1
});

// Train the network on a larger dataset
const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
];

const trainingOptions = {
  iterations: 5000,
  errorThresh: 0.005,
  log: true,
  logPeriod: 100
};

net.train(trainingData, trainingOptions);

// Test the network on some new inputs
const output1 = net.run([0, 0]); // expected output: [0]
const output2 = net.run([0, 1]); // expected output: [1]
const output3 = net.run([1, 0]); // expected output: [1]
const output4 = net.run([1, 1]); // expected output: [0]

console.log(output1, output2, output3, output4);
