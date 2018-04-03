import {getRequest, postRequest, deleteRequest} from 'scripts/requestHelper';
import { Listener } from  'client/src/scripts/listeners.js';
import Playlist from "./playlist";

class Album {
  async init() {
    const album = await getRequest(`api/album/${Album.getAlbumId()}`);
    this.loadAlbum(album);
    document.getElementById('save-album-button').addEventListener('click', Album.saveAlbumButtonListener);
  }

  destroy() {
    document.getElementById('save-album-button').removeEventListener('click', Album.saveAlbumButtonListener);
    const el = document.getElementById('album-content');
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

  async loadAlbum(album) {
    function createSong(songData) {
      songData.duration = `${Math.floor(songData.durationInSec / 60)}:${songData.durationInSec % 60}`;
      const SONG = `<div class="song" id="${songData._id}">
              <div class="play-block">
                 <span class="song-index">${songData.number}</span>
                 <button type="button" class="play-song"></button>
              </div>
              <div class="name-block">
                      <span class="song-name">${songData.name}</span>
                      <span class="artist-and-album">
                        <a class="song-artist" href="#/artist/${songData.artistId}">${songData.artist}</a>
                        <span class="separator">•</span> <a class="song-album">${songData.album}</a>
                      </span>
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

    const showAlbum = (albumInfo) => {
      const albumPage = `
        <div id="album-content">
          <div id="album-info">
            <div class="album-cover" style="background-image: url(${albumInfo.cover}) "></div>
            <span class="album-title">${albumInfo.title}</span>
            <a class="album-artist" href="#artist/${albumInfo.artistId}">${albumInfo.artist}</a>
            <span class="date-and-songs">
              <span class="album-date">${albumInfo.date}</span>
              <span class="album-separator">•</span>
              <span class="album-songs-number">${albumInfo.tracks.length} ПЕСНИ</span>
            </span>
            <button type="button" id="play-album-button" class="play play-album">ИГРАТЬ</button>
            <button type="button" id="save-album-button">СОХРАНИТЬ</button>
          </div>
            <div id="songs"></div>
        </div>`;
      return albumPage;
    };

    const showSongs = (songInfo) => {
      const songs = document.createDocumentFragment();

      songInfo.forEach((songData, i) => {
        songData.number = i + 1;
        const song = createSong(songData);
        songs.append(song);
      });

      return songs;
    };

    const contentSection = document.getElementById('content-section');
    const albumPage = showAlbum(album);
    const songs = showSongs(album.tracks);
    contentSection.innerHTML = albumPage;
    document.getElementById('songs').append(songs);
  }

  static getAlbumId() {
    const reg = /\/album\/(.*)/;
    return reg.exec(location.hash)[1];
  }

    static async saveAlbumButtonListener() {
       let albumId = Album.getAlbumId();

        const album = JSON.stringify({
            _id: albumId,
        });
        await postRequest(`api/user/${window.user.login}/albums`, album);
    }
}

export default Album;

