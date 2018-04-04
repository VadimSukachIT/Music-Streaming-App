import Player from 'scripts/audio-player';
import Header from 'scripts/header';
import Router from 'scripts/router';
import Library from 'scripts/pages/library';
import Recommendations from 'scripts/pages/recommendations';
import Album from 'scripts/pages/album';
import Playlist from 'scripts/pages/playlist';
import Artist from 'scripts/pages/artist';
import { getRequest } from 'scripts/requestHelper';
import 'scripts/listeners';

import './index.less';

const getUser = async () => {
  window.user = await getRequest('api/user/darkavatar21');
  const accountName = document.getElementById('account-name');
  accountName.innerText = window.user.login;
};

getUser();
Player();
Header();
const router = new Router();
router.add(/(library)\/(playlists|songs|albums|artists)/, Library);
router.add(/(recommendations)\/(for-you|genres|new|popular)/, Recommendations);
router.add(/album\/.*/, Album);
router.add(/playlist\/.*/, Playlist);
router.add(/artist\/.*/, Artist);
window.addEventListener('load', router.onLoad.bind(router));
window.addEventListener('hashchange', router.listen.bind(router));
