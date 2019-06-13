class SocketService {
    constructor(){
        this.users = [];
        this.connections = [];
    }

    createSocket(server) {
        const io = require('socket.io').listen(server);

        io.on('connection', (socket) => {
            console.log('new connection made');
            socket.on('disconnect', function (data) {
                console.log('disconnect');
            });
        });

        io.on('send message', (data) => {
            io.socket.emit('add message', {msg: data});
        })
    }
}

module.exports = new SocketService();
