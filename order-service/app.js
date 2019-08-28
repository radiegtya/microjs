const express = require('@feathersjs/express')
const feathers = require('@feathersjs/feathers')
const service = require('feathers-mongoose')

const Model = require('./model')

const app = express(feathers())

// Turn on JSON parser for REST services
app.use(express.json())
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({ extended: true }));
// Set up REST transport
app.configure(express.rest())

app.use('/orders', service({ Model }))

module.exports = app