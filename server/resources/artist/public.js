const controller = require('./artist.controller');
const router = require('koa-router')();

router.get('/:id', controller.getArtistById);

module.exports = router.routes();
