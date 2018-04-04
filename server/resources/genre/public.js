const controller = require('./genre.controller');
const router = require('koa-router')();

router.get('/', controller.getAllGenres);

module.exports = router.routes();
