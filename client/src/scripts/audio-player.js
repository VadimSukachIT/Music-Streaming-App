import audio from 'tracks/LoseYourself.mp3';

class Player {
    constructor() {
        this.playButton = document.getElementById('play-song-button');
        this.nextSongButton = document.getElementById('play-next-song-button');
        this.previousSongButton = document.getElementById('play-previous-song-button');
        this.repeatSongButton = document.getElementById('repeat-song-button');
        this.shuffleSongButton = document.getElementById('shuffle-song-button');
        this.progressBar = document.getElementById('song-progress-bar');
    }

    static playButtonsListener(event) {
        const {target} = event;

        if (target.matches('.play')) {
            if (target.matches('.play-song')) {
            } else if (target.matches('.play-album')) {
                console.log('album');
            } else if (target.matches('.play-playlist')) {
                console.log('playlist');
            } else if (target.matches('.play-artist')) {
                console.log('artist');
            }
        }
    }

    static playSong
}

let myAudio = new Audio('http://k003.kiwi6.com/hotlink/vfo99hyihz/LoseYourself.mp3');
myAudio.play();

export default Player;
