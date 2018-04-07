const generateId = require('../../helpers/idGenerator');

let genres = [{
  _id: '1',
  title: 'Alternative / Indie',
  albums: [
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  cover: 'https://http2.mlstatic.com/cd-linkin-park-meteora-original-y-sellado-D_NQ_NP_979521-MLC20805929449_072016-F.jpg',
  icon: 'https://image.ibb.co/kfLx7H/drummer.png',
}, {
  _id: '2',
  title: 'Hip Hop',
  albums: [
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
  cover: 'http://cdn.pophangover.com/wp-content/uploads/2014/06/rap-album-7.jpg',
  icon: 'https://image.ibb.co/gJwOxH/breakdancing_dancer.png',
}, {
  _id: '3',
  title: 'Classical',
  albums: [],
  cover: 'https://is3-ssl.mzstatic.com/image/thumb/Music2/v4/5b/d5/ed/5bd5ed33-cc8a-e96f-01c0-d04de63f6dd1/dj.colryhvp.jpg/600x600bf.jpg',
  icon: 'https://image.ibb.co/jhgR1c/conductor.png',
}, {
  _id: '4',
  title: 'Dubstep',
  albums: [],
  cover: 'http://www.exil.de/press/bilder/covers/Generation%20BassprintNEU.jpg',
  icon: 'https://image.ibb.co/eeDH7H/dj.png',
}, {
  _id: '5',
  title: 'Instrumental',
  albums: [],
  cover: 'http://heartfeltmusic.org/wp-content/uploads/2013/04/ReggieCoates_InstrumentalGuitarVolume1.jpg',
  icon: 'https://image.ibb.co/iUMgZx/musician.png',
}, {
  _id: '6',
  title: 'Pop',
  albums: [],
  cover: 'https://prabook.com/web/show-photo.jpg?id=54540',
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
