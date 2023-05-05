const express = require('express');

const router = express.Router();
const kindController = require('../controllers/kind-controller');
const backpackController = require('../controllers/backpack-controller');
const manufacturerController = require('../controllers/manufacturer-controller');
const backpackinstanceController = require('../controllers/backpackinstance-controller');

router.get('/', (req, res, next) => {
  res.render('catalogue', {
    title: 'Inventory',
  });
});

router.get('/kinds', kindController.list_kinds);

router.get('/kind/create', kindController.get_create_kind);

router.post('/kind/create', kindController.post_create_kind);

router.get('/kind/:id/update', kindController.get_update_kind);

router.post('/kind/:id/update', kindController.post_update_kind);

router.get('/kind/:id/delete', kindController.get_delete_kind);

router.post('/kind/:id/delete', kindController.post_delete_kind);

router.get('/kind/:id', kindController.detail_kind);

router.get('/manufacturers', manufacturerController.list_manufacturers);

router.get(
  '/manufacturer/create',
  manufacturerController.get_create_manufacturer
);

router.post(
  '/manufacturer/create',
  manufacturerController.post_create_manufacturer
);

router.get(
  '/manufacturer/:id/update',
  manufacturerController.get_update_manufacturer
);

router.post(
  '/manufacturer/:id/update',
  manufacturerController.post_update_manufacturer
);

router.get(
  '/manufacturer/:id/delete',
  manufacturerController.get_delete_manufacturer
);

router.post(
  '/manufacturer/:id/delete',
  manufacturerController.post_delete_manufacturer
);

router.get('/manufacturer/:id', manufacturerController.detail_manufacturer);

router.get('/backpacks', backpackController.list_backpacks);

router.get('/backpack/create', backpackController.get_create_backpack);

router.post('/backpack/create', backpackController.post_create_backpack);

router.get('/backpack/:id/update', backpackController.get_update_backpack);

router.post('/backpack/:id/update', backpackController.post_update_backpack);

router.get('/backpack/:id/delete', backpackController.get_delete_backpack);

router.post('/backpack/:id/delete', backpackController.post_delete_backpack);

router.get('/backpack/:id', backpackController.detail_backpack);

router.get(
  '/backpackinstance/create',
  backpackinstanceController.get_create_backpackinstance
);

router.post(
  '/backpackinstance/create',
  backpackinstanceController.post_create_backpackinstance
);

router.post(
  '/backpackinstance/:id/delete',
  backpackinstanceController.post_delete_backpackinstance
);

module.exports = router;
