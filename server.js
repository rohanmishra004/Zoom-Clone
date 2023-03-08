const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');

const peerServer = ExpressPeerServer(server, {
    debug: true
});


//Setting Public folder
app.use(express.static('public'));

//Setting view engine
app.set('view engine', 'ejs');


//Peer Server middleware
app.use('/peerjs', peerServer);

//Route
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
});


//Room Id added to url
app.get('/:room', (req, res) => {
    console.log(req.params)
    res.render('room', {roomId:req.params.room})
})

//creating socket.io connection
io.on('connection', socket => {
    socket.on('join-room', (roomId,userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);
    });
});



server.listen(process.env.PORT || 3030, () => {
    console.log('Server running!!')
})



