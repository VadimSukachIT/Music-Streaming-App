const genreService = require('./genre.service');
const trackService = require('resources/track/track.service');

module.exports.getAllGenres = (ctx, next) => {
  ctx.body = genreService.find();
};

module.exports.getGenreById = (ctx, next) => {
  const genre = genreService.findOne({ _id: ctx.params.id });
  genre.tracks = genre.tracks.map(id =>
    trackService.findOne({ _id: id }));

  ctx.body = genre;
};
