const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Kind = require('../models/kind');
const Backpack = require('../models/backpack');
const Manufacturer = require('../models/manufacturer');
const manufacturer = require('../models/manufacturer');

exports.list_manufacturers = asyncHandler(async (req, res, next) => {
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

exports.detail_manufacturer = asyncHandler(async (req, res, next) => {
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

exports.get_create_manufacturer = asyncHandler(async (req, res, next) => {
  res.render('manufacturer-form', {
    title: 'Create a new manufacturer',
  });
});

exports.post_create_manufacturer = [
  body('manufacturer-name').trim().escape(),
  body('manufacturer-desc').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const manufacturer = new Manufacturer({
      name: req.body['manufacturer-name'],
      description: req.body['manufacturer-desc'],
      year: req.body['manufacturer-year'],
    });
    // error handling
    if (!errors.isEmpty()) {
      res.render('manufacturer-form', {
        title: 'Create a new manufacturer (Error!)',
        manufacturer,
        error: errors.array(),
      });
    } else {
      const newManufacturer = await manufacturer.save();
      res.redirect(newManufacturer.url);
    }
  }),
];

exports.get_update_manufacturer = asyncHandler(async (req, res, next) => {
  const manufacturer = await Manufacturer.findById(req.params.id).exec();
  res.render('manufacturer-form', {
    title: 'Update a manufacturer',
    manufacturer,
  });
});

exports.post_update_manufacturer = [
  body('manufacturer-name').trim().escape(),
  body('manufacturer-desc').trim().escape(),
  body('manufacturer-year').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const manufacturer = new Manufacturer({
      _id: req.params.id,
      name: req.body['manufacturer-name'],
      description: req.body['manufacturer-desc'],
      year: req.body['manufacturer-year'],
    });
    if (!errors.isEmpty()) {
      res.render('manufacturer-form', {
        title: 'Update a manufacturer (Error!)',
        manufacturer,
      });
    } else {
      const newManufacturer = await Manufacturer.findByIdAndUpdate(
        req.params.id,
        manufacturer,
        {}
      );
      res.redirect(newManufacturer.url);
    }
  }),
];

exports.get_delete_manufacturer = asyncHandler(async (req, res, next) => {
  const [backpacks, manufacturer] = await Promise.all([
    Backpack.find({ manufacturer: req.params.id }).exec(),
    Manufacturer.findById(req.params.id).exec(),
  ]);
  res.render('manufacturer-delete', {
    title: 'Delete a manufacturer',
    backpacks,
    manufacturer,
  });
});

exports.post_delete_manufacturer = asyncHandler(async (req, res, next) => {
  await Manufacturer.findByIdAndDelete(req.params.id);
  res.redirect('/catalogue/manufacturers');
});
