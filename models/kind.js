const express = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const KindSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

KindSchema.virtual('url').get(function () {
  return `/catalogue/kind/${this._id}`;
});

module.exports = mongoose.model('Kind', KindSchema);
