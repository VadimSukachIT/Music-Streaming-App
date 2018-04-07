const generateId = require('../../helpers/idGenerator');

let artists = [
  {
    _id: '1',
    name: 'Eminem',
    smallCover: 'https://djbooth.net/.image/t_share/MTUzNDg2MDMwOTQwNTQ2OTI5/eminem-pre-fame-press-release-updatejpg.jpg',
    bigCover: 'https://i.scdn.co/image/5a4d488ed4e5f9bbb741d57b3a71e61d09794ce3',
    genres: [
      '1',
    ],
    albums: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    tracks: [
      '1',
      '2',
      '3',
      '4',
      '5',
    ],
    followers: 5200,
  },
  {
    _id: '2',
    name: 'Linkin Park',
    smallCover: 'http://assets.blabbermouth.net/media/linkinpark2017withoutchester_638.jpg',
    bigCover: 'https://gfx.antyradio.pl/var/antyradio/storage/images/newsy/rock-news/chester-bennington-zjadlem-tone-lsd-i-bardzo-duzo-pilem!-1546/339907-9-pol-PL/Chester-Bennington-Zjadlem-tone-LSD-i-bardzo-duzo-pilem.jpg',
    genres: [
      '1',
    ],
    albums: [
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ],
    tracks: [
      '6',
      '7',
      '8',
      '9',
      '10',
    ],
    followers: 5200,
  },
    {
        _id: '3',
        name: 'Kendrick Lamar',
        smallCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP63GJbOqmqJ6r4H543KQkmNmyEcp6-0ZR00d_kA2DiicFs4k',
        bigCover: 'https://i.scdn.co/image/5a4d488ed4e5f9bbb741d57b3a71e61d09794ce3',
        genres: [
            '1',
        ],
        albums: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
        tracks: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
        followers: 5200,
    },
    {
        _id: '4',
        name: 'Скриптонит',
        smallCover: 'http://ztb.kz/media/imperavi/59f730007380b.jpg',
        bigCover: 'https://i.scdn.co/image/5a4d488ed4e5f9bbb741d57b3a71e61d09794ce3',
        genres: [
            '1',
        ],
        albums: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
        tracks: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
        followers: 5200,
    },
    {
        _id: '5',
        name: 'Post Malone',
        smallCover: 'https://media.thehypemagazine.com/wp-content/uploads/2017/10/post.jpg',
        bigCover: 'https://i.scdn.co/image/5a4d488ed4e5f9bbb741d57b3a71e61d09794ce3',
        genres: [
            '1',
        ],
        albums: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
        tracks: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
        followers: 5200,
    },
    {
        _id: '6',
        name: 'The Weeknd',
        smallCover: 'http://www.rap-up.com/app/uploads/2017/06/the-weeknd-blue.jpg',
        bigCover: 'https://i.scdn.co/image/5a4d488ed4e5f9bbb741d57b3a71e61d09794ce3',
        genres: [
            '1',
        ],
        albums: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
        tracks: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
        followers: 5200,
    },
];

const service = {};

service.find = (query) => {
  const res = artists.filter((item) => {
    const arr = Object.keys(query).filter((key) => {
      return typeof query[key] === 'string' ? item[key] === query[key] : item[key].match(query[key]);
    });
    return arr.length;
  });
  return res;
};

service.findOne = (query) => {
  const res = artists.find((item) => {
    const arr = Object.keys(query).filter(key => item[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.update = (obj) => {
  const index = artists.findIndex(item => item._id === obj._id);
  artists[index] = obj;
  return obj;
};

service.remove = (query) => {
  const removed = [];
  artists = artists.filter((item) => {
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
  artists.push(newObj);
};

module.exports = service;
