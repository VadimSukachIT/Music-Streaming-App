const albumService = require('./album.service');
const trackService = require('resources/track/track.service');
const genreService = require('resources/genre/genre.service');

module.exports.getAlbumById = (ctx, next) => {
  const album = albumService.findOne({ _id: ctx.params.id });
  album.tracks = album.tracks.map(id =>
    trackService.findOne({ _id: id }));
  album.genres = album.genres.map(id =>
    genreService.findOne({ _id: id }));

  ctx.body = album;
};

module.exports.createAlbum = (ctx, next) => {
  const album = ctx.request.body;

  albumService.create(album);
  ctx.status = 200;
};

module.exports.updateAlbum = (ctx, next) => {
  const album = ctx.request.body;

  albumService.update(album);
  ctx.status = 200;
};

module.exports.removeAlbum = (ctx, next) => {
  const removed = albumService.remove({ _id: ctx.params.id });
  ctx.status = removed.length ? 200 : 400;
};
