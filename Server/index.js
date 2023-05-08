const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
const router = require('./router');

var roomUser = [];

app.use(cors());
app.use(router);
const { addUser, removeUser, getUser, getUsersInRoom, addWorth, reset } = require('./users.js');
//Listening Port
const server = app.listen(3001, () => {
    console.log("server started at port 3001 ");
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Connection to server

io.on("connection", function (socket) {
    //Join into the room

    socket.on('join', ({ name, room, cardVale }, callback) => {
        console.log(cardVale);
        const { error, user } = addUser({ id: socket.id, name, room, cardVale });
        if (error) return callback(error);
        console.log(socket.id);
        console.log(user);
        socket.join(room);
    });

    //Story Description

    socket.on("story", function (data) {
        const user = getUser(socket.id);
        if (user) {
            io.in(user.room).emit("story", data);

        }
    })

    //Jira_link
    socket.on("jira", function (data) {
        const user = getUser(socket.id);
        if (user) {
            io.in(user.room).emit("jira", data);
        }
    })


    // Chat
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    //test


    socket.on('disconnect', () => {
        removeUser(socket.id);
        console.log("user disconnected", socket.id);
        console.log(roomUser);
        io.sockets.emit("playerdet", roomUser.length);
    });

    //Card
    socket.on("selected", function (data) {
        addWorth(socket.id, data);
        console.log("the thing is " + data);
        const user = getUser(socket.id);
        roomUser = getUsersInRoom(user.room);
        console.log(roomUser);
        io.in(user.room).emit("selected", data);
        io.in(user.room).emit("preach", roomUser);
    })
    socket.on("preach", function (data) {
        if (data === 'reset') {
            const user = getUser(socket.id);
            reset(user.room)
            roomUser = getUsersInRoom(user.room);
            console.log(roomUser);
            io.in(user.room).emit("preach", 'reset');
            io.in(user.room).emit("preach", roomUser);
        }
    })

    socket.on('getusers', ({ name, room }, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });

    socket.on('disconnect', () => {

        removeUser(socket.id);
        console.log("user disconnected", socket.id);
        console.log(roomUser);
        io.sockets.emit("playerdet", roomUser.length);
    });

});
