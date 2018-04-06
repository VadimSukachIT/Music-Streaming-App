import audio from 'tracks/LoseYourself.mp3';
import {getRequest, postRequest, deleteRequest, putRequest} from 'scripts/requestHelper';
import {getUser, setUser} from 'scripts/localStorage';

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
                const user = getUser();
                if (type === "library") {
                    let playlistData = await getRequest(`api/user/${user.login}/tracks`);

                    postRequest(`api/user/${user.login}/playlist`, JSON.stringify(playlistData));

                    user.currentPlaylist = playlistData;
                    setUser(user);

                    let selectedSong = target.closest('.song'),
                        selectedSongId = selectedSong.id;

                    if (selectedSongId === user.currentTrack._id && selectedSong.classList.contains('active') && !selectedSong.classList.contains('paused')) {
                        window.currentTrackFile.pause();
                        selectedSong.classList.toggle('paused');
                        document.getElementById('play-song-button').classList.toggle('active');

                    } else if (selectedSongId === user.currentTrack._id && selectedSong.classList.contains('paused')) {
                        window.currentTrackFile.play();
                        selectedSong.classList.toggle('paused');
                        document.getElementById('play-song-button').classList.toggle('active');
                    } else {
                        player.makeSongActive(selectedSongId);

                        user.currentTrack = playlistData.find(function (song) {
                            return song._id === selectedSongId;
                        });
                        postRequest(`api/user/${user.login}/current`, JSON.stringify({_id: selectedSongId}));
                        setUser(user);

                        player.playSongs();

                    }
                } else {
                    let playlistData = await getRequest(`api/${type}/${id}`);

                    postRequest(`api/user/${user.login}/playlist`, JSON.stringify(playlistData.tracks));


                    user.currentPlaylist = playlistData.tracks;
                    setUser(user);

                    let selectedSong = target.closest('.song'),
                        selectedSongId = selectedSong.id;


                    if (selectedSongId === user.currentTrack._id && selectedSong.classList.contains('active') && !selectedSong.classList.contains('paused')) {
                        window.currentTrackFile.pause();
                        selectedSong.classList.toggle('paused');
                        document.getElementById('play-song-button').classList.toggle('active');

                    } else if (selectedSongId === user.currentTrack._id && selectedSong.classList.contains('paused')) {
                        window.currentTrackFile.play();
                        selectedSong.classList.toggle('paused');
                        document.getElementById('play-song-button').classList.toggle('active');
                    } else {
                        player.makeSongActive(selectedSongId);

                        user.currentTrack = playlistData.tracks.find(function (song) {
                            return song._id === selectedSongId;
                        });
                        postRequest(`api/user/${user.login}/current`, JSON.stringify({_id: selectedSongId}));
                        setUser(user);

                        player.playSongs();
                    }
                }
            } else if (target.matches('.play-icon')) {
                event.preventDefault();

                player.stopSong();

                let targetClosestPlaylist = target.closest('.playlist') || target.closest('.album') || target.closest('.artist');

                if (targetClosestPlaylist) {
                    let type = targetClosestPlaylist.classList[0],
                        id = targetClosestPlaylist.id;

                    if (type === 'playlist' || 'album') {
                        const user = getUser();

                        let playlistData = await getRequest(`api/${type}/${id}`);
                        postRequest(`api/user/${user.login}/playlist`, JSON.stringify(playlistData.tracks));

                        user.currentPlaylist = playlistData.tracks;
                        user.currentTrack = playlistData.tracks[0];
                        setUser(user);

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
        let playlistData = await
            getRequest(`api/${type}/${id}`);
        const user = getUser();

        user.currentPlaylist = playlistData.tracks;
        postRequest(`api/user/${user.login}/playlist`, JSON.stringify(playlistData.tracks));

        let currentSong = user.currentTrack = playlistData.tracks[0];
        setUser(user);

        player.makeSongActive(currentSong._id);
    }

    playSongs() {
        const user = getUser();
        let song = new Audio(user.currentTrack.url);

        if (song.src) {
            song.play();
            window.currentTrackFile = song;
            if (!this.playButton.classList.contains('active')) {
                this.playButton.classList.toggle('active');
            }
        }
    }

    playPreviousSong() {
        const user = getUser();
        let track = user.currentTrack,
            trackFile = window.currentTrackFile,
            playlist = user.currentPlaylist;


        if (trackFile && playlist) {

            let previousTrack = playlist[playlist.findIndex(item => item._id === track._id) - 1];

            if (previousTrack) {
                trackFile.pause();

                let currentSong = user.currentTrack = previousTrack;
                postRequest(`api/user/${user.login}/current`, JSON.stringify(currentSong));

                window.currentTrackFile = new Audio(previousTrack.url);
                window.currentTrackFile.play();
                setUser(user);

                this.makeSongActive(currentSong._id);

                if (!this.playButton.classList.contains('active')) {
                    this.playButton.classList.toggle('active');
                }
            }
        }
    }

    playNextSong() {
        const user = getUser();
        let track = user.currentTrack,
            trackFile = window.currentTrackFile,
            playlist = user.currentPlaylist;

        if (trackFile && playlist) {
            let nextTrack = playlist[playlist.findIndex(item => item._id === track._id) + 1];

            if (nextTrack) {
                trackFile.pause();

                let currentSong = user.currentTrack = nextTrack;
                postRequest(`api/user/${user.login}/current`, JSON.stringify(currentSong));

                window.currentTrackFile = new Audio(nextTrack.url);
                window.currentTrackFile.play();
                setUser(user);

                this.makeSongActive(currentSong._id);

                if (!this.playButton.classList.contains('active')) {
                    this.playButton.classList.toggle('active');
                }
            }
        }
    }


    repeatSong() {
        let repeatBtn = document.getElementById('repeat-song-button');

        if (window.currentTrackFile) {

            if (repeatBtn.classList.contains('active')) {
                window.currentTrackFile.loop = true;
                repeatBtn.classList.toggle('active');
            } else {
                window.currentTrackFile.loop = false;
                repeatBtn.classList.toggle('active');
            }
        }
    }

    stopSong() {
        const user = getUser();
        let currentTrack = window.currentTrackFile;

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

    shuffleSong() {
        let shuffleBtn = document.getElementById('shuffle-song-button');

        if (window.currentTrackFile) {

            if (shuffleBtn.classList.contains('active')) {
                shuffleBtn.classList.toggle('active');
            } else {
                shuffleBtn.classList.toggle('active');
            }
        }
    }


    static playerControlsListener(event) {
        let target = event.target;
        const user = getUser();

        if (target.matches('#play-song-button')) {
            const user = getUser();
            let currentSong = window.currentTrackFile,
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
        else if (target.matches('#shuffle-song-button')) {
            player.shuffleSong();
        }
    }

    static progressBarListener(event) {
        let progressBar = document.getElementById('song-progress-bar');
        let song = window.currentTrackFile;

        if (song) {
            let currentTimeBlock = document.getElementById('current-song-time');
            let songDurationBlock = document.getElementById('song-duration');

            songDurationBlock.innerHTML = String(Math.floor(song.duration / 60)) + ':' + String(Math.floor(song.duration) % 60);
            song.currentTime = progressBar.value;

            progressBar.setAttribute("max", String(Math.floor(song.duration)));

            song.addEventListener('timeupdate', function () {
                let currentTime = parseInt(song.currentTime, 10);

                progressBar.setAttribute("value", `${currentTime}`);

                let minutes = Math.floor(currentTime / 60);
                let seconds = null;

                if (minutes < 1) {
                    seconds = (currentTime % 60) < 10 ? '0' + String(Math.floor(currentTime)) : String(Math.floor(currentTime % 60));
                } else if (minutes >= 1) {
                    seconds = Math.floor(currentTime - 60 * minutes) < 10 ? '0' + Math.floor(currentTime - 60 * minutes) : Math.floor(currentTime - 60 * minutes);
                }

                currentTimeBlock.innerHTML = `${minutes}` + ':' + `${seconds}`;
            })
        }
    }
}

let player = new Player();

window.addEventListener('click', Player.playButtonsListener, false);
document.getElementById('player-controls').addEventListener('click', Player.playerControlsListener, false);
document.getElementById('song-progress-bar').addEventListener('change', Player.progressBarListener, false);
export default Player;
