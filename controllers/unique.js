'use strict';

const unique   = require('../lib/unique');
const loadList = require('../lib/loadList');

module.exports = function (router) {

  router.get('/', function (req, res) {

    loadList((err, data) => {
      if (err) { return res.status(500).send(err); }
      const uniqueResults = unique.origPerf(data);

      const body = req.query.includeList
        ? uniqueResults
        : uniqueResults.runTime;

      res.send(body);
    });

  });

};
