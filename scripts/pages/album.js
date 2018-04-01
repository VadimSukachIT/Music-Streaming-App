class Album {
    constructor() {
    }

    async init() {
        let contentSection = document.getElementById('content-section');
        let albumPage = await this.loadAlbum();
        let songs = await this.loadSongs();
        contentSection.innerHTML = albumPage;
        document.getElementById('songs').append(songs)
    }

    destroy() {
        document.getElementById('album-content').remove();
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
            xhr.open('GET', 'http://localhost:3000/api/album/1', true);
            xhr.onload = function () {
                let albumInfo = JSON.parse(xhr.responseText);

                let albumPage = `
                <div id="album-content">
                    <div id="album-info">
                    <div class="album-cover" style="background-image: url(${albumInfo.cover}) "></div>
                    <span class="album-title">${albumInfo.title}</span>
                    <a class="album-artist" href="#album-artist">${albumInfo.artist}</a>
                    <span class="date-and-songs"><span class="album-date">${albumInfo.date}</span>    <span class="album-separator">•</span>    <span class="album-songs-number">${albumInfo.tracks.length} ПЕСНИ</span></span>
                    <button type="button" id="play-album-button">ИГРАТЬ</button>
                    <button type="button" id="save-album-button">СОХРАНИТЬ</button>
                </div>
                    <div id="songs"></div>
                </div>`;
                resolve(albumPage);
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
