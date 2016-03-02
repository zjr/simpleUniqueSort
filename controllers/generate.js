'use strict';

const genList = require('../lib/genList');

module.exports = function (router) {

  router.get('/', function (req, res) {

    genList(req.query, (err, data) => {
      if (err) { return res.status(500).json(err); }
      res.json(data);
    });

  });

};
