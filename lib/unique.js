'use strict';

module.exports = exports;

exports.orig = function origUnique(list) {
  const cache = {};
  list.forEach(li => {
    if (!cache[li]) { cache[li] = 1; }
  });
  return Object.keys(cache);
};

exports.better = function betterUnique(list) {
  const cache   = {};
  const uniques = [];
  for (let i = 0; i < list.length; i++) {
    const li = list[i];
    if (!cache[li]) {
      cache[li] = 1;
      uniques.push(li);
    }
  }
  return uniques;
};

exports.withPerf = function withPerf(list, orig) {
  const time       = process.hrtime();
  const uniqueList = orig ? exports.orig(list) : exports.better(list);
  const diff       = process.hrtime(time);
  const runTime    = diff[0] + diff[1] * 1e-9 + 's';
  return { uniqueList, runTime }
};
