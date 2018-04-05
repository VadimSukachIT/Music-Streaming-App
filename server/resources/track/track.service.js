const generateId = require('../../helpers/idGenerator');

let tracks = [
    {
        _id: '1',
        name: 'River',
        albumId: '1',
        album: 'Revival',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 380,
        url: 'http://k003.kiwi6.com/hotlink/vfo99hyihz/LoseYourself.mp3',
    },
    {
        _id: '2',
        name: 'Without Me',
        albumId: '1',
        album: 'The Eminem Show',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 260,
        url: 'http://k003.kiwi6.com/hotlink/f6kgn3ii2h/eminem-without-me_mp3CC.com_.mp3',
    },
    {
        _id: '3',
        name: 'Not Afraid',
        albumId: '2',
        album: 'Recovery',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 250,
        url: 'http://k003.kiwi6.com/hotlink/m03blt6t8q/Eminem_-_Iam_not_Afraid.mp3',
    },
    {
        _id: '4',
        name: 'Lose Yourself',
        albumId: '1',
        album: '8 Mile',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 267,
        url: 'http://k003.kiwi6.com/hotlink/vfo99hyihz/LoseYourself.mp3',
    },
    {
        _id: '5',
        name: 'Monster',
        albumId: '3',
        album: 'The Marshal Matters LP 2',
        artistId: '1',
        artist: 'Eminem',
        durationInSec: 330,
        url: 'http://k003.kiwi6.com/hotlink/fj1tk1uua6/Eminem_The_Monster_ft._Rihanna_.mp3',
    },
    {
        _id: '6',
        name: 'Numb',
        albumId: '1',
        album: 'Meteora',
        artistId: '2',
        artist: 'Linkin Park',
        durationInSec: 186,
        url: 'http://k003.kiwi6.com/hotlink/8ot6jmv4ba/Linkin_Park_-_Numb_-_.mp3',
    },
    {
        _id: '7',
        name: 'In The End',
        albumId: '12',
        album: 'Hybrid Theory',
        artistId: '2',
        artist: 'Linkin Park',
        durationInSec: 207,
        url: 'http://k003.kiwi6.com/hotlink/whtwj7nbmh/In_the_end.mp3',
    },
    {
        _id: '8',
        name: "What I've Done",
        albumId: '10',
        album: 'Minutes To Midnight',
        artistId: '2',
        artist: 'Linkin Park',
        durationInSec: 227,
        url: 'http://k003.kiwi6.com/hotlink/56ys67pr8o/06-What_I_ve_Done.mp3',
    },
    {
        _id: '9',
        name: 'Breaking The Habit',
        albumId: '11',
        album: 'Meteora',
        artistId: '2',
        artist: 'Linkin Park',
        durationInSec: 208,
        url: 'http://k003.kiwi6.com/hotlink/wq47kxoa7w/linkin-park-breaking-the-habit.mp3',
    },
    {
        _id: '10',
        name: 'Burn It Down',
        albumId: '8',
        album: 'Living Things',
        artistId: '2',
        artist: 'Linkin Park',
        durationInSec: 233,
        url: 'http://k003.kiwi6.com/hotlink/0nwiqil00i/Linkin_Park_-_Burn_It_Down.mp3',
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
