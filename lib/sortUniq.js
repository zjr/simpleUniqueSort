'use strict';

const fs = require('fs');

const concat = Array.prototype.concat;

const filterUniques = function filterUniques(emails) {
  let cache = {};
  emails.forEach(email => {
    if (!cache[email]) { cache[email] = 1; }
  });
  return Object.keys(cache);
};

const getCharCode = function getCharCode(string, idx) {
  // only supporting [a-z@\.] for now
  let code = string.charCodeAt(idx);
  if (code === 46) { return 26; }
  if (code === 64) { return 27; }
  return code - 97;
};

const sortLetters = function sortLetters(emails, idx) {
  idx              = idx || 0;
  let letterCaches = [];
  emails.forEach(email => {
    let code = getCharCode(email, idx);
    if (!letterCaches[code]) { letterCaches[code] = []; }
    letterCaches[code].push(email);
  });
  let sorted = letterCaches.map(cache => {
    if (cache.length > 1) {
      return sortLetters(cache, idx + 1);
    } else {
      return cache;
    }
  });

  return concat.apply([], sorted.filter(x => x.length));
};

module.exports = function loadListAndSort(cb) {
  fs.readFile(`${__dirname}/tmp/shuffledList.json`, (err, data) => {
    if (err) { return cb(err); }

    let emails;

    try {
      emails = JSON.parse(data);
    } catch (e) {
      return cb(e);
    }

    const time = process.hrtime();

    const unique = filterUniques(emails);
    const sorted = sortLetters(unique);
    const diff   = process.hrtime(time);

    cb(null, { emails, sorted, diff });
  });
};

