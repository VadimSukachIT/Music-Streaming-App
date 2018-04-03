const controller = require('./user.controller');
const router = require('koa-router')();

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.get('/logout', controller.logout);
router.get('/:user', controller.getUser);
router.get('/:user/playlists', controller.getUserPlaylists);
router.get('/:user/albums', controller.getUserAlbums);
router.get('/:user/tracks', controller.getUserTracks);
router.get('/:user/artists', controller.getUserArtists);
router.post('/:user/artists', controller.addArtist);
router.post('/:user/albums', controller.addAlbum);
router.post('/:user/tracks', controller.addTrack);
router.post('/:user/playlists', controller.addPlaylist);
router.delete('/:user/artists/:id', controller.removeArtist);
router.delete('/:user/albums/:id', controller.removeAlbum);
router.delete('/:user/tracks/:id', controller.removeTrack);
router.delete('/:user/playlists/:id', controller.removePlaylist);

module.exports = router.routes();
