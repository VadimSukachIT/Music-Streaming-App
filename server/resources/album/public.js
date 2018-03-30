const controller = require('./album.controller');
const router = require('koa-router')();

router.get('/:id', controller.getAlbumById);
router.put('/:id', controller.updateAlbum);
router.delete('/:id', controller.removeAlbum);
router.post('/', controller.createAlbum);

module.exports = router.routes();
