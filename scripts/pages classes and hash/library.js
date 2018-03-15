
    class Library {
        constructor() {
        }

        init() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'html/library/Library-header.html', false);
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



