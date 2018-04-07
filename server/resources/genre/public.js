const controller = require('./genre.controller');
const router = require('koa-router')();

router.get('/', controller.getAllGenres);
router.get('/:id', controller.getAlbumsByGenreId);

module.exports = router.routes();
