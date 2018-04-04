const generateId = require('../../helpers/idGenerator');

let genres = [{
  _id: '1',
  title: 'Rock',
  albums: [
    '1',
  ],
  cover: 'https://http2.mlstatic.com/cd-linkin-park-meteora-original-y-sellado-D_NQ_NP_979521-MLC20805929449_072016-F.jpg',
  icon: 'https://image.ibb.co/kfLx7H/drummer.png',
}, {
  _id: '2',
  title: 'Hip Hop',
  albums: [],
  cover: 'https://cdn.albumoftheyear.org/album/thumbs/2017/76870-damn-1.jpg',
  icon: 'https://image.ibb.co/gJwOxH/breakdancing_dancer.png',
}, {
  _id: '3',
  title: 'Classical',
  albums: [],
  cover: 'https://cdn.albumoftheyear.org/album/thumbs/2017/76870-damn-1.jpg',
  icon: 'https://image.ibb.co/jhgR1c/conductor.png',
}, {
  _id: '4',
  title: 'Dubstep',
  albums: [],
  cover: 'https://cdn.albumoftheyear.org/album/thumbs/2017/76870-damn-1.jpg',
  icon: 'https://image.ibb.co/eeDH7H/dj.png',
}, {
  _id: '5',
  title: 'Instrumental',
  albums: [],
  cover: 'https://cdn.albumoftheyear.org/album/thumbs/2017/76870-damn-1.jpg',
  icon: 'https://image.ibb.co/iUMgZx/musician.png',
}, {
  _id: '6',
  title: 'Pop',
  albums: [],
  cover: 'https://cdn.albumoftheyear.org/album/thumbs/2017/76870-damn-1.jpg',
  icon: 'https://image.ibb.co/nupDgc/singer.png',
}];

const service = {};

service.find = (query) => {
  if (query) {
    const res = genres.filter((item) => {
      const arr = Object.keys(query).filter(key => item[key] === query[key]);
      return arr.length;
    });
    return res;
  }
  return genres;
};

service.findOne = (query) => {
  const res = genres.find((item) => {
    const arr = Object.keys(query).filter(key => item[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.update = (obj) => {
  const index = genres.findIndex(item => item._id === obj._id);
  genres[index] = obj;
  return obj;
};

service.remove = (query) => {
  const removed = [];
  genres = genres.filter((item) => {
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
  genres.push(newObj);
};

module.exports = service;
