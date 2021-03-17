// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector(".toggle");
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');
const fullScreen = player.querySelector('.full_screen');
var elem = document.documentElement;
var temp = false;

// build function
function togglePlay() {
  if(video.paused)
    video.play();
  else  
    video.pause();
}
function updateButton() {
  const icon = this.paused ? '►' : '⏸';
  toggle.textContent = icon;
}
function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime/video.duration)*100;
  // console.log(percent);
  progressBar.style.width = percent + '%';
}
function scrub(e){
  const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
  progressBar.style.width = scrubTime + 7 + 'px';
  video.currentTime = scrubTime;
}
/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    player.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    player.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    player.msRequestFullscreen();
  }
  temp = true;
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  temp = false;
}

function toggleScreen(){
  temp ? closeFullscreen() : openFullscreen();
}

// hook up event listners
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
skipButton.forEach(btn =>
  btn.addEventListener('click',skip)
);
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
video.addEventListener('timeupdate',handleProgress);
progress.addEventListener('click',scrub);
let mouseDown = false;
progress.addEventListener('mousemove',(e) => mouseDown && scrub());
progress.addEventListener('mousedown',() => mouseDown = true);
progress.addEventListener('mouseup',() => mouseDown = false);
fullScreen.addEventListener('click',toggleScreen);