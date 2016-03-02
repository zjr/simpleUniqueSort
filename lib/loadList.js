'use strict';

const fs = require('fs');

module.exports = function loadList(cb) {
  fs.readFile(`${__dirname}/tmp/shuffledList.json`, (err, data) => {
    if (err) { return cb(err); }
    try {
      const list = JSON.parse(data);
      cb(null, list)
    } catch (e) {
      cb(e);
    }
  });
};
