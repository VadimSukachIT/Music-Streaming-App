import { getRequest, postRequest, deleteRequest } from 'scripts/requestHelper';

class Listener {
  static destroySongMenu() {
    const menu = document.getElementById('song-menu');

    if (menu) {
      menu.remove();
      menu.removeEventListener('click', this.songMenuListener, false);
    }
  }

  static createSongMenu(event) {
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
                 <div class="menu-list save-song"><span class="menu-text">${window.user.tracks.indexOf(songFragment.id) === -1 ? 'Сохранить' : 'Удалить'}</span></div>
                 <div class="menu-list add-song-to-playlist"><span class=menu"-text">Добавить в плейлист</span></div>
                 <div class="menu-list share-song"><span class="menu-text">Поделиться</span></div>
          `;

      songFragment.append(menu);
      menu.addEventListener('click', Listener.songMenuListener, false);
      console.log('hi');
    }
  }

  static songMenuListener(event) {
    function addSongToPlaylist() {
      console.log('added');
    }

    async function saveSong(target) {
      const songId = target.closest('.song').id;
      const isAdded = window.user.tracks.indexOf(songId) !== -1;
      console.log(songId)

      if (!isAdded) {
        const track = JSON.stringify({
          _id: songId,
        });
        window.user.tracks.push(songId);
        await postRequest(`api/user/${window.user.login}/tracks`, track);
        console.log(window.user.tracks)
      } else {
        window.user.tracks = window.user.tracks.filter(item => item !== songId);
        await deleteRequest(`api/user/${window.user.login}/tracks/${songId}`);
        console.log(window.user.tracks)
      }
    }

    const { target } = event;

    if (target.closest('.save-song')) {
      saveSong(target);
      Listener.destroySongMenu();
    } else if (target.closest('.add-song-to-playlist')) {
      addSongToPlaylist(target);
    }
  }

  static playButtonsListener(event) {
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
window.addEventListener('click', Listener.playButtonsListener, false);
window.addEventListener('click', Listener.destroySongMenu);
window.addEventListener('click', Listener.createSongMenu);

export default Listener;
