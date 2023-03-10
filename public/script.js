// Store JS for FrontEnd
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video');
myVideo.muted = true;


let myVideoStream;
//Requests browser for accessing media devices
navigator.mediaDevices.getUserMedia({
    video: true,
    audio:true,
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})


const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    //adding video element to videoGrid
    videoGrid.append(video)
}







