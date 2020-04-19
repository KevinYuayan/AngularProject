exports.trainAndPredict = function (req, res, next) {
  const tf = require("@tensorflow/tfjs");
  require("@tensorflow/tfjs-node");
  //load iris training and testing data
  const health = require("../../health.json");
  const healthTesting = require("../../health_test.json");
  console.log(healthTesting);
  //
  //

  // convert/setup our data for tensorflow.js
  //
  //tensor of features for training data
  console.log("trainingData");
  const trainingData = tf.tensor2d(
    health.map((item) => [
      item.temperature,
      item.heart_rate,
      item.weight,
      item.respiratory_rate,
      item.height,
    ])
  );
  //
  //tensor of output for training data
  //console.log(trainingData.dataSync())
  //
  //tensor of output for training data
  //the values for species will be:
  // Die_Live 1:       1,0
  const outputData = tf.tensor2d(
    health.map((item) => [
      item.healthy === 1 ? 1 : 0,
      item.healthy2 === 0 ? 1 : 0,
    ])
  );
  //console.log(outputData.dataSync())

  //
  //tensor of features for testing data
  const testingData = tf.tensor2d(
    healthTesting.map((item) => [
      item.temperature,
      item.heart_rate,
      item.weight,
      item.respiratory_rate,
      item.height,
    ])
  );
  console.log(testingData.dataSync());
  testingData.array().then((array) => {
    console.log(array);
  });

  // build neural network using a sequential model
  const model = tf.sequential();
  //add the first layer
  model.add(
    tf.layers.dense({
      inputShape: [5], // 5 input neurons (features)
      activation: "sigmoid",
      units: 5, //dimension of output space (first hidden layer)
    })
  );
  //add the first hidden layer
  model.add(
    tf.layers.dense({
      inputShape: [5], //dimension of hidden layer (2/3 rule)
      activation: "sigmoid",
      units: 2, //dimension of final output (die or live)
    })
  );
  //add the first hidden layer
  //   model.add(
  //     tf.layers.dense({
  //       inputShape: [15], //dimension of hidden layer (2/3 rule)
  //       activation: "sigmoid",
  //       units: 2, //dimension of final output (die or live)
  //     })
  //   );
  //add output layer
  model.add(
    tf.layers.dense({
      activation: "sigmoid",
      units: 2, //dimension of final output
    })
  );
  //compile the model with an MSE loss function and Adam algorithm
  model.compile({
    //categoricalCrossentropy
    loss: "meanSquaredError",
    optimizer: tf.train.adam(0.003),
    metrics: ["accuracy"],
  });
  console.log(model.summary());
  // train/fit the model for the fixed number of epochs
  const startTime = Date.now();
  //
  async function run() {
    const startTime = Date.now();
    await model.fit(trainingData, outputData, {
      epochs: 1000,
      callbacks: {
        onEpochEnd: async (epoch, log) => {
          console.log(`Epoch ${epoch}: loss = ${log.loss}`);
          elapsedTime = Date.now() - startTime;
          console.log("elapsed time: " + elapsedTime);
        },
      },
    }); //fit
    //
    const results = model.predict(testingData);
    results.print();
    // get the values from the tf.Tensor
    //var tensorData = results.dataSync();
    results.array().then((array) => {
      console.log(array);
      var resultForTest1 = array[0];
      var resultForTest2 = array[1];
      var resultForTest3 = array[2];
      var dataToSent = {
        row1: resultForTest1,
        row2: resultForTest2,
        row3: resultForTest3,
      };

      //var resultForData1 = array[0];
      res.json("results", {
        results: results,
        resultForTest1: resultForTest1,
        resultForTest2: resultForTest2,
        resultForTest3: resultForTest3,
      });
    });
  } //end of run function
  run();
  //
};
