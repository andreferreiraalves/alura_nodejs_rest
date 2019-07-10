const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus();

if (cluster.isMaster) {
    cpus.forEach(function () {
        cluster.fork();
    });

    cluster.on('listening', function (worker) {
        console.log('cluster conectado ' + worker.process.pid);
    });

    cluster.on('exit', worker => {
        console.log('cluster %d desconectado', worker.process.pid);
        cluster.fork();
    });
}
else {
    require('./app');
}