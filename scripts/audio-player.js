(function () {
    'use strict';

    let playButton = document.getElementById('play-song-button');

    let myAudio = new Audio('BurnItDown.mp3');

    playButton.addEventListener('click', function (e) {
        console.log('hi');
        myAudio.play();
    })
})();