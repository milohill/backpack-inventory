const mongoose = require('mongoose');
const asyncHanlder = require('express-async-handler');
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
