class Recommendations {
    constructor() {
        this.sections = new Map(
            [
                ["for-you", this.loadForYouContent],
                ["popular", this.loadPopularContent],
                ["genres", this.loadGenresContent],
                ["new", this.loadNewContent]
            ]
        );
    }

    loadForYouContent() {
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

    loadPopularContent() {
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

    loadGenresContent() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/genres.json', true);
            xhr.onload = function () {
                let mainContentSection = document.getElementById('main-content');
                let fragment = document.createElement('div');
                fragment.id = 'genres';
                function createPlaylist(albumData) {
                    const GENRE = `
                    <div class="genre">
                    <div class="hovered-part">
                       <a href="#/album/${albumData.id}"> 
                       <div class="genre-cover" style="background-image: url(${albumData.cover});"></div> 
                       <div class="genre-icon" style="background-image: url(${albumData.icon});"></div>       
                       </a>
                       <a class="genre-title" href="#/album/${albumData.id}">${albumData.title}</a>
                    </div>
                    </div>`;

                    let div = document.createElement('div');
                    div.innerHTML = GENRE.trim();
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

    loadNewContent() {
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


    init(contentLoadFunction) {
        let contentSection = document.getElementById('content-section'),
            mainContent = document.getElementById('main-content');
        return new Promise((resolve) => {
            if (document.getElementById('content-header')) {
                resolve();
            } else {
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'document';
                xhr.open('GET', 'html/recommendations-header.html', true);
                xhr.onload = function () {
                    let header = xhr.response.querySelector('#content-header');
                    let contentSection = document.getElementById('content-section');
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
        let contentHeader = document.getElementById('content-header');
        if (contentHeader) {
            contentHeader.remove();
        }
    }

    destroyContent() {
        let mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.remove();
        }
    }


    getSectionHandler(section) {
        if (this.sections.has(section)) {
            return this.sections.get(section);
        } else {
            return null;
        }
    }

    getPageData(fragment) {
        let reg = /(recommendations)\/(for-you|popular|genres|new)/;
        let results = reg.exec(fragment);
        return {
            pageName: results[1],
            sectionName: results[2],
            sectionHandler: this.getSectionHandler(results[2])
        };
    }
}