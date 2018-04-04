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

  async loadPopularContent() {
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
              <a href="#/artist/${playlistData.artistId}" class="playlist-artist">${playlistData.artist}</a>
            </div>`;

          const div = document.createElement('div');
          div.innerHTML = PLAYLIST.trim();
          return div.firstChild;
        }

        const playlistsData = await getRequest('api/album');

        playlistsData.forEach((playlistsInfo) => {
          const playlist = createPlaylist(playlistsInfo);
          fragment.append(playlist);
        });
        mainContentSection.append(fragment);
  }

  async loadGenresContent() {
    const mainContentSection = document.getElementById('main-content');
    const fragment = document.createElement('div');
    fragment.id = 'genres';
    function showGenre(genreData) {
      const GENRE = `
        <div class="genre">
          <div class="hovered-part">
            <a href="#/genre/${genreData._id}"> 
              <img class="genre-cover" style="background-image: url(${genreData.cover});" src="${genreData.icon}"></img>
              <span class="genre-title">${genreData.title}</span>
            </a>
          </div>
        </div>`;

      const div = document.createElement('div');
      div.innerHTML = GENRE.trim();
      return div.firstChild;
    }

    const genresData = await getRequest('api/genre');

    genresData.forEach((genreInfo) => {
      const genre = showGenre(genreInfo);
      fragment.append(genre);
    });
    mainContentSection.append(fragment);
  }

  async loadNewContent() {
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

        const playlistsData = await getRequest('api/album/new');

        playlistsData.forEach((playlistsInfo) => {
          const playlist = createPlaylist(playlistsInfo);
          fragment.append(playlist);
        });
        mainContentSection.append(fragment);
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
