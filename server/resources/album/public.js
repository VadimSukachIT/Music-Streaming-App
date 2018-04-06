const controller = require('./album.controller');
const router = require('koa-router')();

router.post('/search', controller.geAlbumsByString);
router.get('/new', controller.getNewAlbums);
router.get('/:id', controller.getAlbumById);
router.get('/', controller.getAllAlbums);
router.put('/:id', controller.updateAlbum);
router.delete('/:id', controller.removeAlbum);
router.post('/', controller.createAlbum);

module.exports = router.routes();
