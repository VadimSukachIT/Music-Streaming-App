class Artist {
    constructor() {
    }

    async init() {
        let contentSection = document.getElementById('content-section');
        let artistSection = document.createElement('div');
        let artistId = this.getArtistId();

        artistSection.id = "artist-section";

        let artistHeader = await this.loadHeader(artistId);
        let artistSongs = await this.loadArtistSongs(artistId);
        let artistAlbums = await this.loadArtistAlbums(artistId);

        artistSection.append(artistHeader);
        artistSection.append(artistSongs);
        artistSection.append(artistAlbums);
        contentSection.append(artistSection);
        console.log()
    }

    destroy() {
        document.getElementById('artist-section').remove();
    }

    loadHeader(id) {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `http://localhost:3000/api/artist/${id}`, true);
            xhr.onload = function () {
                let artistInfo = JSON.parse(xhr.responseText);
                console.log(artistInfo);
                let artistHeader = `
                     <div id="artist-header" style="background: url(${artistInfo.bigCover}) no-repeat center; background-size: cover">
            <h1 class="artist-name">${artistInfo.name}</h1>
            <div class="header-buttons">
                <button type="button" id="play-artist-button">ИГРАТЬ</button>
                <button type="button" id="follow-artist-button">ПОДПИСАТЬСЯ</button>
            </div>      
            <span class="artist-followers">${artistInfo.followers} ПОДПИСЧИКОВ</span>
        </div>`;

                let temp = document.createElement('template');
                temp.innerHTML = artistHeader;

                let frag = temp.content;
                resolve(frag);
            };
            xhr.send();
        });
    }

    loadArtistAlbums(id) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `json/${id}-album.json`, true);
            xhr.onload = function () {

                function createPlaylist(albumData) {
                    const ALBUM = `
                    <div class="album">
                    <div class="hovered-part">
                       <a href="#/album/${albumData.id}"> 
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

                let albums = document.createElement('div');
                albums.id = 'albums';

                let albumData = JSON.parse(xhr.responseText);

                albumData.forEach(function (albumData) {
                    let playlist = createPlaylist(albumData);
                    albums.append(playlist);
                });


                let albumSection = document.createElement('div');
                albumSection.id = "artist-albums";

                let albumSectionHeader = document.createElement('h2');
                albumSectionHeader.classList.add('artist-album-header');
                albumSectionHeader.innerText = "Альбомы";

                albumSection.append(albumSectionHeader);
                albumSection.append(albums);

                resolve(albumSection);
            };
            xhr.send();
        });
    }

    loadArtistSongs(id) {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `json/${id}-songs.json`, true);
            xhr.onload = function () {

                function createSong(songData) {
                    const SONG = `<div class="song">
                    <div class="play-block">
                       <span class="song-index">${songData.id}.</span>
                       <button type="button" class="play-song"></button>
                    </div>
                    <div class="name-block">
                            <span class="song-name">${songData.title}</span>
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

                let songData = JSON.parse(xhr.responseText).slice(0, 5);

                let songs = document.createElement('div');
                songs.id = "songs";

                songData.forEach(function (songData) {
                    let song = createSong(songData);
                    songs.append(song);
                });

                let songSection = document.createElement('div');
                songSection.id = "artist-songs";

                let songSectionHeader = document.createElement('h2');
                songSectionHeader.classList.add('artist-songs-header');
                songSectionHeader.innerText = "Популярные песни";

                songSection.append(songSectionHeader);
                songSection.append(songs);

                resolve(songSection);
            };
            xhr.send();
        });
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
}