const controller = require('./playlist.controller');
const router = require('koa-router')();

router.get('/:id', controller.getPlaylistById);
router.get('/', controller.getAllPlaylists);
router.put('/:id', controller.updatePlaylist);
router.delete('/:id', controller.removePlaylist);
router.post('/', controller.createPlaylist);

module.exports = router.routes();
