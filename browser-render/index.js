const express = require('express')

const app = express()

async function proxyRoute (req, res, next) {
  if (req.url) {
    console.log('req.url', req.url)
    const match = req.url.match(/\d+\//)
    if (match && match[0]) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, parseInt(match[0]))
      })
      
      req.url = req.url.replace(match[0], '')
    }
  }
  await next()
}


function renderHtml (req, res, next) {
  res.status = 200
  res.send(
    `
      <html lang='en'>
        <head>
          <title>Rendering Test</title>
          <link rel='stylesheet' href='/5000/css/style.css'>
          <script defer src="/2000/js/common.js"></script>
          <script async src="/1000/js/main.js"></script>
          <style>
            .name {
              width: 100px;
              height: 100px;
              background-color: red;
              position: absolute;
              top: 0;
              left: 0;
            }
          </style>
        </head>
        <body>
          <div id="name"></div>
          <img src="/10000/res/lion.jpg" />
          
          <h1>I am first!</h1>
          
          <h2>I am second!</h2>
          
          <h3>I am third!</h3>
          <script src="/3000/js/vendor.js"></script>
        </body>
      </html>
    `
  )
}

app.use(proxyRoute)

app.use(express.static('static'));

app.use(renderHtml)

app.listen(3000, () => {
  console.log('server start success ==> http://127.0.0.1:3000')
})