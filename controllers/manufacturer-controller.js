const mongoose = require('mongoose');
const asyncHanlder = require('express-async-handler');
const Kind = require('../models/kind');
const Backpack = require('../models/backpack');
const Manufacturer = require('../models/manufacturer');

exports.list_manufacturers = asyncHanlder(async (req, res, next) => {
  try {
    const manufacturerList = await Manufacturer.find().orFail().exec();
    res.render('manufacturer-list', {
      title: 'Manufacturer List',
      manufacturerList,
    });
  } catch (error) {
    res.render('manufacturer-list', {
      title: 'Manufacturer List (Error!)',
      error,
    });
  }
});

exports.detail_manufacturer = asyncHanlder(async (req, res, next) => {
  try {
    const theManufacturer = await Manufacturer.findById(req.params.id)
      .orFail()
      .exec();
    res.render('manufacturer-detail', {
      title: 'Manufacturer Detail',
      theManufacturer,
    });
  } catch (error) {
    res.render('manufacturer-detail', {
      title: 'Manufacturer Detail (Error!)',
      error,
    });
  }
});
