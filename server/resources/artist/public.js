const controller = require('./artist.controller');
const router = require('koa-router')();

router.post('/search', controller.geArtistsByString);
router.get('/:id', controller.getArtistById);

module.exports = router.routes();
