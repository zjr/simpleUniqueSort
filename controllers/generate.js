'use strict';

const genList = require('../lib/genList');

module.exports = function (router) {

  router.get('/', function (req, res) {
    genList((err, data) => {
      if (err) { return res.status(500).send(err); }
      res.send(data);
    });
  });

};
