const generateId = require('helpers/idGenerator');

let albums = [{
  _id: '10',
  title: '',
  artistId: '',
  artist: '',
  date: '',
  tracks: [
    '',
  ],
  genres: [
    '1',
  ],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
}, {
  _id: '1',
  title: 'A Thousand Suns',
  artist: 'Linkin Park',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
}, {
  _id: '1',
  title: 'DAMN.',
  artist: 'Kendrick Lamar',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/a7/Kendrick_Lamar_Damn_cover.jpg/230px-Kendrick_Lamar_Damn_cover.jpg',
}, {
  _id: '1',
  title: 'Born To Die',
  artist: 'Lana Del Rey',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/47/LanaDelRey_BornToDie.jpg/230px-LanaDelRey_BornToDie.jpg',
}, {
  _id: '1',
  title: 'Born To Die',
  artist: 'Lana Del Rey',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/47/LanaDelRey_BornToDie.jpg/230px-LanaDelRey_BornToDie.jpg',
}, {
  _id: '1',
  title: 'Born To Die',
  artist: 'Lana Del Rey',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/47/LanaDelRey_BornToDie.jpg/230px-LanaDelRey_BornToDie.jpg',
}, {
  _id: '1',
  title: 'Born To Die',
  artist: 'Lana Del Rey',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/47/LanaDelRey_BornToDie.jpg/230px-LanaDelRey_BornToDie.jpg',
}, {
  _id: '1',
  title: 'Born To Die',
  artist: 'Lana Del Rey',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/47/LanaDelRey_BornToDie.jpg/230px-LanaDelRey_BornToDie.jpg',
}, {
  _id: '1',
  title: 'Born To Die',
  artist: 'Lana Del Rey',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/47/LanaDelRey_BornToDie.jpg/230px-LanaDelRey_BornToDie.jpg',
}, {
  _id: '1',
  title: 'Born To Die',
  artist: 'Lana Del Rey',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/47/LanaDelRey_BornToDie.jpg/230px-LanaDelRey_BornToDie.jpg',
}, {
  _id: '1',
  title: 'Born To Die',
  artist: 'Lana Del Rey',
  artistId: '1',
  tracks: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  date: '2015',
  genres: ['1'],
  cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/47/LanaDelRey_BornToDie.jpg/230px-LanaDelRey_BornToDie.jpg',
}];

const service = {};

service.find = (query) => {
  const res = albums.filter((album) => {
    const arr = Object.keys(query).filter(key => album[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.findOne = (query) => {
  const res = albums.find((album) => {
    const arr = Object.keys(query).filter(key => album[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.update = (obj) => {
  const index = albums.findIndex(item => item._id === obj._id);
  albums[index] = obj;
  return obj;
};

service.remove = (query) => {
  const removed = [];
  albums = albums.filter((album) => {
    const arr = Object.keys(query).filter(key => album[key] === query[key]);
    if (arr.length) {
      removed.push(album);
    }
    return !arr.length;
  });
  return removed;
};

service.create = (obj) => {
  const newObj = obj;
  newObj._id = generateId();
  albums.push(newObj);
};

module.exports = service;
