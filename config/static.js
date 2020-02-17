module.exports.trainConfig = {
    batchSize: 5,
    epochs: 200,
    verbose: 1,
    decay:1e-6,
    momentum:0.9,
    lr:0.01,
    nesterov:1
}

module.exports.compileConfig = {
    loss: 'categoricalCrossentropy', 
    optimizer: 'sgd', 
    metrics: ['accuracy']
}