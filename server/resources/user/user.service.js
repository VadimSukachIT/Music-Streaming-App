const generateId = require('../../helpers/idGenerator');

let accounts = [{
    _id: '1',
    email: 'darkavatar21',
    login: 'darkavatar21',
    playlists: [
        '1',
        '2',
        '3'
    ],
    albums: [
        '1',
        '2',
        '6',
        '7'
    ],
    tracks: [
        '1',
        '2',
        '3',
        '4',
        '5',
    ],
    artists: [
        '1',
        '3',
        '4',
        '5',
        '6',
    ],
    currentPlaylist: [],
    currentTrack: {},
}];

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
