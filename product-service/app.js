const express = require('@feathersjs/express')
const feathers = require('@feathersjs/feathers')
const service = require('feathers-mongoose')

const Model = require('./model')

const app = express(feathers())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Set up REST transport
app.configure(express.rest())

// Generate Service
app.use('/products', service({ Model }))


module.exports = app