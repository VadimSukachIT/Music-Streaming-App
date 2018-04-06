const trackService = require('./track.service');

module.exports.geTracksByString = async (ctx, next) => {
  const searchString = new RegExp(ctx.request.body.search, 'i');
  const tracks = trackService.find({ name: searchString });

  ctx.body = tracks || [];
};
