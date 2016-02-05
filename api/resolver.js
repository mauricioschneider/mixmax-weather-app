'use strict'

var weather = require('../vendor/simpleWeather'),
  generateHtml = require('./helpers/generateHtml')

module.exports = (req, res) => {
  let params = JSON.parse(req.body.params),
    opts = {
      location: params.location,
      timestamp: params.timestamp
    }

  weather(opts, (err, data) => {
    if (err) {
      return res.status(500).json(err)
    }

    let html = generateHtml(data, parseInt(params.days));

    res.json({
      body: html
    })
  })
}
