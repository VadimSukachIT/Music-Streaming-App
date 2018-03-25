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



    playerButtonsSection.addEventListener('click', function (event) {
        let target = event.target;
        console.log(target);

    });
    progressBar.addEventListener('change', function (event) {
            myAudio.currentTime = progressBar.value;
            console.log(progressBar.value);
    });

})();