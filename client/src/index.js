import Header from 'scripts/header';
import Router from 'scripts/router';
import Library from 'scripts/pages/library';
import Recommendations from 'scripts/pages/recommendations';
import Album from 'scripts/pages/album';
import Playlist from 'scripts/pages/playlist';
import Genre from 'scripts/pages/genre';
import Artist from 'scripts/pages/artist';
import { getRequest } from 'scripts/requestHelper';
import { showSpinner } from 'scripts/common';
import { setUser } from 'scripts/localStorage';
import search from 'scripts/search';
import 'scripts/listeners';
import 'scripts/audio-player';

import './index.less';

const getUser = async () => {
  const user = await getRequest('api/user/darkavatar21');
  const accountName = document.getElementById('account-name');
  accountName.innerText = user.login;
  window.currentTrackFile =
    user.currentTrack ? new Audio(user.currentTrack.url) : null;
  setUser(user);

  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', search);
  Header();
  showSpinner('content-section');
};

getUser();
const router = new Router();
router.add(/(library)\/(playlists|songs|albums|artists)/, Library);
router.add(/(recommendations)\/(for-you|genres|new|popular)/, Recommendations);
router.add(/album\/.*/, Album);
router.add(/playlist\/.*/, Playlist);
router.add(/artist\/.*/, Artist);
router.add(/genre\/.*/, Genre);
window.addEventListener('load', router.onLoad.bind(router));
window.addEventListener('hashchange', router.listen.bind(router));
