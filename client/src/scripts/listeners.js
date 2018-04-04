import { getRequest, postRequest, deleteRequest, putRequest } from 'scripts/requestHelper';
import Library from "./pages/library";


class Listener {
    static destroySongMenu() {
        const menu = document.getElementById('song-menu');

        if (menu) {
            menu.remove();
            menu.removeEventListener('click', this.songMenuListener, false);
        }
    }

    static createSongMenu(event) {
        const {target} = event;

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

        function addSongToPlaylistDialog() {
            let songId = event.target.closest('.song').id;
            let playlistsData = null;

            async function loadPlaylists() {

                function createPlaylist(playlistData) {
                    const PLAYLIST = `
            <div class="playlist" id="${playlistData._id}">
                <a class="hovered-part" href="#/darkavatar21/playlist/${playlistData._id}">
                  <img class="playlist-cover" src="${playlistData.cover}"></img>
                  <span class="playlist-title">${playlistData.title}</span>
                </a>
            </div>`;

                    const div = document.createElement('div');
                    div.innerHTML = PLAYLIST.trim();
                    return div.firstChild;
                }

                playlistsData = await getRequest(`api/user/${window.user.login}/playlists`);

                const fragment = document.getElementById('playlists');


                playlistsData.forEach((playlistInfo) => {
                    const playlist = createPlaylist(playlistInfo);
                    fragment.append(playlist);
                });

            }

            let addSongDialog = document.createElement('div');
            addSongDialog.id = "add-song-dialog";

            addSongDialog.innerHTML = `
                     <div class="dialog-header">
                         <button type="button" class="first-cancel-creation-button cancel-btn"></button>
                         <h1>Добавить в плейлист</h1>
                         <button type="button" id="create-playlist-button">Новый плейлист</button>
                     </div>
                     <div id="playlists"></div>
                      `;

            document.getElementById('content-section').append(addSongDialog);
            loadPlaylists();

            addSongDialog.addEventListener('click', dialogListener, false);

            async function dialogListener(event) {
                let target = event.target;

                if (target.closest('.cancel-btn')) {
                    let dialog = document.getElementById('add-song-dialog');
                    dialog.removeEventListener('click', dialogListener, false);
                    dialog.remove();

                } else if (target.closest('.playlist')) {
                    event.stopPropagation();
                    event.preventDefault();
                    let playlist = target.closest('.playlist'),
                        playlistId = playlist.id;

                    let playlistObject = playlistsData.find(function (el) {
                        return el._id === playlistId;
                    });

                    playlistObject.tracks.push(songId);
                    const newPlaylist = JSON.stringify({ ...playlistObject });
                    await putRequest(`api/playlist/${playlist._id}`, newPlaylist);
                    addSongDialog.removeEventListener('click', dialogListener, false);
                    addSongDialog.remove();
                } else if (target.closest('#create-playlist-button')) {
                   Library.showPlaylistCreationDialog();
                }
            }

        }

        async function saveSong(target) {
            let song = target.closest('.song');
            const songId = song.id;
            const isAdded = window.user.tracks.indexOf(songId) !== -1;

            if (!isAdded) {
                const track = JSON.stringify({
                    _id: songId,
                });
                window.user.tracks.push(songId);
                await postRequest(`api/user/${window.user.login}/tracks`, track);
            } else {
                song.remove();
                window.user.tracks = window.user.tracks.filter(item => item !== songId);
                await deleteRequest(`api/user/${window.user.login}/tracks/${songId}`);
            }
        }

        const {target} = event;

        if (target.closest('.save-song')) {
            saveSong(target);
            Listener.destroySongMenu();
        } else if (target.closest('.add-song-to-playlist')) {
            addSongToPlaylistDialog(target);
        }
    }

}

window.addEventListener('click', Listener.destroySongMenu);
window.addEventListener('click', Listener.createSongMenu);

export default Listener;
