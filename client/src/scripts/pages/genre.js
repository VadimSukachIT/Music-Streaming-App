import {getRequest} from 'scripts/requestHelper';

class Genre {
    async init() {
        const genreId = this.getGenreId();
        const albumData = await getRequest(`api/genre/${genreId}`);

        this.loadAlbums(albumData);
    }

    destroy() {
        const genreSection = document.getElementById('genre');
        if (genreSection) {
            genreSection.remove();
        }
    }

    async loadAlbums(genreData) {
        const showHeader = (title) => {
            const artistHeader = `
                <h1 class="genre-title">${title}</h1>`;

            const temp = document.createElement('template');
            temp.innerHTML = artistHeader;

            const frag = temp.content;
            return frag;
        };

        function createAlbum(albumData) {
            const ALBUM = `
        <div class="album" id="${albumData._id}">
            <a class="hovered-part" href="#/album/${albumData._id}"> 
              <div class="icon">
                <button type="button" class="play-icon play play-album"></button> 
              </div>   
              <div class="album-cover" style="background-image: url(${albumData.cover});"></div>   
              <span class="album-title">${albumData.title}</span>  
            </a>
          <a href="#/artist/${albumData.artistId}" class="album-artist">${albumData.artist}</a>
        </div>`;
            const div = document.createElement('div');
            div.innerHTML = ALBUM.trim();
            return div.firstChild;
        }

        const header = showHeader(genreData.title);
        const contentSection = document.getElementById('content-section');

        const genreSection = document.createElement('div');
        genreSection.id = 'genre';
        const fragment = document.createElement('div');
        fragment.id = 'albums';

        genreData.albums.forEach((albumInfo) => {
            const album = createAlbum(albumInfo);
            fragment.append(album);
        });
        genreSection.append(header);
        genreSection.append(fragment);
        contentSection.append(genreSection);
    }

    getPageData(fragment) {
        const reg = /(genre)\/.*/;
        const results = reg.exec(fragment);
        return {
            pageName: results[1],
        };
    }


    getGenreId() {
        const reg = /\/genre\/(.*)/;
        return reg.exec(location.hash)[1];
    }
}

export default Genre;
