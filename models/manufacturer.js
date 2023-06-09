const express = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ManufacturerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
});

ManufacturerSchema.virtual('url').get(function () {
  return `/catalogue/manufacturer/${this._id}`;
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);
