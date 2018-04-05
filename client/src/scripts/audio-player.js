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

                player.stopSong();

                let reg = /(album|artist|library|playlist)\/(.*)/;
                let [nothing, type, id] = reg.exec(location.hash);

                if (type === "library") {
                    console.log(window.user.tracks);
                    player.playSongs();

                } else {
                    let playlistData = await getRequest(`api/${type}/${id}`);

                    window.user.currentPlaylist = playlistData.tracks;

                    let selectedSong = target.closest('.song'),
                        selectedSongId = selectedSong.id;

                    player.makeSongActive(selectedSongId);

                    window.user.currentTrack = playlistData.tracks.find(function (song) {
                        return song._id === selectedSongId;
                    });


                    player.playSongs();
                }

            } else if (target.matches('.play-icon')) {
                event.preventDefault();

                player.stopSong();

                let targetClosestPlaylist = target.closest('.playlist') || target.closest('.album') || target.closest('.artist');

                if (targetClosestPlaylist) {
                    let type = targetClosestPlaylist.classList[0],
                        id = targetClosestPlaylist.id;

                    if (type === 'playlist' || 'album') {

                        let playlistData = await getRequest(`api/${type}/${id}`);

                        window.user.currentPlaylist = playlistData.tracks;
                        window.user.currentTrack = playlistData.tracks[0];

                        player.playSongs();
                    }
                }
            } else if (target.matches('#play-playlist-button') || target.matches('#play-album-button') || target.matches('#play-artist-button')) {
                player.stopSong();
                await Player.setCurrentSongs();
                player.playSongs();
            }
        }
    }

    static async setCurrentSongs() {
        let reg = /(playlist|album|artist)\/(.*)/;
        let [nothing, type, id] = reg.exec(location.hash);
        let playlistData = await getRequest(`api/${type}/${id}`);

        window.user.currentPlaylist = playlistData.tracks;

        let currentSong = window.user.currentTrack = playlistData.tracks[0];

        player.makeSongActive(currentSong._id);
    }

    playSongs() {
        let song = new Audio(window.user.currentTrack.url);

        if (song.src) {
            song.play();
            window.user.currentTrackFile = song;
            this.playButton.classList.toggle('active');
        }
    }

    playPreviousSong() {
        let track = window.user.currentTrack,
            trackFile = window.user.currentTrackFile,
            playlist = window.user.currentPlaylist;


        if (trackFile && playlist) {

            let previousTrack = playlist[playlist.indexOf(track) - 1];

            if (previousTrack) {
                trackFile.pause();

                let currentSong = window.user.currentTrack = previousTrack;

                window.user.currentTrackFile = new Audio(previousTrack.url);
                window.user.currentTrackFile.play();

                this.makeSongActive(currentSong._id);
            }
        }
    }

    playNextSong() {
        let track = window.user.currentTrack,
            trackFile = window.user.currentTrackFile,
            playlist = window.user.currentPlaylist;

        if (trackFile && playlist) {
            let nextTrack = playlist[playlist.indexOf(track) + 1];

            if (nextTrack) {
                trackFile.pause();

                let currentSong = window.user.currentTrack = nextTrack;

                window.user.currentTrackFile = new Audio(nextTrack.url);
                window.user.currentTrackFile.play();

                this.makeSongActive(currentSong._id);
            }
        }
    }


    repeatSong() {
        let repeatBtn = document.getElementById('repeat-song-button');
        if (repeatBtn.classList.contains('active')) {
            window.user.currentTrackFile.loop = true;
            repeatBtn.classList.toggle('active');
        } else {
            window.user.currentTrackFile.loop = false;
            repeatBtn.classList.toggle('active');
        }
    }

    stopSong() {
        let currentTrack = window.user.currentTrackFile;

        if (currentTrack) {
            currentTrack.pause();
        }

    }

    makeSongActive(id) {
        let prevSong = document.getElementsByClassName('active')[0];

        if (prevSong) {
            prevSong.classList.toggle('active');
        }

        let song = document.getElementById(id);

        if (song) {
            song.classList.toggle('active');
        }
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

        else if (target.matches('#play-previous-song-button')) {
            player.playPreviousSong();
        }

        else if (target.matches('#play-next-song-button')) {
            player.playNextSong();
        }

        else if (target.matches('#repeat-song-button')) {
            player.repeatSong();
        }
    }
}

let player = new Player();

window.addEventListener('click', Player.playButtonsListener, false);
document.getElementById('player-controls').addEventListener('click', Player.playerControlsListener, false);

export default Player;
