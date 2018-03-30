const generateId = require('helpers/idGenerator');

let accounts = [];

const service = {};

service.find = (query) => {
  const res = accounts.filter((item) => {
    const arr = Object.keys(query).filter(key => item[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.findOne = (query) => {
  const res = accounts.find((item) => {
    const arr = Object.keys(query).filter(key => item[key] === query[key]);
    return arr.length;
  });
  return res;
};

service.update = (obj) => {
  const index = accounts.findIndex(item => item._id === obj._id);
  accounts[index] = obj;
  return obj;
};

service.remove = (query) => {
  const removed = [];
  accounts = accounts.filter((item) => {
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
  accounts.push(newObj);
};

module.exports = service;
