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
  })
  
  .get('/:id', (req, res) => {
    Trip
      .findById(req.params.id)
      .populate('iteneraryItems')
      .then(trip => {
        res.send(trip);
      });
  })

  .patch('/:id', (req, res) => {
    Trip
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trip => res.send(trip));
  })
  
  .delete('/:id', (req, res) => {
    Trip
      .findByIdAndDelete(req.params.id)
      .then(trip => res.send(trip));
  });
