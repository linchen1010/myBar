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
  app.post('/api/user/favorite', async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    try {
      if (existInList(user.favoriteList, req.body.drinkId)) {
        console.log('drinks already exist in favorite list!');
        res.json({
          message: `${req.body.drinkName} is already in favorite list!`,
        });
      } else {
        await User.updateOne(
          { _id: req.user.id },
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
        console.log(`Successfully add ${req.body.drinkName} to favorite list`);
        res.json({
          message: `Successfully add ${req.body.drinkName} to favorite list.`,
          success: true,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  // get favorite drinks
  app.get('/api/user/favorite', async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    res.send(user.favoriteList);
  });

  // remove from favorite list -- have not tested yet
  app.delete('/api/user/favorite/:removeId', async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.user.id },
        {
          $pull: {
            favoriteList: {
              drinkId: req.params.removeId,
            },
          },
        }
      );
      // console.log(user.favoriteList);
      console.log(`${req.params.removeId} has been deleted`);
      res.json({ message: `Drink has been removed` });
    } catch (err) {
      console.log('delete fail!');
      console.log(err);
      res.status(422).send(err);
    }
  });
};
