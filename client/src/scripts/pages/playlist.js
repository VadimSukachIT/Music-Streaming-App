import { getRequest, postRequest, deleteRequest } from 'scripts/requestHelper';

class Playlist {
  async init() {
    const playlistInfo = await getRequest(`api/playlist/${Playlist.getPlaylistId()}`);
    this.loadPlaylist(playlistInfo);
    document.getElementById('save-playlist-button').addEventListener('click', Playlist.savePlaylistButtonListener);
  }

  destroy() {
    document.getElementById('save-playlist-button').removeEventListener('click', Playlist.savePlaylistButtonListener);
    const el = document.getElementById('playlist-content');
    if (el) {
      el.remove();
    }
  }

  getPageData() {
    return {
      pageName: 'asd',
      sectionName: 'asdasd',
      sectionHandler: () => {

      },
    };
  }

  loadPlaylist(playlist) {
    const createSong = (songData) => {
      songData.duration = `${Math.floor(songData.durationInSec / 60)}:${songData.durationInSec % 60}`;
      const SONG = `<div class="song" id="${songData._id}">
              <div class="play-block">
                 <span class="song-index">${songData.number}</span>
                 <button type="button" class="play play-song"></button>
              </div>
              <div class="name-block">
                      <span class="song-name">${songData.name}</span>
                      <span class="artist-and-album"> <a class="song-artist" href="#/artist/${songData.artistId}">${songData.artist}</a> <span class="separator">•</span> <a class="song-album">${songData.album}</a>  </span>
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
    };

    const showPlaylist = (playlistInfo) => {
      let songNumberText = '';
      switch (playlistInfo.tracks.length % 10) {
        case 1:
          songNumberText = 'Песня';
          break;
        case 2:
        case 3:
        case 4:
          songNumberText = 'Песни';
          break;
        default:
          songNumberText = 'Песен';
          break;
      }
      const contentSection = document.getElementById('content-section');
      const res = `
        <div id="playlist-content">
          <div id="playlist-info">
            <div class="playlist-cover" style="background-image: url(${playlistInfo.cover}) "></div>
              <span class="playlist-title">${playlistInfo.title}</span>
              <span class="date-and-songs"><span class="playlist-songs-number">${playlistInfo.tracks.length} ${songNumberText}</span></span>
              <button type="button" class="play play-playlist" id="play-playlist-button">ИГРАТЬ</button>
                <button type="button" id="save-playlist-button">
                  ${window.user.playlists.indexOf(playlistInfo._id) === -1 ? 'СОХРАНИТЬ' : 'Удалить'}
                </button>
            </div>
          <div id="songs"></div>
        </div>`;
      contentSection.innerHTML = res;
    };

    showPlaylist(playlist);

    const songData = playlist.tracks;
    const songs = document.createDocumentFragment();

    songData.forEach((songInfo, i) => {
      songInfo.number = i + 1;
      const song = createSong(songInfo);
      songs.append(song);
    });

    document.getElementById('songs').append(songs);
  }


    static getPlaylistId() {
        const reg = /\/playlist\/(.*)/;
        return reg.exec(location.hash)[1];
    }

    static async savePlaylistButtonListener(event) {
      const { target } = event;
      const playlistId = Playlist.getPlaylistId();
      const isAdded = window.user.playlists.indexOf(playlistId) !== -1;

      if (!isAdded) {
        const album = JSON.stringify({
          _id: playlistId,
        });
        await postRequest(`api/user/${window.user.login}/playlists`, album);
        window.user.playlists.push(playlistId);
        target.innerText = 'Удалить';
      } else {
        await deleteRequest(`api/user/${window.user.login}/playlists/${playlistId}`);
        window.user.playlists = window.user.playlists.filter(item => item !== playlistId);
        target.innerText = 'Сохранить';
      }
    }
}

export default Playlist;
