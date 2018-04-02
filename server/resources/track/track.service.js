const generateId = require('../../helpers/idGenerator');

let tracks = [{
  _id: '0',
  name: 'The Requiem',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}, {
  _id: '1',
  name: 'The Radiance',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}, {
  _id: '2',
  name: 'Burning in the Skies',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}, {
  _id: '3',
  name: 'Empty Spaces',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}, {
  _id: '4',
  name: 'When They Come for Me',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}, {
  _id: '5',
  name: 'Robot Boy',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}, {
  _id: '6',
  name: 'Jornada del Muerto',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}, {
  _id: '7',
  name: 'Rebellion',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
  artistId: '1',
  artist: 'Linkin Park',
  durationInSec: 200,
}, {
  _id: '8',
  name: 'Waiting for the End',
  genres: [
    '1',
  ],
  albumId: '1',
  album: 'A Thousand Suns',
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
