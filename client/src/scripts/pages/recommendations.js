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
        const header = `
                    <ul class="tags">
                        <li class="featured tag"><a href="#/recommendations/for-you">Для вас</a></li>
                        <li class="artists tag"><a href="#/recommendations/popular">Популярное</a></li>
                        <li class="genres tag"><a href="#/recommendations/genres">Жанры</a></li>
                        <li class="new-releases tag"><a href="#/recommendations/new">Новое</a></li>
                    </ul>
               `;
          const div = document.createElement('div');
          div.id = "content-header";
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
            <a class="hovered-part" href="#/user/darkavatar21/playlist/${playlistData._id}">
              <div class="icon">
                <button type="button" class="play-icon"></button> 
              </div>  
              <img class="playlist-cover" src="${playlistData.cover}"></img>
              <span class="playlist-title">${playlistData.title}</span>
            </a>
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
      document.getElementById('content-section').classList.remove('albums', 'songs', 'artists', 'playlists', 'for-you', 'popular', 'new', 'genres');
      document.getElementById('content-section').classList.add('for-you');
  }

  async loadPopularContent() {
    function createAlbum(albumData) {
      const ALBUM = `
        <div class="album" id="${albumData._id}">
            <a class="hovered-part" href="#/album/${albumData._id}"> 
              <div class="icon">
                <button type="button" class="play-icon play play-album"></button> 
              </div>   
              <div class="album-cover" style="background-image: url(${albumData.cover});"></div>   
              <span class="album-title">${albumData.title}</span>  
            </a>
          <a href="#/artist/${albumData.artistId}" class="album-artist">${albumData.artist}</a>
        </div>`;
      const div = document.createElement('div');
      div.innerHTML = ALBUM.trim();
      return div.firstChild;
    }

    const albumData = await getRequest('api/album');

    const mainContentSection = document.getElementById('main-content');
    const fragment = document.createElement('div');
    fragment.id = 'albums';
    albumData.forEach((albumInfo) => {
        const album = createAlbum(albumInfo);
        fragment.append(album);
    });
    mainContentSection.append(fragment);
      document.getElementById('content-section').classList.remove('albums', 'songs', 'artists', 'playlists', 'for-you', 'popular', 'new', 'genres');
      document.getElementById('content-section').classList.add('popular');
  }

  async loadGenresContent() {
    const mainContentSection = document.getElementById('main-content');
    const fragment = document.createElement('div');
    fragment.id = 'genres';
    function showGenre(genreData) {
      const GENRE = `
        <div class="genre">
            <a class="hovered-part" href="#/genre/${genreData._id}"> 
              <img class="genre-cover" style="background-image: url(${genreData.cover});" src="${genreData.icon}"></img>
              <span class="genre-title">${genreData.title}</span>
            </a>
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
      document.getElementById('content-section').classList.remove('albums', 'songs', 'artists', 'playlists', 'for-you', 'popular', 'new', 'genres');
      document.getElementById('content-section').classList.add('genres');
  }

  async loadNewContent() {
    function createAlbum(albumData) {
      const ALBUM = `
        <div class="album" id="${albumData._id}">
            <a class="hovered-part" href="#/album/${albumData._id}"> 
              <div class="icon">
                <button type="button" class="play-icon play play-album"></button> 
              </div>   
              <div class="album-cover" style="background-image: url(${albumData.cover});"></div>   
              <span class="album-title">${albumData.title}</span>  
            </a>
          <a href="#/artist/${albumData.artistId}" class="album-artist">${albumData.artist}</a>
        </div>`;
      const div = document.createElement('div');
      div.innerHTML = ALBUM.trim();
      return div.firstChild;
    }

    const albumData = await getRequest('api/album/new');

    const mainContentSection = document.getElementById('main-content');
    const fragment = document.createElement('div');
    fragment.id = 'albums';
    albumData.forEach((albumInfo) => {
        const album = createAlbum(albumInfo);
        fragment.append(album);
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
