class Recommendations {
    constructor() {
    }

    init() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'html/recommendations/recomendations-header.html', false);
        xhr.send();
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);

        } else {
            this.header = xhr.responseText;
        }
    }

    display() {
        let libraryHeader = document.getElementById('content-header');
        libraryHeader.innerHTML = this.header;
    }
}


