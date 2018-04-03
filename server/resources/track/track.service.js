const generateId = require('../../helpers/idGenerator');

let tracks = [
    {
        _id: '1',
        name: 'River',
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'Revival',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 380,
    },
    {
        _id: '2',
        name: 'Without Me',
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'The Eminem Show',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 260,
    },
    {
        _id: '3',
        name: 'Not Afraid',
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'Recovery',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 250,
    },
    {
        _id: '4',
        name: 'Lose Yourself',
        genres: [
            '1',
        ],
        albumId: '1',
        album: '8 Mile',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 267,
    },
    {
        _id: '5',
        name: 'Monster',
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'The Marshal Matters LP 2',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 330,
    },
    {
        _id: '6',
        name: 'Numb',
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'Meteora',
        artistId: '1',
        artist: 'Linkin Park',
        durationInSec: 186,
    },
    {
        _id: '7',
        name: 'In The End',
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'Hybrid Theory',
        artistId: '1',
        artist: 'Linkin Park',
        durationInSec: 207,
    },
    {
        _id: '8',
        name: "What I've Done",
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'Minutes To Midnight',
        artistId: '1',
        artist: 'Linkin Park',
        durationInSec: 227,
    },
    {
        _id: '9',
        name: 'Breaking The Habit',
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'Meteora',
        artistId: '1',
        artist: 'Linkin Park',
        durationInSec: 208,
    },
    {
        _id: '10',
        name: 'Burn It Down',
        genres: [
            '1',
        ],
        albumId: '1',
        album: 'Living Things',
        artistId: '1',
        artist: 'Linkin Park',
        durationInSec: 233,
    },

];

const service = {};

service.find = (query) => {
    const res = tracks.filter((item) => {
        const arr = Object.keys(query).filter(key => item[key] === query[key]);
        return arr.length;
    });
    return res;
};

service.findOne = (query) => {
    const res = tracks.find((item) => {
        const arr = Object.keys(query).filter(key => item[key] === query[key]);
        return arr.length;
    });
    return res;
};

service.update = (obj) => {
    const index = tracks.findIndex(item => item._id === obj._id);
    tracks[index] = obj;
    return obj;
};

service.remove = (query) => {
    const removed = [];
    tracks = tracks.filter((item) => {
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
    tracks.push(newObj);
};

module.exports = service;
