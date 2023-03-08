const brain = require('brain.js');

// Define the neural network model
const net = new brain.NeuralNetwork({
  inputSize: 2,
  hiddenLayers: [3],
  outputSize: 1,
  learningRate: 0.1,
});

// Define training data
const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

// Set the hyperparameters to tune
const hyperparameters = {
  learningRate: [0.1, 0.01, 0.001],
  hiddenLayers: [[3], [4, 2], [5, 3, 2]],
};

// Loop through all combinations of hyperparameters and train the neural network
let bestAccuracy = 0;
let bestHyperparameters = {};
for (const learningRate of hyperparameters.learningRate) {
  for (const hiddenLayers of hyperparameters.hiddenLayers) {
    const currentNet = new brain.NeuralNetwork({
      inputSize: 2,
      hiddenLayers: hiddenLayers,
      outputSize: 1,
      learningRate: learningRate,
    });
    currentNet.train(trainingData);
    const accuracy = getAccuracy(currentNet, trainingData);
    console.log(`Accuracy with learning rate ${learningRate} and hidden layers ${hiddenLayers}: ${accuracy}`);
    if (accuracy > bestAccuracy) {
      bestAccuracy = accuracy;
      bestHyperparameters = { learningRate, hiddenLayers };
    }
  }
}

// Use the best hyperparameters to make predictions with the neural network
console.log(`Best hyperparameters: ${JSON.stringify(bestHyperparameters)}`);
const bestNet = new brain.NeuralNetwork({
  inputSize: 2,
  hiddenLayers: bestHyperparameters.hiddenLayers,
  outputSize: 1,
  learningRate: bestHyperparameters.learningRate,
});
bestNet.train(trainingData);
console.log(bestNet.run([0, 0])); // Expected output: [0]
console.log(bestNet.run([0, 1])); // Expected output: [1]
console.log(bestNet.run([1, 0])); // Expected output: [1]
console.log(bestNet.run([1, 1])); // Expected output: [0]

// Helper function to calculate the accuracy of the neural network on the training data
function getAccuracy(net, data) {
  let correct = 0;
  for (const example of data) {
    const output = Math.round(net.run(example.input));
    const expected = Math.round(example.output);
    if (output === expected) {
      correct++;
    }
  }
  return correct / data.length;
}
