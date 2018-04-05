import audio from 'tracks/LoseYourself.mp3';
import {getRequest, postRequest, deleteRequest, putRequest} from 'scripts/requestHelper';

class Player {
    constructor() {
        this.playButton = document.getElementById('play-song-button');
        this.nextSongButton = document.getElementById('play-next-song-button');
        this.previousSongButton = document.getElementById('play-previous-song-button');
        this.repeatSongButton = document.getElementById('repeat-song-button');
        this.shuffleSongButton = document.getElementById('shuffle-song-button');
        this.progressBar = document.getElementById('song-progress-bar');
    }

    static async playButtonsListener(event) {
        const {target} = event;

        if (target.matches('.play')) {

            if (target.matches('.play-song')) {

                let reg = /(album|artist|library|playlist)\/(.*)/;
                let [nothing, type, id] = reg.exec(location.hash);

                if (type === "library") {
                    console.log(window.user.tracks);
                    player.playSongs();
                } else {
                    let playlistData = await getRequest(`api/${type}/${id}`);

                    window.user.currentPlaylist = playlistData.tracks;

                    let selectedSongId = target.closest('.song').id;

                    window.user.currentTrack = playlistData.tracks.find(function (song) {
                        return song._id === selectedSongId;
                    });

                    console.log(window.user.currentTrack);

                    player.playSongs();
                }

            } else if (target.matches('.play-icon')) {
                event.preventDefault();
                let targetClosestPlaylist = target.closest('.playlist') || target.closest('.album') || target.closest('.artist');

                if (targetClosestPlaylist) {
                    let type = targetClosestPlaylist.classList[0],
                        id = targetClosestPlaylist.id;

                    if (type === 'playlist' || 'album') {

                        let playlistData = await getRequest(`api/${type}/${id}`);

                        window.user.currentPlaylist = playlistData.tracks;
                        window.user.currentTrack = playlistData.tracks[0];
                        console.log(window.user.currentPlaylist);
                        player.playSongs();
                    }
                }
            } else if (target.matches('#play-playlist-button') || target.matches('#play-album-button') || target.matches('#play-artist-button')) {
                player.setCurrentSongs();
                player.playSongs();
            }
        }
    }

     playSongs() {
        let song = new Audio(window.user.currentTrack.url);
        song.play();
    }

    static async setCurrentSongs() {
        let reg = /(playlist|album|artist)\/(.*)/;
        let [nothing, type, id] = reg.exec(location.hash);
        let playlistData = await getRequest(`api/${type}/${id}`);
        window.user.currentPlaylist = playlistData.tracks;
        window.user.currentTrack = playlistData.tracks[0];
        console.log(window.user.currentPlaylist);
        console.log(window.user.currentTrack);
    }
}

let player = new Player();

window.addEventListener('click', Player.playButtonsListener, false);

let myAudio = new Audio('http://k003.kiwi6.com/hotlink/vfo99hyihz/LoseYourself.mp3');


export default Player;
