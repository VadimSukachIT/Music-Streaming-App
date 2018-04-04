const userService = require('./user.service');
const securityUtil = require('../../security.util');
const albumService = require('../album/album.service');
const trackService = require('../track/track.service');
const playlistService = require('../playlist/playlist.service');
const artistService = require('../artist/artist.service');

async function createAccount(userData) {
  const salt = await securityUtil.generateSalt();
  const hash = await securityUtil.getHash(userData.password, salt);

  const user = await userService.create({
    login: userData.login,
    passwordHash: hash.toString(),
    passwordSalt: salt.toString(),
    email: userData.email,
    playlists: [],
    albums: [],
    tracks: [],
  });

  return user;
}

exports.signup = async (ctx) => {
  const userData = ctx.request.body;

  await createAccount(userData);
  this.status = 200;
};

module.exports.signin = async (ctx) => {
  let isPasswordMatch = false;

  const user = userService.findOne({ email: ctx.request.body.email });

  if (user) {
    isPasswordMatch = await securityUtil
      .compareTextWithHash(ctx.request.body.password, user.passwordHash, user.passwordSalt);
  } else {
    ctx.errors.push({ email: 'User with such email doesn\'t exist' });
  }

  if (!isPasswordMatch) {
    ctx.errors.push({ password: 'Invalid password' });
  } else {
    ctx.state.user = user;
    this.status = 200;
  }
};

module.exports.logout = (ctx) => {
  ctx.state.user = {};
};

module.exports.getUser = (ctx, next) => {
  const {
    _id,
    artists,
    albums,
    tracks,
    playlists,
    login,
  } = userService.findOne({ login: ctx.params.user });

  const user = {
    _id,
    artists,
    albums,
    tracks,
    playlists,
    login,
  };

  ctx.body = user;
};

module.exports.getUserAlbums = (ctx, next) => {
  const user = { ...userService.findOne({ login: ctx.params.user }) };

  const albums = user.albums.map(id =>
    albumService.findOne({ _id: id }));

  ctx.body = albums;
};

module.exports.getUserPlaylists = (ctx, next) => {
  const user = { ...userService.findOne({ login: ctx.params.user }) };

  const playlists = user.playlists.map(id =>
    playlistService.findOne({ _id: id }));

  ctx.body = playlists;
};

module.exports.getUserTracks = (ctx, next) => {
  const user = { ...userService.findOne({ login: ctx.params.user }) };

  const tracks = user.tracks.map(id =>
    trackService.findOne({ _id: id }));

  ctx.body = tracks;
};

module.exports.getUserArtists = (ctx, next) => {
  const user = { ...userService.findOne({ login: ctx.params.user }) };

  const artists = user.artists.map(id =>
    artistService.findOne({ _id: id }));

  ctx.body = artists;
};

module.exports.addArtist = (ctx, next) => {
  const user = userService.findOne({ login: ctx.params.user });
  const artist = artistService.findOne({ _id: ctx.request.body._id });

  if (user.artists.indexOf(artist._id) === -1) {
    user.artists = [...user.artists, artist._id];
    artist.followers += 1;
  }

  ctx.body = {};
};

module.exports.removeArtist = (ctx, next) => {
  const user = userService.findOne({ login: ctx.params.user });
  const artist = artistService.findOne({ _id: ctx.params.id });

  if (user.artists.indexOf(artist._id) !== -1) {
    user.artists = user.artists.filter(item => item !== artist._id);
    artist.followers -= 1;
  }

  ctx.body = {};
};

module.exports.addAlbum = (ctx, next) => {
  const user = userService.findOne({ login: ctx.params.user });

  user.albums = [...user.albums, ctx.request.body._id];

  ctx.body = {};
};

module.exports.removeAlbum = (ctx, next) => {
  const user = userService.findOne({ login: ctx.params.user });

  user.albums = user.albums.filter(item => item !== ctx.params.id);

  ctx.body = {};
};

module.exports.addTrack = (ctx, next) => {
  const user = userService.findOne({ login: ctx.params.user });

  user.tracks = [...user.tracks, ctx.request.body._id];

  ctx.body = {};
};

module.exports.removeTrack = (ctx, next) => {
  const user = userService.findOne({ login: ctx.params.user });

  user.tracks = user.tracks.filter(item => item !== ctx.params.id);

  ctx.body = {};
};

module.exports.addPlaylist = (ctx, next) => {
  const user = userService.findOne({ login: ctx.params.user });

  user.playlists = [...user.playlists, ctx.request.body._id];

  ctx.body = {};
};

module.exports.removePlaylist = (ctx, next) => {
  const user = userService.findOne({ login: ctx.params.user });

  user.playlists = user.playlists.filter(item => item !== ctx.params.id);

  ctx.body = {};
};
