const albumService = require('./album.service');
const trackService = require('../track/track.service');
const genreService = require('../genre/genre.service');

module.exports.getAlbumById = async (ctx, next) => {
  const album = { ...await albumService.findOne({ _id: ctx.params.id }) };
  album.tracks = await album.tracks.map((id) => {
    const doc = trackService.findOne({ _id: id });
    return doc || {};
  });
  album.genres = await album.genres.map(id =>
    genreService.findOne({ _id: id }));

  ctx.body = album;
};

module.exports.getAllAlbums = async (ctx, next) => {
  const albums = albumService.find();

  ctx.body = albums || [];
};

module.exports.getNewAlbums = async (ctx, next) => {
  const albums = albumService.find({ date: (new Date()).getFullYear().toString() });

  ctx.body = albums || [];
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
