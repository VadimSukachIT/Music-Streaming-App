const playlistService = require('./playlist.service');
const trackService = require('../track/track.service');

module.exports.getPlaylistById = (ctx, next) => {
  const playlist = playlistService.findOne({ _id: ctx.params.id });

  playlist.tracks = playlist.tracks.map(id =>
    trackService.findOne({ _id: id }));

  ctx.body = playlist;
};

module.exports.getUserPlaylists = (ctx, next) => {
  ctx.body = playlistService.find({ userId: '1' });
};

module.exports.createPlaylist = (ctx, next) => {
  const playlist = ctx.request.body;
  playlist.userId = ctx.state.user._id;

  playlistService.create(playlist);
  ctx.status = 200;
};

module.exports.updatePlaylist = (ctx, next) => {
  const playlist = ctx.request.body;

  playlistService.update(playlist);
  ctx.status = 200;
};

module.exports.removePlaylist = (ctx, next) => {
  const removed = playlistService.remove({ _id: ctx.params.id });
  ctx.status = removed.length ? 200 : 400;
};
