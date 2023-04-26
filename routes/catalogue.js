const express = require('express');

const router = express.Router();
const kindController = require('../controllers/kind-controller');
const backpackController = require('../controllers/backpack-controller');
const manufacturerController = require('../controllers/manufacturer-controller');

router.get('/', (req, res, next) => {
  res.render('catalogue', {
    title: 'Inventory',
  });
});

router.get('/kinds', kindController.list_kinds);

router.get('/kind/:id', kindController.detail_kind);

router.get('/manufacturers', manufacturerController.list_manufacturers);

router.get('/manufacturer/:id', manufacturerController.detail_manufacturer);

router.get('/backpacks', backpackController.list_backpacks);

router.get('/backpack/:id', backpackController.detail_backpack);

router.get('/backpackinstances', (req, res, next) => {
  res.send('instances');
});

module.exports = router;
