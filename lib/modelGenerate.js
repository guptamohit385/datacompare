let tf = require('@tensorflow/tfjs');
const { compileConfig } = require("../config/static")
const { shuffle } = require("../util/utility")

module.exports.getTraining = (training) => {

    training = shuffle(training);

    let train_x = training.map(i => {return i[0]})
    let train_y = training.map(j=> {return j[1]})

    const model = tf.sequential();

    model.add(tf.layers.dense({units: 128, inputShape: [train_x[0].length,], activation: 'relu'}));
    model.add(tf.layers.dropout({units: 1.5}));
    model.add(tf.layers.dense({units: 64}));
    model.add(tf.layers.dropout({units: 1.5}));
    model.add(tf.layers.dense({units: train_y[0].length, activation: 'softmax'}));

    model.compile(compileConfig);

    return{ 
        xs: tf.tensor2d(train_x, [training.length, train_x[0].length]),
        ys: tf.tensor2d(train_y, [training.length, train_y[0].length]),
        model
    }

}