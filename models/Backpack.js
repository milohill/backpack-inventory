const express = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const BackpackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  kind: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  year: {
    type: Number,
    validate: {
      validator: function (v) {
        return v.toString().length === 4;
      },
      message: 'The length for the year should be 4',
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

BackpackSchema.virtual('url').get(function () {
  return `/catalogue/backpack/${this._id}`;
});

module.exports = mongoose.model('Backpack', BackpackSchema);
