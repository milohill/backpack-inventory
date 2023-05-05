const mongoose = require('mongoose');
const fs = require('file-system');
const asyncHanlder = require('express-async-handler');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const { body, validationResult } = require('express-validator');
const Kind = require('../models/kind');
const Backpack = require('../models/backpack');
const Manufacturer = require('../models/manufacturer');
const BackpackInstance = require('../models/backpackinstance');

exports.list_backpacks = asyncHanlder(async (req, res, next) => {
  try {
    const backpackList = await Backpack.find().orFail().exec();
    res.render('backpack-list', {
      title: 'Manufacturer List',
      backpackList,
    });
  } catch (error) {
    res.render('manufacturer-list', {
      title: 'Manufacturer List (Error!)',
      error,
    });
  }
});

exports.detail_backpack = asyncHanlder(async (req, res, next) => {
  try {
    const theBackpack = await Backpack.findById(req.params.id).exec();
    const backpackinstanceList = await BackpackInstance.find({
      backpack: theBackpack._id,
    }).exec();
    const theKind = await Kind.findById(theBackpack.kind).exec();
    const theManufacturer = await Manufacturer.findById(
      theBackpack.manufacturer
    ).exec();
    res.render('backpack-detail', {
      title: 'Backpack Detail',
      theBackpack,
      backpackinstanceList,
      theKind,
      theManufacturer,
    });
  } catch (error) {
    console.log(error);
    res.render('backpack-detail', {
      title: 'Backpack Detail (Error!)',
      error,
    });
  }
});

exports.get_create_backpack = asyncHanlder(async (req, res, next) => {
  const allKinds = await Kind.find().exec();
  const allManufacturers = await Manufacturer.find().exec();
  res.render('backpack-form', {
    title: 'Create a new backpack',
    allKinds,
    allManufacturers,
  });
});

exports.post_create_backpack = [
  body('backpack-name').trim().escape(),
  body('backpack-kind').trim().escape(),
  body('backpack-manufacturer').trim().escape(),
  body('backpack-year').trim().escape(),
  body('backpack-desc').trim().escape(),
  upload.single('backpack-image'),
  asyncHanlder(async (req, res, next) => {
    const img = fs.readFileSync(req.file.path);
    const errors = validationResult(req);
    const backpack = new Backpack({
      image: Buffer.from(img, 'base64'),
      name: req.body['backpack-name'],
      kind: req.body['backpack-kind'],
      manufacturer: req.body['backpack-manufacturer'],
      year: req.body['backpack-year'],
      description: req.body['backpack-desc'],
    });
    const allKinds = await Kind.find().exec();
    const allManufacturers = await Manufacturer.find().exec();
    if (!errors.isEmpty()) {
      res.render('backpack-form', {
        title: 'Create a new backpack (Error!)',
        backpack,
        allKinds,
        allManufacturers,
        error: errors.array(),
      });
    } else {
      const newKind = await backpack.save();
      res.redirect(newKind.url);
    }
  }),
];

exports.get_update_backpack = asyncHanlder(async (req, res, next) => {
  const [allKinds, allManufacturers, backpack] = await Promise.all([
    Kind.find().exec(),
    Manufacturer.find().exec(),
    Backpack.findById(req.params.id).exec(),
  ]);
  res.render('backpack-form', {
    title: 'Update a backpack',
    allKinds,
    allManufacturers,
    backpack,
  });
});

exports.post_update_backpack = [
  body('backpack-name').trim().escape(),
  body('backpack-kind').trim().escape(),
  body('backpack-manufacturer').trim().escape(),
  body('backpack-year').trim().escape(),
  body('backpack-desc').trim().escape(),
  asyncHanlder(async (req, res, next) => {
    const errors = validationResult(req);
    const [allKinds, allManufacturers] = await Promise.all([
      Kind.find().exec(),
      Manufacturer.find().exec(),
    ]);
    const backpack = new Backpack({
      _id: req.params.id,
      name: req.body['backpack-name'],
      manufacturer: req.body['backpack-manufacturer'],
      kind: req.body['backpack-kind'],
      year: req.body['backpack-year'],
      description: req.body['backpack-desc'],
    });
    if (!errors.isEmpty()) {
      res.render('backpack-form', {
        title: 'Update a backpack (Error!)',
        allKinds,
        allManufacturers,
        backpack,
      });
    } else {
      const newBackpack = await Backpack.findByIdAndUpdate(
        req.params.id,
        backpack,
        {}
      );
      res.redirect(newBackpack.url);
    }
  }),
];

exports.get_delete_backpack = asyncHanlder(async (req, res, next) => {
  const [backpackinstances, backpack] = await Promise.all([
    BackpackInstance.find({ backpack: req.params.id }).exec(),
    Backpack.findById(req.params.id).exec(),
  ]);
  res.render('backpack-delete', {
    title: 'Delete a backpack',
    backpackinstances,
    backpack,
  });
});

exports.post_delete_backpack = asyncHanlder(async (req, res, next) => {
  await Backpack.findByIdAndDelete(req.params.id);
  res.redirect('/catalogue/backpacks');
});
