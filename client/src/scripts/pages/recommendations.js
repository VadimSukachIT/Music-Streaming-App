import { getRequest } from 'scripts/requestHelper';

class Recommendations {
  constructor() {
    this.sections = new Map([
      ['for-you', this.loadForYouContent],
      ['popular', this.loadPopularContent],
      ['genres', this.loadGenresContent],
      ['new', this.loadNewContent],
    ]);
  }

  init() {
    const contentSection = document.getElementById('content-section');
    let mainContent = document.getElementById('main-content');

    const contentLoadFunction = this.getSectionHandler();

    return new Promise((resolve) => {
      if (document.getElementById('content-header')) {
        resolve();
      } else {
        const header = `<div id="content-header">
                    <ul class="tags">
                        <li class="featured tag"><a href="#/recommendations/for-you">Для вас</a></li>
                        <li class="artists tag"><a href="#/recommendations/popular">Популярное</a></li>
                        <li class="genres tag"><a href="#/recommendations/genres">Жанры</a></li>
                        <li class="new-releases tag"><a href="#/recommendations/new">Новое</a></li>
                    </ul>
                </div>`;
        const div = document.createElement('div');
        div.innerHTML = header.trim();
        contentSection.append(div);
        resolve();
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
    });
  }

  destroy() {
    return new Promise((resolve) => {
      const contentHeader = document.getElementById('content-header');
      const mainContent = document.getElementById('main-content');

      if (mainContent) {
        mainContent.remove();
      }

      if (contentHeader) {
        contentHeader.remove();
      }
      resolve();
    });
  }


  destroyHeader() {
    const contentHeader = document.getElementById('content-header');
    if (contentHeader) {
      contentHeader.remove();
    }
  }

  destroyContent() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.remove();
    }
  }

  async loadForYouContent() {
    const mainContentSection = document.getElementById('main-content');
    const fragment = document.createElement('div');
    fragment.id = 'playlists';

    function createPlaylist(playlistData) {
      const PLAYLIST = `
        <div class="playlist">
          <div class="hovered-part">
            <a href="#/user/darkavatar21/playlist/${playlistData._id}">
              <div class="icon">
                <button type="button" class="play-icon"></button> 
              </div>  
              <div class="playlist-cover" style="background-image: url(${playlistData.cover});"></div>
            </a>
            <a href="#/user/darkavatar21/playlist/${playlistData._id}"  class="playlist-title">${playlistData.title}</a>
          </div>
        </div>`;

      const div = document.createElement('div');
      div.innerHTML = PLAYLIST.trim();
      return div.firstChild;
    }

    const playlistsData = await getRequest('api/playlist');

    playlistsData.forEach((playlistsInfo) => {
      const playlist = createPlaylist(playlistsInfo);
      fragment.append(playlist);
    });
    mainContentSection.append(fragment);
  }

  loadPopularContent() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'json/playlists.json', true);
      xhr.onload = () => {
        const mainContentSection = document.getElementById('main-content');
        const fragment = document.createElement('div');
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

          const div = document.createElement('div');
          div.innerHTML = PLAYLIST.trim();
          return div.firstChild;
        }

        const playlistsData = JSON.parse(xhr.responseText);

        playlistsData.forEach((playlistsInfo) => {
          const playlist = createPlaylist(playlistsInfo);
          fragment.append(playlist);
        });
        mainContentSection.append(fragment);
      };
      xhr.send();
    });
  }

  loadGenresContent() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'json/genres.json', true);
      xhr.onload = () => {
        const mainContentSection = document.getElementById('main-content');
        const fragment = document.createElement('div');
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

          const div = document.createElement('div');
          div.innerHTML = GENRE.trim();
          return div.firstChild;
        }

        const albumData = JSON.parse(xhr.responseText);

        albumData.forEach((albumInfo) => {
          const playlist = createPlaylist(albumInfo);
          fragment.append(playlist);
        });
        mainContentSection.append(fragment);
      };
      xhr.send();
    });
  }

  loadNewContent() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'json/playlists.json', true);
      xhr.onload = () => {
        const mainContentSection = document.getElementById('main-content');
        const fragment = document.createElement('div');
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

          const div = document.createElement('div');
          div.innerHTML = PLAYLIST.trim();
          return div.firstChild;
        }

        const playlistsData = JSON.parse(xhr.responseText);

        playlistsData.forEach((playlistsInfo) => {
          const playlist = createPlaylist(playlistsInfo);
          fragment.append(playlist);
        });
        mainContentSection.append(fragment);
      };
      xhr.send();
    });
  }

  getSectionHandler() {
    const reg = /\/recommendations\/(.*)/;
    const section = reg.exec(location.hash)[1];
    if (this.sections.has(section)) {
      return this.sections.get(section);
    }
    return null;
  }

  getPageData(fragment) {
    const reg = /(recommendations)\/(for-you|popular|genres|new)/;
    const results = reg.exec(fragment);
    return {
      pageName: results[1],
      sectionName: results[2],
      sectionHandler: this.getSectionHandler(results[2]),
    };
  }
}

export default Recommendations;
