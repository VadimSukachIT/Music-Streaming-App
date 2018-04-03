import { getRequest, postRequest, deleteRequest } from 'scripts/requestHelper';

class Artist {
  async init() {
    const artistId = this.getArtistId();
    const artistData = await getRequest(`api/artist/${artistId}`);
    this.loadArtist(artistData);
  }

  destroy() {
    document.getElementById('follow-artist-button').removeEventListener('click', Artist.followButton, false);
    const el = document.getElementById('artist-section');
    if (el) {
      el.remove();
    }
  }

  loadArtist(artistData) {
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
        </div>`;

      const div = document.createElement('div');
      div.innerHTML = ALBUM.trim();
      return div.firstChild;
    }

    function createSong(songData) {
      songData.duration = `${Math.floor(songData.durationInSec / 60)}:${songData.durationInSec % 60}`;
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

      const div = document.createElement('div');
      div.innerHTML = SONG.trim();
      return div.firstChild;
    }

    const showHeader = (artistInfo) => {
      const artistHeader = `
            <div id="artist-header" style="background: url(${artistInfo.bigCover}) no-repeat center; background-size: cover">
                <h1 class="artist-name">${artistInfo.name}</h1>
                <div class="header-buttons">
                    <button type="button" class="play play-artist" id="play-artist-button">ИГРАТЬ</button>
                    <button type="button" id="follow-artist-button" class="${window.user.artists.indexOf(artistInfo._id) !== -1 ? 'followed' : ''}">
                      ${window.user.artists.indexOf(artistInfo._id) === -1 ? 'ПОДПИСАТЬСЯ' : 'Отписаться'}
                    </button>
                </div>      
                <span class="artist-followers">${artistInfo.followers} ПОДПИСЧИКОВ</span>
            </div>`;

      const temp = document.createElement('template');
      temp.innerHTML = artistHeader;

      const frag = temp.content;
      return frag;
    };

    const showAlbums = (albumData) => {
      const albums = document.createElement('div');
      albums.id = 'albums';

      albumData.forEach((albumInfo) => {
        const playlist = createAlbum(albumInfo);
        albums.append(playlist);
      });


      const albumSection = document.createElement('div');
      albumSection.id = 'artist-albums';

      const albumSectionHeader = document.createElement('h2');
      albumSectionHeader.classList.add('artist-album-header');
      albumSectionHeader.innerText = 'Альбомы';

      albumSection.append(albumSectionHeader);
      albumSection.append(albums);

      return albumSection;
    };

    const showSongs = (songData) => {
      const songs = document.createElement('div');
      songs.id = 'songs';

      songData.forEach((songInfo, i) => {
        songInfo.number = i + 1;
        const song = createSong(songInfo);
        songs.append(song);
      });

      const songSection = document.createElement('div');
      songSection.id = 'artist-songs';

      const songSectionHeader = document.createElement('h2');
      songSectionHeader.classList.add('artist-songs-header');
      songSectionHeader.innerText = 'Популярные песни';

      songSection.append(songSectionHeader);
      songSection.append(songs);
      return songSection;
    };

    const contentSection = document.getElementById('content-section');
    const artistSection = document.createElement('div');

    artistSection.id = 'artist-section';

    const artistHeader = showHeader(artistData);
    const artistAlbums = showAlbums(artistData.albums);
    const artistSongs = showSongs(artistData.tracks);

    artistSection.append(artistHeader);
    artistSection.append(artistSongs);
    artistSection.append(artistAlbums);
    contentSection.append(artistSection);
    const isFollowed = window.user.artists.indexOf(artistData._id) !== -1;
    document.getElementById('follow-artist-button').addEventListener(
      'click',
      (event) => { this.followButton(event, this.getArtistId(), isFollowed); },
      false,
    );
  }

  getPageData(fragment) {
    const reg = /(artist)\/.*/;
    const results = reg.exec(fragment);
    return {
      pageName: results[1],
    };
  }

  getArtistId() {
    const reg = /\/artist\/(.*)/;
    return reg.exec(location.hash)[1];
  }

  followButton(event, id, isFollowed) {
    const { target } = event;

    async function stopFollowing() {
      await deleteRequest(`api/user/${window.user.login}/artists/${id}`);
      window.user.artists = window.user.artists.filter(item => item !== id);
      target.classList.toggle('.followed');
    }

    async function startFollowing() {
      const artist = JSON.stringify({
        _id: id,
      });
      await postRequest(`api/user/${window.user.login}/artists`, artist);
      window.user.artists.push(id);
      target.classList.toggle('.followed');
    }

    if (isFollowed) {
      stopFollowing();
    } else {
      startFollowing();
    }
  }
}

export default Artist;
