/* Get Elements */
const player       = document.querySelector('.video-container');
const video        = player.querySelector('.video');
const progress     = player.querySelector('.progress');
const progressBar  = player.querySelector('.progress__filled');
const toggle       = player.querySelector('.toggle');
const skipButtons  = player.querySelectorAll('[data-skip]');
const ranges       = player.querySelectorAll('.player__slider');
const timeCurrent  = player.querySelector('.start-time');
const timeRemaining= player.querySelector('.remaining-time');
const fullScreen   = player.querySelector('.video__fullscreen');

timeCurrent.innerHTML = "00:00";
timeRemaining.innerHTML = "00:" + parseInt(video.duration);


/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}


function durationToTime(duration) {
    var hours  = Math.floor(((duration % 31536000) % 86400) / 3600);
    var minutes= Math.floor((((duration % 31536000) % 86400) % 3600) / 60);
    var seconds= parseInt((((duration % 31536000) % 86400) % 3600) % 60);

    hours  = (hours < 10) ? "0" + hours : hours;
    minutes= (minutes < 10) ? "0" + minutes : minutes;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return (hours + ':' + minutes + ':' + seconds);
}

function updateRemainingTime() {
    var totalTime = video.duration;
    var elapsedTime = video.currentTime;
    var remainingTime = (totalTime - elapsedTime);

    timeCurrent.innerHTML = durationToTime(elapsedTime);
    timeRemaining.innerHTML = durationToTime(remainingTime);
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent +"%";
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullScreen(e){
    console.log(e);
    if(video.requestFullScreen){
        video.requestFullScreen();
    } else if(video.webkitRequestFullScreen){
        video.webkitRequestFullScreen();
    } else if(vid.mozRequestFullScreen){
        video.mozRequestFullScreen();
    }
}

/* Hook up the event listners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('play', updateRemainingTime);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
// video.addEventListener('timeupdate', msToTime);
video.addEventListener('timeupdate', updateRemainingTime);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', ()   => mousedown = false);

fullScreen.addEventListener('click', toggleFullScreen);
