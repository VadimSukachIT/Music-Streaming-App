const generateId = require('../../helpers/idGenerator');

let albums = [
  {
    _id: '1',
    title: 'Revival',
    artist: 'Eminem',
    artistId: '1',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2017',
    genres: ['1'],
    cover: 'http://ru.recordshopx.com/cover/normal/5/56/560588.jpg?cd',
  },
  {
    _id: '2',
    title: 'Recovery',
    artist: 'Eminem',
    artistId: '1',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2010',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/archive/8/80/20100526093203%21Eminem_recovery_cover_a.jpg',
  },
  {
    _id: '3',
    title: 'The Marshall Mathers LP 2',
    artist: 'Eminem',
    artistId: '1',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2013',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/2/23/Cover_art_Eminem_-_The_Marshall_Mathers_LP_2.jpg/230px-Cover_art_Eminem_-_The_Marshall_Mathers_LP_2.jpg',
  },
  {
    _id: '4',
    title: 'Relapse',
    artist: 'Eminem',
    artistId: '1',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2009',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/8/81/Relapse_cover.jpg',
  },
  {
    _id: '5',
    title: 'The Slim Shady LP',
    artist: 'Eminem',
    artistId: '1',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2009',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f9/The_Slim_Shady_LP.jpg/230px-The_Slim_Shady_LP.jpg',
  },
  {
    _id: '6',
    title: 'One More Light',
    artist: 'Linkin Park',
    artistId: '2',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2017',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f8/One_More_Light.jpg/230px-One_More_Light.jpg',
  },
  {
    _id: '7',
    title: 'The Hunting Party',
    artist: 'Linkin Park',
    artistId: '2',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    dat: '2014',
    genreI: '1',
    cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/3/3c/The_Hunting_Party_2014.jpg/1200px-The_Hunting_Party_2014.jpg',
  },
  {
    _id: '8',
    title: 'Living Things',
    artist: 'Linkin Park',
    artistId: '2',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2012',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/0/00/Living_Things.jpg/230px-Living_Things.jpg',
  },
  {
    _id: '9',
    title: 'A Thousand Suns',
    artist: 'Linkin Park',
    artistId: '2',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2010',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b9/ATS_lpblast.jpg/220px-ATS_lpblast.jpg',
  },
  {
    _id: '10',
    title: 'Minutes To Midnight',
    artist: 'Linkin Park',
    artistId: '2',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2007',
    genres: ['1'],
    cover: 'https://avatars.yandex.net/get-music-content/34131/6dedd789.a.339859-1/m1000x1000',
  },
  {
    _id: '11',
    title: 'Meteora',
    artist: 'Linkin Park',
    artistId: '2',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2003',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/bf/Meteora.jpg/230px-Meteora.jpg',
  },
  {
    _id: '12',
    title: 'Hybrid Theory',
    artist: 'Linkin Park',
    artistId: '2',
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    date: '2000',
    genres: ['1'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/archive/8/8e/20100228151217%21Linkin_Park_Hybrid_Theory.png',
  },
];

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
