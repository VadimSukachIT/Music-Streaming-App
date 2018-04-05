import audio from 'tracks/LoseYourself.mp3';
import { getRequest, postRequest, deleteRequest, putRequest } from 'scripts/requestHelper';

class Player {
    constructor() {
        this.playButton = document.getElementById('play-song-button');
        this.nextSongButton = document.getElementById('play-next-song-button');
        this.previousSongButton = document.getElementById('play-previous-song-button');
        this.repeatSongButton = document.getElementById('repeat-song-button');
        this.shuffleSongButton = document.getElementById('shuffle-song-button');
        this.progressBar = document.getElementById('song-progress-bar');
    }

    async playButtonsListener(event) {
        const {target} = event;

        if (target.matches('.play')) {

            if (target.matches('.play-icon')) {

                let targetClosestPlaylist = target.closest('.playlist') || target.closest('.album');

                if (targetClosestPlaylist) {
                    let type = targetClosestPlaylist.classList[0],
                        id = targetClosestPlaylist.id;

                    let playlistData = await getRequest(`api/${type}/${id}`);
                    const TRACKS = playlistData.tracks;

                    this.tracks = TRACKS;

                }
            } else if (target.matches('#play-playlist-button') || target.matches('#play-album-button')) {
                console.log('g');
            }
        }
    }

    static getTracks() {
        let reg = /(.*)\/(.*)/;
        let [result, type, id] = reg.exec(location.hash);
        console.log(type, id);
    }
}

let player = new Player();

window.addEventListener('click', player.playButtonsListener.bind(player), false);

let myAudio = new Audio('http://k003.kiwi6.com/hotlink/vfo99hyihz/LoseYourself.mp3');


export default Player;
