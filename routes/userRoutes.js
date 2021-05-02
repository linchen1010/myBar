const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// const bodyParser = require('body-parser');

const existInList = (drinks, reqId) => {
  for (let drink of drinks) {
    if (drink.drinkId == reqId) return true;
  }
  return false;
};

module.exports = (app) => {
  // add drinks to user's favorite list
  app.post('/api/user/:id/favorite', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    try {
      if (existInList(user.favoriteList, req.body.drinkId)) {
        console.log('drinks already exist in favorite list!');
        res.send('drinks already exist in favorite list!');
      } else {
        await User.updateOne(
          { _id: req.params.id },
          {
            $push: {
              favoriteList: {
                drinkId: req.body.drinkId,
                drinkName: req.body.drinkName,
                drinkImgURL: req.body.drinkImgURL,
              },
            },
          }
        );
        // const user = await User.findOne({ _id: req.params.id });
        // console.log(user);
        console.log(`Successfully add ${req.body.drinkName} to favorite list`);
        res.send(`Successfully add ${req.body.drinkName} to favorite list`);
      }
    } catch (err) {
      console.log(err);
    }
  });

  // get favorite drinks
  app.get('/api/user/:id/favorite', async (req, res) => {
    console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    // console.log(user.favoriteList);
    res.send(user.favoriteList);
  });

  // remove from favorite list -- have not tested yet
  app.delete('/api/user/:id/favorite/:removeId', async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.params.id },
        {
          $pull: {
            favoriteList: {
              drinkId: req.params.removeId,
            },
          },
        }
      );
      // console.log(user.favoriteList);
      console.log(`${req.params.removeId} has been delete`);
      res.send(`${req.params.removeId} has been delete`);
    } catch (err) {
      console.log('delete fail!');
      console.log(err);
    }
  });
};
