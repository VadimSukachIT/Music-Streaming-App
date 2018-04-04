const mount = require('koa-mount');
const artistResource = require('./resources/artist/public');
const playlistResource = require('./resources/playlist/public');
const albumResource = require('./resources/album/public');
const genreResource = require('./resources/genre/public');
const userResource = require('./resources/user/public');

module.exports = (app) => {
  app.use(mount('/api/user', userResource));
  app.use(mount('/api/artist', artistResource));
  app.use(mount('/api/album', albumResource));
  app.use(mount('/api/playlist', playlistResource));
  app.use(mount('/api/genre', genreResource));
};
