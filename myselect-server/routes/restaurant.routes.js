const router = require('express').Router();
const mongoose = require('mongoose');

const Restaurant = require ('../models/Restaurant.model');
const User = require ('../models/User.model')


router.post('/restaurants', (req, res, next) => {
    const {name, location, description, picture} = req.body;

    Restaurant.create({name, location, description, picture})
    .then((response) => res.json(response))
    .catch((err) => next(err))
})


router.get('/restaurants', (req, res, next) => {
    Restaurant.find()
        .then((response) => res.json(response))
        .catch((err) => res.json(err))
})

router.get('/restaurants/:restaurantId', (req, res, next) => {
    const { restaurantId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
  
    Restaurant.findById(restaurantId)
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });
  
  router.put('/restaurants/:restaurantId', (req, res, next) => {
    const { restaurantId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
  
    Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

  router.delete('/restaurants/:restaurantId', (req, res, next) => {
    const { restaurantId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    Restaurant.findByIdAndRemove(restaurantId)
      .then(() => res.json({ message: `Restaurant with ${restaurantId} was removed successfully` }))
      .catch((err) => res.json(err));
  });

  router.get('/myrestaurants/no-populate/:userId', (req, res, next) => {
      const { userId } = req.params 
      User.findById(userId)
        // .populate('restaurantsList')
        .then((user) => res.json(user.restaurantsList))
        .catch((err) => next(err));
  });

  router.get('/myrestaurants/:userId', (req, res, next) => {
    const { userId } = req.params 
    User.findById(userId)
      .populate('restaurantsList')
      .then((user) => res.json(user.restaurantsList))
      .catch((err) => next(err));
});

  router.put('/myrestaurants/:userId/:restaurantId', (req, res, next) => {
      const { userId, restaurantId } = req.params

        User.findById(userId) 
            .then((user) => {
                if(user.restaurantsList.includes(restaurantId)) {
                    User.findByIdAndUpdate(userId, {$pull : {restaurantsList: restaurantId}}, {new: true})
                    .then((user) => res.json(user.restaurantsList))
                    .catch((err) => res.json(err));

                } else {

                    User.findByIdAndUpdate(userId, {$push : {restaurantsList: restaurantId}}, {new: true})
                    .then((user) => res.json(user.restaurantsList))
                    .catch((err) => res.json(err));
                }
            })
            .catch((err) => console.log(err))
  })

  
  
  module.exports = router;