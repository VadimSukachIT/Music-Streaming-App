class Artist {
    constructor() {
    }

    async init() {
        let contentSection = document.getElementById('content-section');
        let artistSection = document.createElement('div');
        let artistId = this.getArtistId();
        console.log(artistId);

        artistSection.id = "artist-section";

        let artistHeader = await this.loadHeader(artistId);
        let artistSongs = await this.loadArtistSongs(artistId);

        artistSection.append(artistHeader);
        artistSection.append(artistSongs);
        contentSection.append(artistSection);
        console.log()
    }

    loadHeader(id) {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `http://localhost:3000/api/artist/${id}`, true);
            xhr.onload = function () {
                let artistInfo = JSON.parse(xhr.responseText);
                    console.log(artistInfo)
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
        })
    }

    loadArtistSongs() {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/songs.json', true);
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

                let songData = JSON.parse(xhr.responseText);

                let songs = document.createElement('div');
                songs.id = "songs";

                songData.forEach(function (songData) {
                    let song = createSong(songData);
                    songs.append(song);
                });

                let songSection = document.createElement('div');
                songSection.id = "artist-songs";
                songSection.append(songs);

                resolve(songSection);
            };
            xhr.send();
        });
    }

    getPageData() {
        return {
            pageName: "asd",
            sectionName: "asdasd",
            sectionHandler: function () {

            }
        };
    }

    getArtistId () {
        let reg = /\/artist\/(.*)/;
        return reg.exec(location.hash)[1];
    }
}