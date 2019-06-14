class SocketController {
    createSocket(server) {
        const io = require('socket.io').listen(server);

        io.on('connection', (socket) => {
            console.log('new connection made');

            socket.on('join room', (data) => {
                socket.join(data.room);
                console.log(data.user + ' joined the room: ' + data.room);
                socket.broadcast.to(data.room).emit('new user joined', {user: data.user, message: 'has joined this room'});
            });

            socket.on('leave room', (data) => {
                console.log('LEAVE ROOM');
                console.log(data.user + ' left the room: ' + data.room);
                socket.broadcast.to(data.room).emit('left room', {user: data.user, message: 'has left this room'});
                socket.leave(data.room);
            });

            socket.on('message', (data) => {
                console.log(`got new message`);
                io.in(data.room).emit('new message',{user: data.user, message: data.message});
            });

            socket.on('disconnect', function (data) {
                console.log('disconnect');
            });
        });
    }
}

module.exports = new SocketController();
