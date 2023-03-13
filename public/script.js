// Store JS for FrontEnd
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video');
myVideo.muted = true;

//PeerJs
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port:'3030'
})

let myVideoStream;
//Requests browser for accessing media devices
navigator.mediaDevices.getUserMedia({
    video: true,
    audio:true,
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
        // once the new user calls us we use this function to make the connection
        call.answer(stream)
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video,userVideoStream)
        })
    })

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId,stream);
    });
})

//Peer connection
peer.on('open', id => {
    //ROOM_ID is coming from ROOM_ID
    //here we will pass the value id to the room
    socket.emit('join-room', ROOM_ID,id);
})



const connectToNewUser = (userId,stream) => {
    // console.log(userId);
    //now we will call the actual user
    const call = peer.call(userId, stream)
    const video = document.createElement('video');
    //with this below method we are sending the new user our stream
    call.on('stream', userVideoStream => {
        addVideoStream(video,userVideoStream)
    })
}



const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    //adding video element to videoGrid
    videoGrid.append(video)
}







