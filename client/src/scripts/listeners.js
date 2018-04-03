class Listener {
  constructor() {
    window.addEventListener('click', this.playButtonsListener, false);
    window.addEventListener('click', this.destroySongMenu);
    window.addEventListener('click', this.createSongMenu);
  }

  destroySongMenu() {
    const menu = document.getElementById('song-menu');

    if (menu) {
      menu.remove();
      menu.removeEventListener('click', this.songMenuListener, false);
    }
  }

  createSongMenu(event) {
    const { target } = event;

    if (target.matches('.song-options-button')) {
      event.stopPropagation();
      const songFragment = target.closest('.song');

      const currentMenu = document.getElementById('song-menu');

      if (currentMenu) {
        currentMenu.remove();
        currentMenu.removeEventListener('click', this.songMenuListener, false);
      }

      const menu = document.createElement('div');
      menu.id = 'song-menu';

      menu.innerHTML = `
                 <div class="menu-list save-song"><span class="menu-text">Сохранить</span></div>
                 <div class="menu-list add-song-to-playlist"><span class=menu"-text">Добавить в плейлист</span></div>
                 <div class="menu-list share-song"><span class="menu-text">Поделиться</span></div>
          `;

      songFragment.append(menu);
      menu.addEventListener('click', Listener.songMenuListener, false);
      console.log('hi');
    }
  }

  songMenuListener(event) {
    function addSongToPlaylist() {
      console.log('added');
    }

    function saveSong() {
      console.log('saved');
    }

    const { target } = event;

    if (target.closest('.save-song')) {
      saveSong();
      Listener.destroySongMenu();
    } else if (target.closest('.add-song-to-playlist')) {
      addSongToPlaylist();
    }
  }

  playButtonsListener(event) {
    const { target } = event;

    if (target.matches('.play')) {
      if (target.matches('.play-song')) {
        console.log('song');
      } else if (target.matches('.play-album')) {
        console.log('album');
      } else if (target.matches('.play-playlist')) {
        console.log('playlist');
      } else if (target.matches('.play-artist')) {
        console.log('artist');
      }
    }
  }
}

export default Listener;
