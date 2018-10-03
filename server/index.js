// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
// var io = require('../..')(server);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing 
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;
var totalConnections = 0 //total from server start!
let users = {}

io.on('connection', (socket) => {
  var addedUser = false;


  totalConnections++


  socket.emit('new connection', totalConnections)

  socket.on('new message', (data) => {
    console.log('----------------IN---------------')
    console.log(data)
    console.log('socket id: ', socket.id)
    console.log('----------------IN---------------')
    if (data.sendTo) {

      io.to(`${data.sendTo}`).emit('new message', {
        username: socket.username,
        userId: socket.userId,
        socketId: socket.id,
        message: data.message,
        image: data.image
      });

      // let roomName = `${Math.min(socket.userId, data.sendTo)}-${Math.max(socket.userId, data.sendTo)}`

      // if(!socket.rooms.hasOwnProperty(roomName)) {
      //   // socket.join(roomName)

      //   let a = io.of('/').clients();
      //   a.sockets[data.socketId].join(roomName)


      //   socket.in(roomName).emit('new message', {
      //     username: socket.username,
      //     userId: socket.userId,
      //     message: data.message
      //   });


      // } else {
      //   socket.in(roomName).emit('new message', {
      //     username: socket.username,
      //     userId: socket.userId,
      //     socketId: data.socketId,
      //     message: data.message
      //   });
      // }
    } else {
      socket.broadcast.emit('new message', {
        username: socket.username,
        userId: socket.userId,
        socketId: socket.id,
        message: data.message
      });
    }



  });

  socket.on('add user', (user) => {
    if (addedUser) return;
    socket.username = user.username;
    socket.userId = user.userId;
    socket.clientId = user.socketId;

    users[user.socketId] = user

    console.log('\n\n')
    // console.log(io.sockets.clients())
    console.log(users)
    console.log('\n\n')

    ++numUsers;
    addedUser = true;
    // socket.emit('login', {
    //   numUsers: numUsers,
    //   user: users[user.socketId]
    // });
    socket.emit('login', {
      numUsers: numUsers,
      users
    });
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
      user: users[user.socketId]
    });
  });

  socket.on('typing', (data) => {
    console.log('typing data: ', data)
    if (data.sendTo) {

      io.to(`${data.sendTo}`).emit('typing', {
        username: socket.username,
        userId: socket.userId,
        socketId: socket.id,
      });
    } else {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    }
  });

  socket.on('stop typing', (data) => {
    console.log('stop typing data: ', data)
    if (data.sendTo) {
      io.to(`${data.sendTo}`).emit('stop typing', {
        username: socket.username,
        userId: socket.userId,
        socketId: socket.id
      })
    } else {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    }
  });

  socket.on('disconnect', () => {
    
    if (addedUser) {
      --numUsers;
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers,
        user: users[socket.id]
      });
    }

    delete users[socket.id]
  });
});


// const mysql = require('mysql')
// const db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'toor',
//   database : 'socket'
// });

// db.connect()

// db.query("SHOW TABLES", function (err, rows, fields) {
//   if (err) throw err

//   console.log('DB response: ', rows, fields)
// })

// db.end()