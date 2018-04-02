class Library {
    constructor() {
        this.sections = new Map(
            [
                ["playlists", this.loadPlaylists],
                ["albums", this.loadAlbums],
                ["songs", this.loadSongs],
                ["artists", this.loadArtists]
            ]
        );
    }

    init() {
        let contentSection = document.getElementById('content-section'),
            mainContent = document.getElementById('main-content');
        let contentLoadFunction = this.getSectionHandler();

        return new Promise((resolve) => {
            if (document.getElementById('content-header')) {
                resolve();
            } else {
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'document';
                xhr.open('GET', 'html/library-header.html', true);
                xhr.onload = function () {
                    let header = xhr.response.querySelector('#content-header');
                    contentSection.append(header);
                    resolve();
                };
                xhr.send();
            }
        }).then(() => {
            if (mainContent) {
                contentLoadFunction();
            } else {
                mainContent = document.createElement('div');
                mainContent.id = 'main-content';

                contentSection.append(mainContent);
                contentLoadFunction();
            }
        })
    }

    destroy() {
        return new Promise(resolve => {
            let contentHeader = document.getElementById('content-header');
            let mainContent = document.getElementById('main-content');

            if (mainContent) {
                mainContent.remove();
            }

            if (contentHeader) {
                contentHeader.remove();
            }

            window.removeEventListener('click', Library.menuHandler);
            resolve();
        });
    }

    destroyHeader() {
        return new Promise(resolve => {
            let contentHeader = document.getElementById('content-header');
            if (contentHeader) {
                contentHeader.remove();
            }
            resolve();
        });
    }

    destroyContent() {
        return new Promise(resolve => {
            let mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.remove();
            }
            window.removeEventListener('click', Library.menuHandler);
            resolve();
        });
    }

    async loadAlbums() {
            function createAlbum(albumData) {
              const ALBUM = `
                <div class="album">
                  <div class="hovered-part">
                    <a href="#/album/${albumData._id}"> 
                      <div class="icon">
                        <button type="button" class="play-icon"></button> 
                      </div>   
                      <div class="album-cover" style="background-image: url(${albumData.cover});"></div>   
                      <span class="album-title">${albumData.title}</span>  
                    </a>
                  </div>
                  <a href="#/artist/${albumData.artistId}" class="album-artist">${albumData.artist}</a>
                </div>`;
              let div = document.createElement('div');
              div.innerHTML = ALBUM.trim();
              return div.firstChild;
            }

        const songData = await getRequest(`api/user/${window.user}/albums`);

        let mainContentSection = document.getElementById('main-content');
        let fragment = document.createElement('div');
        fragment.id = 'albums';
        albumData.forEach((albumInfo) => {
            let album = createAlbum(albumInfo);
            fragment.append(album);
        });
        mainContentSection.append(fragment);
    }


    async loadPlaylists() {
        function createPlaylist(playlistData) {
        const PLAYLIST = `
                     <div class="playlist">
                       <div class="hovered-part">
                             <a href="#/darkavatar21/playlist/${playlistData._id}">
                                  <div class="icon">
                                    <button type="button" class="play-icon"></button> 
                                  </div>  
                                 <div class="playlist-cover" style="background-image: url(${playlistData.cover});"></div>
                                  <span class="playlist-title">${playlistData.title}</span>
                             </a>
                       </div>
                        <a href="#/user/darkavatar21" class="playlist-artist">${playlistData.artist}</a>
                    </div>`;

                    let div = document.createElement('div');
                    div.innerHTML = PLAYLIST.trim();
                    return div.firstChild;
                }

        const playlistsData = await getRequest(`api/user/${window.user}/playlists`);
        
        let mainContentSection = document.getElementById('main-content');
        let fragment = document.createElement('div');
        fragment.id = 'playlists';


        playlistsData.forEach(function (playlistInfo) {
            let playlist = createPlaylist(playlistInfo);
            fragment.append(playlist);
        });
        mainContentSection.append(fragment);
    }

    async loadSongs() {
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

      const songData = await getRequest(`api/user/${window.user}/tracks`);
        
      let mainContentSection = document.getElementById('main-content');
      let fragment = document.createElement('div');
      fragment.id = 'songs';

      songData.forEach(function (songInfo, i) {
          songInfo.number = i + 1;
          let song = createSong(songInfo);
          fragment.append(song);
      });
      mainContentSection.append(fragment);
      document.getElementById('main-content').addEventListener('click', Library.songsListener, false);
      window.addEventListener('click', Library.menuHandler);
    }

    async loadArtists() {
                function createArtist(artistData) {
                    const ARTIST = `
                     <div class="artist">
                       <div class="hovered-part">
                             <a href="#/artist/${artistData._id}">
                                  <div class="icon">
                                    <button type="button" class="play-icon"></button> 
                                  </div>  
                                 <div class="artist-cover" style="background-image: url(${artistData.cover});"></div>
                             </a>
                             <a href="#/artist/${artistData._id}"  class="artist-title">${artistData.name}</a>
                        </div>
                 
                    </div>`;

                    let div = document.createElement('div');

                    div.innerHTML = ARTIST.trim();
                    return div.firstChild;
                }

        const artistData = await getRequest(`api/user/${window.user}/artists`);
        let mainContentSection = document.getElementById('main-content');
        let fragment = document.createElement('div');
        fragment.id = 'artists';

        artistData.forEach(function (artistInfo) {
            let artist = createArtist(artistInfo);
            fragment.append(artist);
            mainContentSection.append(fragment);
        });
    }

    getSectionHandler() {
        let reg = /\/library\/(.*)/;
        let section = reg.exec(location.hash)[1];
        if (this.sections.has(section)) {
            return this.sections.get(section);
        } else {
            return null;
        }
    }

    getPageData(fragment) {
        let reg = /(library)\/(playlists|albums|artists|songs)/;
        let results = reg.exec(fragment);
        return {
            pageName: results[1],
            sectionName: results[2],
        };
    }

    static songsListener(event) {
        let target = event.target;
        if (target.matches('.song-options-button')) {
            event.stopPropagation();
            let songFragment = target.closest('.song');

            let currentMenu = document.getElementById('song-menu');

            if (currentMenu) {
                currentMenu.remove();
            }

            let menu = document.createElement('div');
            menu.id = 'song-menu';

            menu.innerHTML = `
            <div class="song-menu"></div> 
            `;

            songFragment.append(menu);

        }
    };

    static menuHandler() {
        let menu = document.getElementById('song-menu');
        console.log('hi');
        if (menu) {
            menu.remove();
        }
    }
}

