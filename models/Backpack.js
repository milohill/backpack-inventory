const express = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const BackpackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  manufacturer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  kind: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

BackpackSchema.virtual('url').get(function () {
  return `/catalog/backpack/${this._id}`;
});

module.exports = mongoose.model('Backpack', BackpackSchema);
