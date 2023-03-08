//Front End JavaScript -

//Here we will create a video element to showcase our own video - getUserMedia returns a promise so we need to attach .then() to convert that promise
const socket = io('/')
const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;


//creating a new peer connection
var peer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port:'3030'
});



let myVideoStream; //Global Variable

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream);
  
  peer.on('call', call => {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })



  socket.on('user-connected', (userId) => {
    connectToNewUser(userId, stream);
  });
})

peer.on('open', id => {
  // console.log('id');
  //since we have added const ROOM_ID to room.ejs we can use that variable and use that room that roomId to join to that particular room
  socket.emit('join-room',ROOM_ID,id);
})


//Function to connect to new user

const connectToNewUser = (userId,stream) => {
  // console.log(userId);
  const call = peer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video,userVideoStream)
  })
}

//Add Video Stream- 
const  addVideoStream=(video, stream)=> {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}



