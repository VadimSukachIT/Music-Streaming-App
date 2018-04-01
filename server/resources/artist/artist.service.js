const generateId = require('../../helpers/idGenerator');

let artists = [
    {
        _id: '1',
        name: 'Eminem',
        smallCover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/LPLogo-black.svg/200px-LPLogo-black.svg.png',
        bigCover: 'https://i.scdn.co/image/5a4d488ed4e5f9bbb741d57b3a71e61d09794ce3',
        genres: [
            '1',
        ],
        albums: [
            '1',
        ],
        followers: "5200",
    },
];

const service = {};

service.find = (query) => {
    const res = artists.filter((item) => {
        const arr = Object.keys(query).filter(key => item[key] === query[key]);
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
