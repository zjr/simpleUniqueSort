'use strict';

const _       = require('lodash');
const fs      = require('fs');
const genName = require('sillyname');

const hosts = ['yahoo', 'gmail', 'aol'];
const tlds  = ['com', 'net', 'biz'];

module.exports = function genList(opts, cb) {
  const emails = [];

  const listSize = parseInt(opts.listSize) || 1e5;
  const dupeRate = parseFloat(opts.dupeRate) || 0.5;

  for (let i = 0; i < listSize * dupeRate; i++) {
    const name  = genName().split(' ').join('').toLowerCase();
    const host  = _.sample(hosts);
    const tld   = _.sample(tlds);
    const email = `${name}@${host}.${tld}`;
    emails.push(email, email);
  }

  const shuffledList = JSON.stringify(_.shuffle(emails));

  fs.writeFile(`${__dirname}/tmp/shuffledList.json`, shuffledList, err => {
    if (err) { return cb(err); }
    cb(null, shuffledList);
  });
};
