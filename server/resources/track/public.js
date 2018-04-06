const controller = require('./track.controller');
const router = require('koa-router')();

router.post('/search', controller.geTracksByString);

module.exports = router.routes();
