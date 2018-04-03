class Album {
    constructor() {
    }

    async init() {
        const album = await getRequest(`api/album/${this.getAlbumId()}`);
        this.loadAlbum(album);
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

    async loadAlbum(album) {
        function createSong(songData) {
            songData.duration = `${Math.floor(songData.durationInSec / 60)}:${songData.durationInSec % 60}`
              const SONG = `<div class="song">
              <div class="play-block">
                 <span class="song-index">${songData.number}</span>
                 <button type="button" class="play-song"></button>
              </div>
              <div class="name-block">
                      <span class="song-name">${songData.name}</span>
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

        const showAlbum = (albumInfo) => {
            let albumPage = `
            <div id="album-content">
                <div id="album-info">
                <div class="album-cover" style="background-image: url(${albumInfo.cover}) "></div>
                <span class="album-title">${albumInfo.title}</span>
                <a class="album-artist" href="#album-artist">${albumInfo.artist}</a>
                <span class="date-and-songs"><span class="album-date">${albumInfo.date}</span>    <span class="album-separator">•</span>    <span class="album-songs-number">${albumInfo.tracks.length} ПЕСНИ</span></span>
                <button type="button" id="play-album-button" class="play play-album">ИГРАТЬ</button>
                <button type="button" id="save-album-button">СОХРАНИТЬ</button>
            </div>
                <div id="songs"></div>
            </div>`;
            return albumPage;
        };

        const showSongs = (songInfo) => {
            let songs = document.createDocumentFragment();

            songInfo.forEach(function (songData, i) {
                songData.number = i + 1;
                let song = createSong(songData);
                songs.append(song);
            });

            return songs;
        }

        let contentSection = document.getElementById('content-section');
        let albumPage = showAlbum(album);
        let songs = showSongs(album.tracks);
        contentSection.innerHTML = albumPage;
        document.getElementById('songs').append(songs)
    }

    getAlbumId() {
        let reg = /\/album\/(.*)/;
        return reg.exec(location.hash)[1];
    }
}
