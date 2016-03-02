'use strict';

const _       = require('lodash');
const fs      = require('fs');
const genName = require('sillyname');

const hosts = ['yahoo', 'gmail', 'aol'];
const tlds  = ['com', 'net', 'biz'];

module.exports = function genList(opts, cb) {
  const emails = [];

  let listSize = parseInt(opts.listSize) || 1e5;
  let dupeRate = parseFloat(opts.dupeRate) || 1;

  if (listSize > 1e6) { listSize = 1e6; }
  if (listSize < 1) { return cb(null, null); }

  if (dupeRate > 1) { dupeRate = 1; }
  if (dupeRate < 0) { dupeRate = 0; }

  for (let i = 0; i < listSize * (dupeRate / 2); i++) {
    const name  = genName().split(' ').join('').toLowerCase();
    const host  = _.sample(hosts);
    const tld   = _.sample(tlds);
    const email = `${name}@${host}.${tld}`;

    emails.push(email);

    if (Math.random() < dupeRate) {
      emails.push(email);
    }
  }

  const shuffled = _.shuffle(emails);
  const data     = JSON.stringify(shuffled);

  fs.writeFile(`${__dirname}/tmp/shuffledList.json`, data, err => {
    if (err) { return cb(err); }
    cb(null, data);
  });
};
