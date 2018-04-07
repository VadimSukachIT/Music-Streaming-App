const genreService = require('./genre.service');
const albumService = require('../album/album.service');

module.exports.getAllGenres = (ctx, next) => {
  ctx.body = genreService.find();
};

module.exports.getGenreById = (ctx, next) => {
  const genre = genreService.findOne({ _id: ctx.params.id });

  ctx.body = genre;
};

module.exports.getAlbumsByGenreId = (ctx, next) => {
  const genre = { ...genreService.findOne({ _id: ctx.params.id }) };
  genre.albums = genre.albums.map(id =>
    albumService.findOne({ _id: id }));

  ctx.body = genre;
};
