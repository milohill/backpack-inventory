const express = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const BackpackInstanceSchema = new Schema({
  backpack: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  stock: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: 'The stock should be above 0',
    },
    required: true,
  },
  price: {
    type: Number,
    validate: {
      validator: function (v) {
        return v >= 50;
      },
      message: 'The minimum price for bags is 50 CAD',
    },
    required: true,
  },
});

BackpackInstanceSchema.virtual('url').get(function () {
  return `/catalog/backpackinstance/${this._id}`;
});

module.exports = mongoose.model('BackpackInstance', BackpackInstanceSchema);
