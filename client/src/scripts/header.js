export default function () {
    'use strict';

    let headerSection = document.getElementById('header-section'),
        searchSection = document.getElementById('search-section'),
        closeButton = document.getElementById('closeSearchButton');


    closeButton.addEventListener('click', function () {
        searchSection.style.display = 'none';
    });

    headerSection.addEventListener('click', function (event) {
        let target = event.target;

        if (target.closest('#search-button')) {
            searchSection.style.display = 'block';
        }
    });
};


