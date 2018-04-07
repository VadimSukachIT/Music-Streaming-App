const albumService = require('./album.service');
const trackService = require('../track/track.service');

module.exports.getAlbumById = async (ctx, next) => {
  const album = { ...await albumService.findOne({ _id: ctx.params.id }) };
  album.tracks = await album.tracks.map((id) => {
    const doc = trackService.findOne({ _id: id });
    return doc || {};
  });

  ctx.body = album;
};

module.exports.geAlbumsByString = async (ctx, next) => {
  const searchString = new RegExp(ctx.request.body.search, 'i');
  const albums = albumService.find({ title: searchString });

  ctx.body = albums || [];
};

module.exports.getAllAlbums = async (ctx, next) => {
  const albums = albumService.find();

  ctx.body = albums || [];
};

module.exports.getNewAlbums = async (ctx, next) => {
  const thisYearAlbums = albumService.find({ date: (new Date()).getFullYear().toString() });
  const prevYearAlbums = albumService.find({ date: ((new Date()).getFullYear() - 1).toString() });

  ctx.body = [...thisYearAlbums, ...prevYearAlbums] || [];
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
