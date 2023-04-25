const express = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const BackpackInstanceSchema = new Schema({
  backpack: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

BackpackInstanceSchema.virtual('url').get(function () {
  return `/catalog/backpackinstance/${this._id}`;
});

module.exports = mongoose.model('BackpackInstance', BackpackInstanceSchema);
