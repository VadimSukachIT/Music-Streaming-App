const artistService = require('./artist.service');
const albumService = require('../album/album.service');
const genreService = require('../genre/genre.service');

module.exports.getArtistById = (ctx, next) => {
  const artist = artistService.findOne({ _id: ctx.params.id });
  artist.albums = artist.albums.map(id =>
    albumService.findOne({ _id: id }));
  artist.genres = artist.genres.map(id =>
    genreService.findOne({ _id: id }));

  ctx.body = artist;
};
