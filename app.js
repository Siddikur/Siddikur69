// selector
function $(selector) {
    return document.querySelector(selector);
}


var media = $('video'),
    controls = $('.controls'),
    play = $('.play'),
    stop = $('.stop'),
    rwd = $('.rwd'),
    fwd = $('.fwd'),
    timer = $('.timer span'),
    timerWrapper = $('.timer'),
    timerBar = $('.timer div')



//inherit the default from video
media.removeAttribute('controls');
controls.style.visibility = 'visible';


//play the video
play.addEventListener('click', playPausedMedia);

function playPausedMedia() {
    if (media.paused) {
        play.setAttribute('data-icon', 'u');
        media.play();
    } else {
        play.setAttribute('data-icon', 'P');
        media.pause();
    }
}


// stoping the video
stop.addEventListener('click', stopMedia);
media.addEventListener('click', stopMedia);

function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon', 'P');
}

// adding the backward and forward

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

var intervalFwd, intervalBwd;

// backWard
function mediaBackward() {
    clearInterval(fwd);
    fwd.classList.remove('active');

    if (rwd.classList.contains('active')) {
        rwd.classList.remove('active');
        clearInterval(intervalBwd);
        media.play();
        play.setAttribute('data-icon', 'u');
    } else {
        rwd.classList.add('active');
        media.pause();
        intervalBwd = setInterval(windBackward, 400);
        play.setAttribute('data-icon', 'P');
        play.addEventListener('click', function () {
            clearInterval(intervalBwd);
            rwd.classList.remove('active');
        }, playPausedMedia);

    }
    playPausedMedia()
}


function windBackward() {
    if (media.currentTime <= 3) {
        rwd.classList.remove('active');
        clearInterval(intervalBwd);
        stopMedia();

    } else {
        media.currentTime -= 3;
    }
}


// forWard

function mediaForward() {
    clearInterval(rwd);
    rwd.classList.remove('active');

    if (fwd.classList.contains('active')) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
        play.setAttribute('data-icon', 'u');
    } else {
        fwd.classList.add('active');
        media.pause();
        intervalFwd = setInterval(windForward, 400);
        play.setAttribute('data-icon', 'P');
        play.addEventListener('click', function () {
            clearInterval(intervalFwd);
            fwd.classList.remove('active');
        }, playPausedMedia);
    }

}


function windForward() {
    if (media.currentTime >= media.duration - 3) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        stopMedia();
    } else {
        media.currentTime += 3;
    }
}




media.addEventListener('timeupdate', setTime);

function setTime() {
    var minutes = Math.floor(media.currentTime / 60),
        seconds = Math.floor(media.currentTime - minutes * 60),
        minutesValue, secondValue;

    if (minutes < 10) {
        minutesValue = '0' + minutes;
    } else {
        minutesValue = minutes;
    }

    if (seconds < 10) {
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }

    var mediaTime = minutesValue + ':' + secondValue;
    timer.textContent = mediaTime;

    var barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = barLength + 'px';

}

rwd.classList.remove('active');
fwd.classList.remove('active');
clearInterval(intervalBwd);
clearInterval(intervalFwd);

$('.controls').addEventListener('click', function (e) {
    e.stopPropagation();
})
document.addEventListener('click', function () {
    media.pause();
    play.setAttribute('data-icon', 'P');
})