(function () {
    'use strict';

    let playerButtonsSection = document.getElementById('player-buttons');
    let progressBar = document.getElementById('song-progress-bar');

    let playButton = document.getElementById('play-song-button'),
        pauseButton = document.getElementById(''),
        nextSongButton = document.getElementById('play-next-song-button'),
        priviousSongButton = document.getElementById('play-previous-song-button'),
        repeatSongButton = document.getElementById('repeat-song-button'),
        shuffleSongsButton = document.getElementById('shuffle-song-button');


    let myAudio = new Audio("songs/Linkin Park/01 - The Requiem.mp3"),
        duration = myAudio.duration;

    playerButtonsSection.addEventListener('click', function (event) {
        let target = event.target;
        playButton.classList.toggle('active');
        if (target.closest('#play-song-button')) {
            myAudio.play();

        } else if (target.closest('repeat-song-button')) {
            let onRepeat = myAudio.loop;
            onRepeat = true;
            repeatSongButton.classList.toggle('active');

        } else if (target.closest('play-previous-song-button')) {

        } else if (target.closest('play-next-song-button')) {

        } else if (target.closest('shuffle-song-button')) {

        }


    });
    progressBar.addEventListener('change', function (event) {
            myAudio.currentTime = progressBar.value;
            console.log(progressBar.value);
    });

})();