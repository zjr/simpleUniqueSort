'use strict';

module.exports = exports;

exports.orig = function orig(emails) {
  let cache = {};
  emails.forEach(email => {
    if (!cache[email]) { cache[email] = 1; }
  });
  return Object.keys(cache);
};
