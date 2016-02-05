'use strict'

var path = require('path')

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    cors = require('cors')

const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))


app.use(bodyParser.urlencoded({extended: true}))

// Mixmax url CORS whitelisting
var corsOpts = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
}

// Our nice little weather search interface
app.get('/editor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'editor.html'))
})

// In-mail widget
app.post('/api/resolver', cors(corsOpts), require(path.join(__dirname, 'api', 'resolver')))

app.listen(port || 1337)
