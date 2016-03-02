'use strict';

const sortAndFilter = require('../lib/sortAndFilter');

module.exports = function (router) {

  router.get('/', function (req, res) {
    sortAndFilter((err, data) => {
      if (err) { return res.status(500).json(err); }
      res.json(data);
    });
  });

};
