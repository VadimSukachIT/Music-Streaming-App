const controller = require('./genre.controller');
const router = require('koa-router')();

router.get('/:id', controller.getAllGenres);

module.exports = router.routes();
