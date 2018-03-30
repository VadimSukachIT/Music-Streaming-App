const controller = require('./account.controller');
const router = require('koa-router')();

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.get('/logout', controller.logout);

module.exports = router.routes();
