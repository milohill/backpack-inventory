const express = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const BackpackInstanceSchema = new Schema({
  backpack: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Backpack',
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

BackpackInstanceSchema.virtual('url').get(function () {
  return `/catalogue/backpackinstance/${this._id}`;
});

module.exports = mongoose.model('BackpackInstance', BackpackInstanceSchema);
