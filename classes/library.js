class Library {
    constructor() {
        this.wrapper = document.getElementById('content-section');
        this.header = null;
        this.sections = new Map(
            [
                ["playlists", this.loadPlaylists],
                ["albums", this.loadAlbums],
                ["songs", this.loadSongs],
                ["artists", this.loadArtists]
            ]
        );
    }


    init() {
        if (!this.header) {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'html/library-header.html', false);
            xhr.send();

            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {

            }
        }
    }

    display() {

    }

    loadAlbums() {

    }

    loadPlaylists() {

    }

    loadSongs() {

    }

    loadArtists() {

    }
}






