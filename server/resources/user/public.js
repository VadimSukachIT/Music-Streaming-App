const controller = require('./user.controller');
const router = require('koa-router')();

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.get('/logout', controller.logout);
router.get('/:user/playlists', controller.getUserPlaylists);
router.get('/:user/albums', controller.getUserAlbums);
router.get('/:user/tracks', controller.getUserTracks);
router.get('/:user/artists', controller.getUserArtists);

module.exports = router.routes();
