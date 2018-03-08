(function () {
    'use strict';
    let contentHeaderSection = document.getElementById('content-header');

    window.onload = function () {
        let currentLocation = location.hash;
        if (!currentLocation) {
             location.hash = '#recommendations';
        }

        if (currentLocation === '#recommendations') {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'html/recommendations/recomendations-header.html', false);
            xhr.send();
            contentHeaderSection.innerHTML = xhr.response;
        } else if (currentLocation === '#library') {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'html/library/Library-header.html', false);
            xhr.send();
            contentHeaderSection.innerHTML = xhr.response;
        }
    };

    window.addEventListener("hashchange", function () {
        let currentLocation = location.hash;

        if (currentLocation === '#recommendations') {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'html/recommendations/recomendations-header.html', false);
            xhr.send();
            contentHeaderSection.innerHTML = xhr.response;
        } else if (currentLocation === '#library') {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'html/library/Library-header.html', false);
            xhr.send();
            contentHeaderSection.innerHTML = xhr.response;
        }
    })
})();
