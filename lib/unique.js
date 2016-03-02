'use strict';

module.exports = exports;

exports.orig = function orig(emails) {
  let cache = {};
  emails.forEach(email => {
    if (!cache[email]) { cache[email] = 1; }
  });
  return Object.keys(cache);
};

exports.origPerf = function origPerf(emails) {
  const time       = process.hrtime();
  const uniqueList = exports.orig(emails);
  const diff       = process.hrtime(time);
  const runTime    = diff[0] + diff[1] * 1e-9 + 's';
  return { uniqueList, runTime }
};
