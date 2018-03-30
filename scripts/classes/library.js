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

    init(contentLoadFunction) {

        let contentSection = document.getElementById('content-section'),
            mainContent = document.getElementById('main-content');
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
            resolve();
        });
    }

    loadAlbums() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/album.json', true);
            xhr.onload = function () {
                let mainContentSection = document.getElementById('main-content');
                let fragment = document.createElement('div');
                fragment.id = 'albums';

                function createPlaylist(albumData) {
                    const ALBUM = `
                    <div class="album">
                    <div class="hovered-part">
                       <a href="#/album/${albumData.id}"> 
                             <div class="icon">
                                 <button type="button" class="play-icon"></button> 
                             </div>   
                             <div class="album-cover" style="background-image: url(${albumData.cover});"></div>     
                       </a>
                        <a class="album-title" href="#/album/${albumData.id}">${albumData.title}</a>
                    </div>
                        <a href="#/artist/${albumData.artistId}" class="album-artist">${albumData.artist}</a>
                    </div>`;

                    let div = document.createElement('div');
                    div.innerHTML = ALBUM.trim();
                    return div.firstChild;
                }

                let albumData = JSON.parse(xhr.responseText);

                albumData.forEach(function (albumData) {
                    let playlist = createPlaylist(albumData);
                    fragment.append(playlist);
                });
                mainContentSection.append(fragment);
            };
            xhr.send();
        })
    }


    loadPlaylists() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/playlists.json', true);
            xhr.onload = function () {

                let mainContentSection = document.getElementById('main-content');
                let fragment = document.createElement('div');
                fragment.id = 'playlists';

                function createPlaylist(playlistData) {
                    const PLAYLIST = `
                     <div class="playlist">
                       <div class="hovered-part">
                             <a href="#/user/darkavatar21/playlist/${playlistData.id}">
                                  <div class="icon">
                                    <button type="button" class="play-icon"></button> 
                                  </div>  
                                 <div class="playlist-cover" style="background-image: url(${playlistData.cover});"></div>
                             </a>
                             <a href="#/user/darkavatar21/playlist/${playlistData.id}"  class="playlist-title">${playlistData.title}</a>
                        </div>
                        <a href="#/user/darkavatar21" class="playlist-artist">${playlistData.artist}</a>
                    </div>`;

                    let div = document.createElement('div');
                    div.innerHTML = PLAYLIST.trim();
                    return div.firstChild;
                }

                let playlistsData = JSON.parse(xhr.responseText);

                playlistsData.forEach(function (playlistsData) {
                    let playlist = createPlaylist(playlistsData);
                    fragment.append(playlist);
                });
                mainContentSection.append(fragment);
            };
            xhr.send();
        })
    }

    loadSongs() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/songs.json', true);
            xhr.onload = function () {

                let mainContentSection = document.getElementById('main-content');
                let fragment = document.createElement('div');
                fragment.id = 'songs';

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

                songData.forEach(function (songData) {
                    let song = createSong(songData);
                    fragment.append(song);
                });
                mainContentSection.append(fragment);
            };
            xhr.send();
        });
    }

    loadArtists() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/artists.json', true);
            xhr.onload = function () {

                let mainContentSection = document.getElementById('main-content');
                let fragment = document.createElement('div');
                fragment.id = 'artists';

                function createArtist(artistData) {
                    const ARTIST = `
                     <div class="artist">
                       <div class="hovered-part">
                             <a href="#/artist/${artistData.id}">
                                  <div class="icon">
                                    <button type="button" class="play-icon"></button> 
                                  </div>  
                                 <div class="artist-cover" style="background-image: url(${artistData.cover});"></div>
                             </a>
                             <a href="#/artist/${artistData.id}"  class="artist-title">${artistData.name}</a>
                        </div>
                 
                    </div>`;

                    let div = document.createElement('div');

                    div.innerHTML = ARTIST.trim();
                    return div.firstChild;
                }

                let artistData = JSON.parse(xhr.responseText);

                artistData.forEach(function (artistData) {
                    let artist = createArtist(artistData);
                    fragment.append(artist);
                    mainContentSection.append(fragment);
                });
            };
            xhr.send();
        })
    }

    getSectionHandler(section) {
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
            sectionHandler: this.getSectionHandler(results[2])
        };
    }
}