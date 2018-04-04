import {getRequest, postRequest, deleteRequest} from 'scripts/requestHelper';

class Library {
    constructor() {
        this.sections = new Map([
            ['playlists', this.loadPlaylists],
            ['albums', this.loadAlbums],
            ['songs', this.loadSongs],
            ['artists', this.loadArtists],
        ]);
    }

    async init() {
        const contentSection = document.getElementById('content-section');
        let mainContent = document.getElementById('main-content');
        const contentLoadFunction = this.getSectionHandler();

        return new Promise((resolve) => {
            if (document.getElementById('content-header')) {
                resolve();
            } else {
                const header = `
          <div id="content-header">
            <ul class="tags">
              <li class="playlists tag"><a href="#/library/playlists">Плейлисты</a></li>
              <li class="albums tag"><a href="#/library/albums">Альбомы</a></li>
              <li class="songs tag"><a href="#/library/songs">Песни</a></li>
              <li class="artists tag"><a href="#/library/artists">Исполнители</a></li>
            </ul>
            <div class="new-playlist-block">
                <button type="button" id="create-playlist-button">Новый плейлист</button>
            </div>
          </div>`;
                const div = document.createElement('div');
                div.innerHTML = header.trim();
                contentSection.append(div);
                document.getElementById('create-playlist-button').addEventListener('click', Library.showPlaylistCreationDialog);
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
        return new Promise((resolve) => {
            const contentHeader = document.getElementById('content-header');
            if (contentHeader) {
                contentHeader.remove();
            }
            resolve();
        });
    }

    destroyContent() {
        return new Promise((resolve) => {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.remove();
            }
            // window.removeEventListener('click', Listener.createSongMenu);
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
                <button type="button" class="play-icon play play-album"></button> 
              </div>   
              <div class="album-cover" style="background-image: url(${albumData.cover});"></div>   
              <span class="album-title">${albumData.title}</span>  
            </a>
          </div>
          <a href="#/artist/${albumData.artistId}" class="album-artist">${albumData.artist}</a>
        </div>`;
            const div = document.createElement('div');
            div.innerHTML = ALBUM.trim();
            return div.firstChild;
        }

        const albumData = await getRequest(`api/user/${window.user.login}/albums`);

        const mainContentSection = document.getElementById('main-content');
        const fragment = document.createElement('div');
        fragment.id = 'albums';
        albumData.forEach((albumInfo) => {
            const album = createAlbum(albumInfo);
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
                <button type="button" class="play-icon play play-playlist"></button> 
              </div>  
              <div class="playlist-cover" style="background-image: url(${playlistData.cover});"></div>
              <span class="playlist-title">${playlistData.title}</span>
            </a>
          </div>
        </div>`;

            const div = document.createElement('div');
            div.innerHTML = PLAYLIST.trim();
            return div.firstChild;
        }

        const playlistsData = await getRequest(`api/user/${window.user.login}/playlists`);

        const mainContentSection = document.getElementById('main-content');
        const fragment = document.createElement('div');
        fragment.id = 'playlists';


        playlistsData.forEach((playlistInfo) => {
            const playlist = createPlaylist(playlistInfo);
            fragment.append(playlist);
        });
        mainContentSection.append(fragment);
    }

    async loadSongs() {
        function createSong(songData) {
            songData.duration = `${Math.floor(songData.durationInSec / 60)}:${songData.durationInSec % 60}`;
            const SONG = `
        <div class="song" id="${songData._id}">
          <div class="play-block">
            <span class="song-index">${songData.number}</span>
            <button type="button" class="play-song play play-song"></button>
          </div>
          <div class="name-block">
            <span class="song-name">${songData.name}</span>
            <span class="artist-and-album"> <a class="song-artist" href="#/artist/${songData.artistId}">${songData.artist}</a> <span class="separator">•</span> <a class="song-album" href="#/album/${songData.albumId}">${songData.album}</a>  </span>
          </div>
          <div class="options-block">              
            <div class="options-menu">
              <button type="button" class="song-options-button"></button>
            </div>  
            <div class="song-duration-block"><span class="song-duration">${songData.duration}</div>        
          </div>
        </div>`;

            const div = document.createElement('div');
            div.innerHTML = SONG.trim();
            return div.firstChild;
        }

        const songData = await getRequest(`api/user/${window.user.login}/tracks`);

        const mainContentSection = document.getElementById('main-content');
        const fragment = document.createElement('div');
        fragment.id = 'songs';

        songData.forEach((songInfo, i) => {
            songInfo.number = i + 1;
            const song = createSong(songInfo);
            fragment.append(song);
        });
        mainContentSection.append(fragment);
    }

    async loadArtists() {
        function createArtist(artistData) {
            const ARTIST = `
        <div class="artist">
          <div class="hovered-part">
            <a href="#/artist/${artistData._id}">
              <div class="icon">
                <button type="button" class="play-icon play play-artist"></button> 
              </div>  
              <div class="artist-cover" style="background-image: url(${artistData.smallCover});"></div>
            </a>
            <a href="#/artist/${artistData._id}"  class="artist-title">${artistData.name}</a>
          </div>
        </div>`;

            const div = document.createElement('div');

            div.innerHTML = ARTIST.trim();
            return div.firstChild;
        }

        const artistData = await getRequest(`api/user/${window.user.login}/artists`);
        const mainContentSection = document.getElementById('main-content');
        const fragment = document.createElement('div');
        fragment.id = 'artists';

        artistData.forEach((artistInfo) => {
            const artist = createArtist(artistInfo);
            fragment.append(artist);
            mainContentSection.append(fragment);
        });
    }

    getSectionHandler() {
        const reg = /\/library\/(.*)/;
        const section = reg.exec(location.hash)[1];
        if (this.sections.has(section)) {
            return this.sections.get(section);
        }
        return null;
    }

    getPageData(fragment) {
        const reg = /(library)\/(playlists|albums|artists|songs)/;
        const results = reg.exec(fragment);
        return {
            pageName: results[1],
            sectionName: results[2],
        };
    }

    static showPlaylistCreationDialog() {

        async function dialogListener(event) {
            let target = event.target;
            if (target.closest('.cancel-btn')) {
                let dialogMenu = document.getElementById('playlist-creation-dialog');
                dialogMenu.removeEventListener('click', dialogListener, false);
                dialogMenu.remove();

            }
            if (target.closest('.create-playlist-button')) {
                let input = document.getElementById('input-dialog-input');
                let playlistTitle = input.value;

                if (playlistTitle) {
                    let title = playlistTitle;
                    let tracks = [];

                    const playlist = JSON.stringify({
                        title,
                        tracks,
                        userId: window.user._id,
                    });

                    await postRequest(`api/playlist`, playlist);
                }
            }
        }


        const PLAYLIST_CREATION_DIALOG = `
            <button type="button" class="first-cancel-creation-button cancel-btn"></button>
            <h1>Создать новый плейлист</h1>
            <div class="dialog-input">
                <h3>Название плейлиста</h3>
                <input type="text" id="input-dialog-input" placeholder="Начните печатать...">
            </div>
            <div class="dialog-buttons">
                <button type="button" class="second-cancel-creation-button cancel-btn">Отменить</button>
                <button type="button" class="create-playlist-button">Создать</button>
            </div>`;

        let dialogMenu = document.createElement('div');
        dialogMenu.id = "playlist-creation-dialog";
        dialogMenu.innerHTML = PLAYLIST_CREATION_DIALOG;

        document.getElementById('content-section').append(dialogMenu);

        dialogMenu.addEventListener('click', dialogListener, false);
    }
}

export default Library;
