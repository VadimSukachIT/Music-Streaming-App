const playlistService = require('./playlist.service');
const userService = require('../user/user.service');
const trackService = require('../track/track.service');

module.exports.getPlaylistById = async (ctx, next) => {
  const playlist = { ...await playlistService.findOne({ _id: ctx.params.id }) };

  playlist.tracks = await playlist.tracks.map((id) => {
    const doc = trackService.findOne({ _id: id });
    return doc || {};
  });

  ctx.body = playlist;
};


module.exports.getAllPlaylists = async (ctx, next) => {
  const playlists = await playlistService.find();
  ctx.body = playlists;
};

module.exports.createPlaylist = (ctx, next) => {
  const playlist = ctx.request.body;

  playlist.cover = playlist.cover || 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg';
  const newObj = playlistService.create(playlist);

  const user = userService.findOne({ _id: playlist.userId });
  user.playlists.push(playlist._id);

  ctx.status = 200;
  ctx.body = newObj;
};

module.exports.updatePlaylist = (ctx, next) => {
  const playlist = ctx.request.body;

  const newObj = playlistService.update(playlist);

  ctx.status = 200;
  ctx.body = newObj;
};

module.exports.removePlaylist = (ctx, next) => {
  const removed = playlistService.remove({ _id: ctx.params.id });
  ctx.status = removed.length ? 200 : 400;
};
