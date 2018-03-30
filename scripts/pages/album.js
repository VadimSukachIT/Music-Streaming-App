class Album {
    constructor() {
    }

    init() {
        let contentSection = document.getElementById('content-section');
        return new Promise(resolve => {


            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/api/album/1', true);
            xhr.onload = function () {
                let albumInfo = JSON.parse(xhr.responseText);


                let albumPage = `
                <div id="album-content">
                    <div id="album-info">
                    <div class="album-cover" style="background-image: url(${albumInfo.cover}) "></div>
                    <span class="album-title">${albumInfo.title}</span>
                    <a class="album-artist" href="#album-artist">${albumInfo.artist}</a>
                    <span class="date-and-songs"><span class="album-date">${albumInfo.date}</span>    <span class="album-separator">•</span>    <span class="album-songs-number">${albumInfo.tracks.length} SONGS</span></span>
                    <button type="button" id="play-album-button">PLAY</button>
                    <button type="button" id="save-album-button">SAVE</button>
                </div>
                    <div id="songs"></div>
                </div>`;

                contentSection.innerHTML = albumPage;
            };
            xhr.send();
        })
    }

    getPageData() {
        return {
            pageName: "asd",
            sectionName: "asdasd",
            sectionHandler: function () {

            }
        };
    }
}