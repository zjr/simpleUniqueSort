'use strict';

const unique   = require('../lib/unique');
const loadList = require('../lib/loadList');

module.exports = function (router) {

  router.get('/', function (req, res) {

    loadList((err, data) => {
      if (err) { return res.status(500).json(err); }
      const uniqueResults = unique.withPerf(data, req.query.orig);

      const body = req.query.includeList
        ? uniqueResults
        : uniqueResults.runTime;

      res.json(body);
    });

  });

};
