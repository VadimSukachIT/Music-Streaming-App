class Playlist {
    constructor() {
    }

    async init() {
        const playlistInfo = await getRequest('api/playlist/1');
        this.loadPlaylist(playlistInfo);
    }

    destroy() {
        const el = document.getElementById('playlist-content');
        if (el) {
            el.remove();
        }
    }

    getPageData() {
        return {
            pageName: "asd",
            sectionName: "asdasd",
            sectionHandler: function () {

            }
        };
    }

    loadPlaylist(playlistInfo) {
        const createSong = (songData) => {
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
        };

        const showPlaylist = (playlistInfo) => {
            const contentSection = document.getElementById('content-section');
            const res = `
                <div id="playlist-content">
                    <div id="playlist-info">
                    <div class="playlist-cover" style="background-image: url(${playlistInfo.cover}) "></div>
                    <span class="playlist-title">${playlistInfo.title}</span>
                    <a class="playlist-artist" href="#album-artist">${playlistInfo.artist}</a>
                    <span class="date-and-songs"><span class="playlist-songs-number">${playlistInfo.tracks.length} ПЕСНИ</span></span>
                    <button type="button" class="play play-playlist" id="play-playlist-button">ИГРАТЬ</button>
                    </div>
                    <div id="songs"></div>
                </div>`;
            contentSection.innerHTML = res;
        };

        showPlaylist(playlistInfo);

        let songData = playlistInfo.tracks;
        let songs = document.createDocumentFragment();

        songData.forEach(function (songInfo, i) {
            songInfo.number = i + 1;
            let song = createSong(songInfo);
            songs.append(song);
        });

        document.getElementById('songs').append(songs);
    }
}
