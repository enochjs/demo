const express = require('express')


var app = express()

console.log(app)

debugger

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000)
