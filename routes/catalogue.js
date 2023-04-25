const express = require('express');
const mongoose = require('mongoose');
const asyncHanlder = require('express-async-handler');
const Kind = require('../models/kind');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('catalogue', {
    title: 'Inventory',
  });
});

router.get(
  '/kinds',
  asyncHanlder(async (req, res, next) => {
    const allKinds = await Kind.find().exec();
    res.render('kind_list', {
      title: 'Kinds List',
      allKinds,
    });
  })
);

router.get('/manufacturers', (req, res, next) => {
  res.send('manus');
});

router.get('/backpacks', (req, res, next) => {
  res.send('backpacks');
});

router.get('/backpackinstances', (req, res, next) => {
  res.send('instances');
});

module.exports = router;
