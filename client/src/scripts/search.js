import { postRequest } from 'scripts/requestHelper';

const loadAlbums = async (searchString) => {
  function createAlbum(albumData) {
      const ALBUM = `
      <div class="album" id="${albumData._id}">
          <a class="hovered-part" href="#/album/${albumData._id}"> 
            <div class="icon">
              <button type="button" class="play-icon play play-album"></button> 
            </div>   
            <div class="album-cover" style="background-image: url(${albumData.cover});"></div>   
            <span class="album-title">${albumData.title}</span>  
          </a>s
        <a href="#/artist/${albumData.artistId}" class="album-artist">${albumData.artist}</a>
      </div>`;
      const div = document.createElement('div');
      div.innerHTML = ALBUM.trim();
      return div.firstChild;
  }

  const albumData = await postRequest('api/album/search', searchString);

  if (albumData.length) {
    const mainContentSection = document.getElementById('search-layout');
    const titleEl = document.createElement('div');
    titleEl.innerText = 'Albums';
    titleEl.classList = 'search-title';
    mainContentSection.append(titleEl);

    const fragment = document.createElement('div');
    fragment.id = 'search-albums';
    fragment.classList = 'search-item';

    albumData.forEach((albumInfo) => {
        const album = createAlbum(albumInfo);
        fragment.append(album);
    });
    mainContentSection.append(fragment);
  }
};

const loadPlaylists = async (searchString) => {
  function createPlaylist(playlistData) {
      const PLAYLIST = `
  <div class="playlist" id="${playlistData._id}">
      <a class="hovered-part" href="#/darkavatar21/playlist/${playlistData._id}">
        <div class="icon">
          <button type="button" class="play-icon play play-playlist"></button> 
        </div>  
        <img class="playlist-cover" src="${playlistData.cover}"></img>
        <span class="playlist-title">${playlistData.title}</span>
      </a>
  </div>`;

      const div = document.createElement('div');
      div.innerHTML = PLAYLIST.trim();
      return div.firstChild;
  }

  const playlistsData = await postRequest('api/playlist/search', searchString);

  if (playlistsData.length) {
    const mainContentSection = document.getElementById('search-layout');

    const titleEl = document.createElement('div');
    titleEl.innerText = 'Playlists';
    titleEl.classList = 'search-title';
    mainContentSection.append(titleEl);

    const fragment = document.createElement('div');
    fragment.id = 'search-playlists';
    fragment.classList = 'search-item';

    playlistsData.forEach((playlistInfo) => {
        const playlist = createPlaylist(playlistInfo);
        fragment.append(playlist);
    });
    mainContentSection.append(fragment);
  }
};

const loadSongs = async (searchString) => {
  function createSong(songData) {
      songData.duration = `${Math.floor(songData.durationInSec / 60)}:${songData.durationInSec % 60}`;
      const SONG = `
  <div class="song" id="${songData._id}">
    <div class="play-block">
      <span class="song-index">${songData.number}.</span>
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
  const mainContentSection = document.getElementById('search-layout');

  const songData = await postRequest('api/track/search', searchString);

  if (songData.length) {
    const titleEl = document.createElement('div');
    titleEl.innerText = 'Songs';
    titleEl.classList = 'search-title';
    mainContentSection.append(titleEl);

    const fragment = document.createElement('div');
    fragment.id = 'search-songs';
    fragment.classList = 'search-item';

    songData.forEach((songInfo, i) => {
        songInfo.number = i + 1;
        const song = createSong(songInfo);
        fragment.append(song);
    });

    mainContentSection.append(fragment);
  }
};

const loadArtists = async (searchString) => {
  function createArtist(artistData) {
      const ARTIST = `
  <div class="artist" id="${artistData._id}">
      <a class="hovered-part" href="#/artist/${artistData._id}">
        <div class="icon">
          <button type="button" class="play-icon play play-artist"></button> 
        </div>  
        <div class="artist-cover" style="background-image: url(${artistData.smallCover});"></div>
        <span class="artist-title">${artistData.name}</span>
      </a>
  </div>`;

      const div = document.createElement('div');

      div.innerHTML = ARTIST.trim();
      return div.firstChild;
  }

  const artistData = await postRequest('api/artist/search', searchString);

  if (artistData.length) {
    const mainContentSection = document.getElementById('search-layout');
    const fragment = document.createElement('div');
    fragment.id = 'search-artists';
    fragment.classList = 'search-item';

    const titleEl = document.createElement('div');
    titleEl.innerText = 'Artists';
    titleEl.classList = 'search-title';
    mainContentSection.append(titleEl);

    artistData.forEach((artistInfo) => {
        const artist = createArtist(artistInfo);
        fragment.append(artist);
        mainContentSection.append(fragment);
    });
  }
};

const clear = () => {
  const albums = document.getElementById('search-albums');
  const playlists = document.getElementById('search-playlists');
  const songs = document.getElementById('search-songs');
  const artists = document.getElementById('search-artists');
  if (albums) {
    albums.remove();
  }
  if (artists) {
    artists.remove();
  }
  if (playlists) {
    playlists.remove();
  }
  if (songs) {
    songs.remove();
  }
  while (document.getElementsByClassName('search-title')[0]) {
    document.getElementsByClassName('search-title')[0].remove();
  }
};

const search = async (event) => {
  const input = document.getElementById('search-bar');
  const val = input.value;
  const searchString = JSON.stringify({
    search: val,
  });
  clear();
  await loadAlbums(searchString);
  await loadArtists(searchString);
  await loadPlaylists(searchString);
  await loadSongs(searchString);
  window.user.search = searchString;
};

export default search;
