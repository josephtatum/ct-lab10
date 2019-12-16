const { Router } = require('express');
const IteneraryItem = require('../models/IteneraryItem');

module.exports = Router()

  .post('/', (req, res) => {
    IteneraryItem
      .create(req.body)
      .then(item => res.send(item));
  });
