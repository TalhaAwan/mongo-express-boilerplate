var cluster = require('cluster');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// http://rowanmanning.com/posts/node-cluster-and-express/
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker
        console.log('Worker %d died. Creating a new worker', worker.id);
        cluster.fork();
    });
}
else{
    require('./app');
}
