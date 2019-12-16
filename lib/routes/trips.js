const { Router } = require('express');
const Trip = require('../models/Trip');

module.exports = Router()
  .post('/', (req, res) => {
    if(req.body) {
      Trip
        .create(req.body)
        .then(trip => res.send(trip));
    } else {
      res.send('Hmm... somethings wrong.');
    }
  })

  .get('/', (req, res) => {
    Trip
      .find()
      .then(trips => res.send(trips));
  });
