const mongoose = require('mongoose');
const asyncHanlder = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Kind = require('../models/kind');
const Backpack = require('../models/backpack');
const Manufacturer = require('../models/manufacturer');
const BackpackInstance = require('../models/backpackinstance');

exports.list_backpackinstances = asyncHanlder(async (req, res, next) => {
  try {
    const backpackinstanceList = await BackpackInstance.find().orFail().exec();
    res.render('backpackinstance-list', {
      title: 'Backpack Instance List',
      backpackinstanceList,
    });
  } catch (error) {
    res.render('backpackinstance-list', {
      title: 'Backpack Instance List (Error!)',
      error,
    });
  }
});

exports.get_create_backpackinstance = asyncHanlder(async (req, res, next) => {
  const allBackpacks = await Backpack.find().exec();
  res.render('backpackinstance-create-form', {
    title: 'Create a new backpack instance',
    allBackpacks,
  });
});

exports.post_create_backpackinstance = [
  body('bookinstance-name').trim().escape(),
  body('bookinstance-stock').trim().escape(),
  body('bookinstance-price').trim().escape(),
  asyncHanlder(async (req, res, next) => {
    const errors = validationResult(req);
    const backpackinstance = new BackpackInstance({
      backpack: req.body['backpackinstance-name'],
      stock: req.body['backpackinstance-stock'],
      price: req.body['backpackinstance-price'],
    });
    if (!errors.isEmpty()) {
      const allBackpacks = await Backpack.find().exec();
      res.render('backpackinstance-create-form', {
        title: 'Create a new backpack instance',
        allBackpacks,
        backpackinstance,
        error: errors.array(),
      });
    } else {
      const newBackpackinstance = await backpackinstance.save();
      res.send('A new book instance has been created');
    }
  }),
];

exports.post_delete_backpackinstance = asyncHanlder(async (req, res, next) => {
  const backpackinstance = await BackpackInstance.findById(req.params.id)
    .populate('backpack')
    .exec();
  console.log(backpackinstance.backpack.url);
  await BackpackInstance.findByIdAndDelete(req.params.id);
  res.redirect(`${backpackinstance.backpack.url}/delete`);
});
