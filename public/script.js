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
    audio: true,
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

    let text = $('input')
    

    $('html').keydown((e) => {
        if (e.which == 13 && text.val().length !== 0) {
            socket.emit('message', text.val());
            text.val('');
        }
    })

    socket.on('createMessage', message => {
        console.log('Created Message',message)
        $('ul').append(`<li class="messages"><b>user<b><br/>${message}</li>`)
    })

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


//Scrolling Function
const scrollToBottom = () => {
    let d = $('.main_chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

//Mute Video
const muteUnmute = () => {
    console.log(myVideoStream)
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true
    }
}


const setMuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>`
    document.querySelector('.main_mute_button').innerHTML = html
}

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>`
    document.querySelector('.main_mute_button').innerHTML = html
}

//Stop-Start Video
const playStop = () => {
    console.log('object');
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo()
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true
    }
}

const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
    <span>Stop Video</span>`
    document.querySelector('.main_video_button').innerHTML = html
}

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>`
    document.querySelector('.main_video_button').innerHTML = html
}


