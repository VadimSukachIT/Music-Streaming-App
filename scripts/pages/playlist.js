class Playlist {
    constructor() {
    }

    async init() {
        let contentSection = document.getElementById('content-section');
        let playlistPage = await this.loadAlbum();
        let songs = await this.loadSongs();
        contentSection.innerHTML = playlistPage;
        document.getElementById('songs').append(songs);
    }

    destroy() {
        document.getElementById('playlist-content').remove();
    }

    getPageData() {
        return {
            pageName: "asd",
            sectionName: "asdasd",
            sectionHandler: function () {

            }
        };
    }

    loadAlbum() {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/api/playlist/1', true);
            xhr.onload = function () {
                let playlistInfo = JSON.parse(xhr.responseText);

                let playlistPage = `
                <div id="playlist-content">
                    <div id="playlist-info">
                    <div class="playlist-cover" style="background-image: url(${playlistInfo.cover}) "></div>
                    <span class="playlist-title">${playlistInfo.title}</span>
                    <a class="playlist-artist" href="#album-artist">${playlistInfo.artist}</a>
                    <span class="date-and-songs"><span class="playlist-songs-number">${playlistInfo.tracks.length} ПЕСНИ</span></span>
                    <button type="button" id="play-playlist-button">ИГРАТЬ</button>
                      </div>
                    <div id="songs"></div>
                </div>`;
                resolve(playlistPage);
            };
            xhr.send();
        });
    }

    loadSongs() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/songs.json', true);
            xhr.onload = function () {

                function createSong(songData) {
                    const SONG = `<div class="song">
                    <div class="play-block">
                       <span class="song-index">${songData.id}.</span>
                       <button type="button" class="play-song"></button>
                    </div>
                    <div class="name-block">
                            <span class="song-name">${songData.title}</span>
                            <span class="artist-and-album"> <a class="song-artist">${songData.artist}</a> <span class="separator">•</span> <a class="song-album">${songData.album}</a>  </span>
                        </div>
                        <div class="options-block">              
                                <div class="options-menu">
                                     <button type="button" class="song-options-button"></button>
                                </div>  
                                <div class="song-duration-block"><span class="song-duration">${songData.duration}</div>        
                        </div>
                </div>`;

                    let div = document.createElement('div');
                    div.innerHTML = SONG.trim();
                    return div.firstChild;
                }

                let songData = JSON.parse(xhr.responseText);

                let songs = document.createDocumentFragment();

                songData.forEach(function (songData) {
                    let song = createSong(songData);
                    songs.append(song);
                });

                resolve(songs);
            };
            xhr.send();
        });
    }
}
