const {get} = require('lodash');

const resolveKey = mapField => parent => get(parent, mapField);

module.exports.resolveKey = resolveKey;

