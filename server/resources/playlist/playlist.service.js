const generateId = require('../../helpers/idGenerator');
const userService = require('../user/user.service');

let playlists = [{
  _id: '1',
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  title: 'Playlist 1',
  userId: '1',
  tracks: [
    '1',
    '2',
    '3',
  ],
}, {
  _id: '2',
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  title: 'Playlist 2',
  userId: '1',
  tracks: [
    '3',
    '4',
    '5',
  ],
}, {
  _id: '3',
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  title: 'A Thousand Suns Playlist',
  userId: '1',
  tracks: [
    '2',
    '5',
    '6',
  ],
}, {
  _id: '4',
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  title: 'A Thousand Suns',
  userId: '1',
  tracks: [
    '2',
    '4',
    '6',
  ],
},
{
  _id: '8',
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  title: 'A Thousand Suns',
  userId: '1',
  tracks: [
    '2',
    '4',
    '6',
  ],
},
{
  _id: '5',
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  title: 'A Thousand Suns',
  userId: '1',
  tracks: [
    '2',
    '4',
    '6',
  ],
},
{
  _id: '6',
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  title: 'A Thousand Suns',
  userId: '1',
  tracks: [
    '2',
    '4',
    '6',
  ],
},
{
  _id: '7',
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  title: 'A Thousand Suns',
  userId: '1',
  tracks: [
    '2',
    '4',
    '6',
  ],
}];

const service = {};

service.find = (query) => {
  if (query) {
    const res = playlists.filter((item) => {
      const arr = Object.keys(query).filter((key) => {
        return typeof query[key] === 'string' ? item[key] === query[key] : item[key].match(query[key]);
      });
      return arr.length;
    });
    return res;
  }
  return playlists;
};

service.findOne = (query) => {
  const res = playlists.find((playlist) => {
    const arr = Object.keys(query).filter(key => playlist[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.update = (obj) => {
  const index = playlists.findIndex(item => item._id === obj._id);
  playlists[index] = obj;
  return obj;
};

service.remove = (query) => {
  const removed = [];
  playlists = playlists.filter((playlist) => {
    const arr = Object.keys(query).filter(key => playlist[key] === query[key]);
    if (arr.length) {
      const user = userService.findOne({ _id: playlist.userId });
      user.playlists = user.playlists.filter(item => item !== playlist._id);
      removed.push(playlist);
    }
    return !arr.length;
  });
  return removed;
};

service.create = (obj) => {
  const newObj = obj;
  newObj._id = generateId();
  playlists.push(newObj);
  return newObj;
};

module.exports = service;
