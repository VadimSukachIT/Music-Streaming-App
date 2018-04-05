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

                    let song = document.getElementsByClassName('active')[0];

                    if (song) {
                        song.classList.toggle('active');
                    }

                    let selectedSong = target.closest('.song');
                    selectedSong.classList.toggle('active');

                    window.user.currentTrack = playlistData.tracks.find(function (song) {
                        return song._id === selectedSong.id;
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
                Player.setCurrentSongs();
                player.playSongs();
            }
        }
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

    playSongs() {
        let song = new Audio(window.user.currentTrack.url);
        song.play();
        window.user.currentTrackFile = song;
        this.playButton.classList.toggle('active');
    }

    static playerControlsListener(event) {
        let target = event.target;

        if (target.matches('#play-song-button')) {
            let currentSong = window.user.currentTrackFile,
                playButton = document.getElementById('play-song-button');

            if (currentSong) {
                if (playButton.classList.contains('active')) {
                    currentSong.pause();
                    playButton.classList.toggle('active');
                } else {
                    currentSong.play();
                    playButton.classList.toggle('active');
                }
            }
        }
        else if (true) {

        }

    }
}

let player = new Player();

window.addEventListener('click', Player.playButtonsListener, false);
document.getElementById('player-controls').addEventListener('click', Player.playerControlsListener, false);

let myAudio = new Audio('http://k003.kiwi6.com/hotlink/vfo99hyihz/LoseYourself.mp3');


export default Player;
