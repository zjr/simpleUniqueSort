'use strict';

module.exports = exports;

exports.orig = function origUnique(list) {
  let cache = {};
  list.forEach(li => {
    if (!cache[li]) { cache[li] = 1; }
  });
  return Object.keys(cache);
};

exports.origPerf = function origPerf(list) {
  const time       = process.hrtime();
  const uniqueList = exports.orig(list);
  const diff       = process.hrtime(time);
  const runTime    = diff[0] + diff[1] * 1e-9 + 's';
  return { uniqueList, runTime }
};
