const artistService = require('./artist.service');
const albumService = require('../album/album.service');
const trackService = require('../track/track.service');

module.exports.geArtistsByString = async (ctx, next) => {
  const searchString = new RegExp(ctx.request.body.search, 'i');
  const artists = artistService.find({ name: searchString });

  ctx.body = artists || [];
};

module.exports.getArtistById = async (ctx, next) => {
  const artist = { ...artistService.findOne({ _id: ctx.params.id }) };
  artist.albums = artist.albums.map(id =>
    albumService.findOne({ _id: id }));
  artist.tracks = await artist.tracks.map((id) => {
    const doc = trackService.findOne({ _id: id });
    return doc || {};
  });

  ctx.body = artist;
};
