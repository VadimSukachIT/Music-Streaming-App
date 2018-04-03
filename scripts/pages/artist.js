class Artist {
    constructor() {
    }

    async init() {
        let artistId = this.getArtistId();
        const artistData = await getRequest(`api/artist/${artistId}`);
        this.loadArtist(artistData);

    }

    destroy() {
        document.getElementById('follow-artist-button').removeEventListener('click', Artist.followButton, false);
        document.getElementById('artist-section').remove();

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

            let div = document.createElement('div');
            div.innerHTML = ALBUM.trim();
            return div.firstChild;
        }

        function createSong(songData) {
            songData.duration = `${Math.floor(songData.durationInSec / 60)}:${songData.durationInSec % 60}`
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

            let div = document.createElement('div');
            div.innerHTML = SONG.trim();
            return div.firstChild;
        }

        const showHeader = (artistInfo) => {
            let artistHeader = `
                        <div id="artist-header" style="background: url(${artistInfo.bigCover}) no-repeat center; background-size: cover">
                <h1 class="artist-name">${artistInfo.name}</h1>
                <div class="header-buttons">
                    <button type="button" class="play play-artist" id="play-artist-button">ИГРАТЬ</button>
                    <button type="button" id="follow-artist-button">ПОДПИСАТЬСЯ</button>
                </div>      
                <span class="artist-followers">${artistInfo.followers} ПОДПИСЧИКОВ</span>
            </div>`;

            let temp = document.createElement('template');
            temp.innerHTML = artistHeader;

            let frag = temp.content;
            return frag;
        };

        const showAlbums = (albumData) => {
            let albums = document.createElement('div');
            albums.id = 'albums';

            albumData.forEach(function (albumInfo) {
                let playlist = createAlbum(albumInfo);
                albums.append(playlist);
            });


            let albumSection = document.createElement('div');
            albumSection.id = "artist-albums";

            let albumSectionHeader = document.createElement('h2');
            albumSectionHeader.classList.add('artist-album-header');
            albumSectionHeader.innerText = "Альбомы";

            albumSection.append(albumSectionHeader);
            albumSection.append(albums);

            return albumSection;

        };

        const showSongs = (songData) => {
            let songs = document.createElement('div');
            songs.id = "songs";

            songData.forEach(function (songInfo, i) {
                songInfo.number = i + 1;
                let song = createSong(songInfo);
                songs.append(song);
            });

            let songSection = document.createElement('div');
            songSection.id = "artist-songs";

            let songSectionHeader = document.createElement('h2');
            songSectionHeader.classList.add('artist-songs-header');
            songSectionHeader.innerText = "Популярные песни";

            songSection.append(songSectionHeader);
            songSection.append(songs);
            return songSection;
        };

        const contentSection = document.getElementById('content-section');
        const artistSection = document.createElement('div');

        artistSection.id = "artist-section";

        const artistHeader = showHeader(artistData);
        const artistAlbums = showAlbums(artistData.albums);
        const artistSongs = showSongs(artistData.tracks);

        artistSection.append(artistHeader);
        artistSection.append(artistSongs);
        artistSection.append(artistAlbums);
        contentSection.append(artistSection);

        document.getElementById('follow-artist-button').addEventListener('click', Artist.followButton, false);
    }

    getPageData(fragment) {
        let reg = /(artist)\/.*/;
        let results = reg.exec(fragment);
        return {
            pageName: results[1],
        };
    }

    getArtistId() {
        let reg = /\/artist\/(.*)/;
        return reg.exec(location.hash)[1];
    }

    static followButton(event) {
        let target = event.target;

        function stopFollowing() {
            console.log('unfollowed');
            target.classList.toggle('.followed');
        }

        function startFollowing() {
            console.log('followed');
            target.classList.toggle('.followed');
        }

        if (target.classList.contains('.followed')) {
            stopFollowing();
        } else {
          startFollowing();
        }
    }
}