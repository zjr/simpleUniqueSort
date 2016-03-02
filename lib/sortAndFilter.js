'use strict';

const fs       = require('fs');
const unique   = require('./unique');
const loadList = require('./loadList');

const concat = Array.prototype.concat;

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
  loadList((err, emails) => {
    if (err) { return cb(err); }

    const time = process.hrtime();

    const unique = unique.orig(emails);
    const sorted = sortLetters(unique);

    const diff = process.hrtime(time);

    const runTime = diff[0] + diff[1] * 1e-9 + 's';

    cb(null, { emails, sorted, runTime });
  });
};
