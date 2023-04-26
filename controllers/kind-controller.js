const mongoose = require('mongoose');
const asyncHanlder = require('express-async-handler');
const Kind = require('../models/kind');
const Backpack = require('../models/backpack');

exports.list_kinds = asyncHanlder(async (req, res, next) => {
  try {
    const kindList = await Kind.find().orFail().exec();
    res.render('kind-list', {
      title: 'Kind List',
      kindList,
    });
  } catch (error) {
    res.render('kind-list', {
      title: 'Kind List (Error!)',
      error,
    });
  }
});

exports.detail_kind = asyncHanlder(async (req, res, next) => {
  try {
    const theKind = await Kind.findById(req.params.id).exec();
    const theBackpacks = await Backpack.find({ kind: req.params.id }).exec();
    console.log(theKind);
    res.render('kind-detail', {
      title: 'Kind Detail',
      theKind,
      theBackpacks,
    });
  } catch (error) {
    // error handling during the fetch
    res.render('kind-detail', {
      title: 'Kind Detail (Error!)',
      error,
    });
  }
});
