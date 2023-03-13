const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuid } = require('uuid');

const io = require('socket.io')(server)

//Peer Server
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug:true
})


//Setting view engine
app.set('view engine', 'ejs');

//Static File
app.use(express.static('public'))

//PeerJs server 
app.use('/peerjs', peerServer);

app.get('/', (req, res) => { 
    res.redirect(`/:${uuid()}`)
})

app.get('/:roomId', (req, res) => {
    res.render('room', {roomId:req.params.room})
})

//socket.io connection
io.on('connection', (socket) => {
    socket.on('join-room', (roomId,userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected',userId)
    });
});


server.listen(3030, () => {
    console.log('Server running on port 3030')
})

