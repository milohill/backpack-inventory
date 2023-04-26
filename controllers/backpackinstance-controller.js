const mongoose = require('mongoose');
const asyncHanlder = require('express-async-handler');
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
