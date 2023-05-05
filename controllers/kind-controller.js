const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Kind = require('../models/kind');
const Backpack = require('../models/backpack');

exports.list_kinds = asyncHandler(async (req, res, next) => {
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

exports.detail_kind = asyncHandler(async (req, res, next) => {
  try {
    const theKind = await Kind.findById(req.params.id).exec();
    const theBackpacks = await Backpack.find({ kind: req.params.id }).exec();
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

exports.get_create_kind = asyncHandler(async (req, res, next) => {
  res.render('kind-form', {
    title: 'Create a New Kind',
  });
});

exports.post_create_kind = [
  body('kind-name').trim().escape(),
  body('kind-desc').optional().trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const kind = new Kind({
      name: req.body['kind-name'],
      ...(req.body['kind-desc'] && { description: req.body['kind-desc'] }),
    });
    // error handling
    if (!errors.isEmpty()) {
      res.render('kind-form', {
        title: 'Create a new Kind (Error!)',
        kind,
        error: errors.array(),
      });
    } else {
      const newKind = await kind.save();
      res.redirect(newKind.url);
    }
  }),
];

exports.get_update_kind = asyncHandler(async (req, res, next) => {
  const kind = await Kind.findById(req.params.id).exec();
  res.render('kind-form', {
    title: 'Update a kind',
    kind,
  });
});

exports.post_update_kind = [
  body('kind-name').trim().escape(),
  body('kind-desc').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const kind = new Kind({
      _id: req.params.id,
      name: req.body['kind-name'],
      description: req.body['kind-desc'],
    });
    if (!errors.isEmpty()) {
      res.render('kind-form', {
        title: 'Update a kind (Error!)',
        kind,
      });
    } else {
      const newKind = await Kind.findByIdAndUpdate(req.params.id, kind, {});
      res.redirect(newKind.url);
    }
  }),
];

exports.get_delete_kind = asyncHandler(async (req, res, next) => {
  const [backpacks, kind] = await Promise.all([
    Backpack.find({ kind: req.params.id }).exec(),
    Kind.findById(req.params.id).exec(),
  ]);
  console.log(backpacks, kind);
  res.render('kind-delete', {
    title: 'Delete a kind',
    backpacks,
    kind,
  });
});

exports.post_delete_kind = asyncHandler(async (req, res, next) => {
  await Kind.findByIdAndDelete(req.params.id);
  res.redirect('/catalogue/kinds');
});
