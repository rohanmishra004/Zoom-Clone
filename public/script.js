//Front End JavaScript -

//Here we will create a video element to showcase our own video - getUserMedia returns a promise so we need to attach .then() to convert that promise

const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;


let myVideoStream; //Global Variable

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})



//Add Video Stream- 
const  addVideoStream=(video, stream)=> {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}



