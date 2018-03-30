const generateId = require('helpers/idGenerator');

let tracks = [{
  _id: '1',
  name: 'Rebellion',
  genres: [
    '1',
  ],
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}];

const service = {};

service.find = (query) => {
  const res = tracks.filter((item) => {
    const arr = Object.keys(query).filter(key => item[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.findOne = (query) => {
  const res = tracks.find((item) => {
    const arr = Object.keys(query).filter(key => item[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.update = (obj) => {
  const index = tracks.findIndex(item => item._id === obj._id);
  tracks[index] = obj;
  return obj;
};

service.remove = (query) => {
  const removed = [];
  tracks = tracks.filter((item) => {
    const arr = Object.keys(query).filter(key => item[key] === query[key]);
    if (arr.length) {
      removed.push(item);
    }
    return !arr.length;
  });
  return removed;
};

service.create = (obj) => {
  const newObj = obj;
  newObj._id = generateId();
  tracks.push(newObj);
};

module.exports = service;
