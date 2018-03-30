class Album {
    constructor() {}

    init() {
        document.getElementById('content-section');
        return new Promise(resolve => {
            let albumPage = document.createElement('div');
            albumPage.id = "album-page";
        })
    }
}