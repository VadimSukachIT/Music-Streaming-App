const generateId = require('helpers/idGenerator');

let genres = [{
  _id: '1',
  name: 'Rock',
  tracks: [
    '1',
  ],
}];

const service = {};

service.find = (query) => {
  const res = genres.filter((item) => {
    const arr = Object.keys(query).filter(key => item[key] === query[key]);
    return arr.length;
  });
  return res;
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
