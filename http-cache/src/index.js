const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const moment = require('moment')

app.get('/',(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        Http Cache Demo
        <script src="/demo.js"></script>
    </body>
    </html>`)
})

// default
// app.get('/demo.js',(req, res)=>{
//     let jsPath = path.resolve(__dirname,'./static/js/demo.js');
//     let cont = fs.readFileSync(jsPath);
//     res.end(cont)
// })


// Expires 强缓存
// app.get('/demo.js',(req, res)=>{
//     let jsPath = path.resolve(__dirname,'./static/js/demo.js');
//     let cont = fs.readFileSync(jsPath);
//     res.setHeader('Expires', getGLNZ()) //1分钟
//     res.end(cont)
// })

//  Cache-Control  max-age
// app.get('/demo.js',(req, res)=>{
//     let jsPath = path.resolve(__dirname,'./static/js/demo.js');
//     let cont = fs.readFileSync(jsPath);
//     res.setHeader('Cache-Control', 'public,max-age=20') //2分钟
//     res.setHeader('Expires', getGLNZ()) //2分钟
//     res.end(cont)
// })

// if-modified-since Last-Modified
// Last-Modified， 如果我访问的数据，没到过期时间，并且我的数据没有改动，我就告诉浏览器从缓存里读，
// 如果文件发生了改动，就发送最新的数据
// app.get('/demo.js',(req, res)=>{
//     let jsPath = path.resolve(__dirname,'./static/js/demo.js')
//     let cont = fs.readFileSync(jsPath);
//     // 同步去读文件状态
//     let status = fs.statSync(jsPath)
//     console.log('......', status)
//     // 2020-4-6 10:10:10
//     // 2020-04-06T03:25:21.820Z
//     let lastModified = moment(status.mtime).format('YYYY-MM-DD HH:mm:ss') // 最后一次变更的时间， 

//     console.log('......', lastModified === moment(req.headers['if-modified-since']).format('YYYY-MM-DD HH:mm:ss'))
//     // 上一次变更时间 === 这次我请求的时候变更时间的状态没有变啊
//     if(lastModified === moment(req.headers['if-modified-since']).format('YYYY-MM-DD HH:mm:ss')){
//         res.writeHead(304, 'Not Modified')
//         res.end()
//     } else {
        // res.setHeader('Cache-Control', 'public,max-age=100')
//         res.setHeader('Last-Modified', lastModified)
//         res.writeHead(200, 'OK')
//         res.end(cont)
//     }

//     res.end(cont)
// })

// ETag if-none-match
// If-None-Match 是一个条件式请求首部。
// 对于 GETGET 和 HEAD 请求方法来说，
// 当且仅当服务器上没有任何资源的 ETag 属性值与这个首部中列出的相匹配的时候，服务器端会才返回所请求的资源，
// 响应码为  200  。对于其他方法来说，
// 当且仅当最终确认没有已存在的资源的  ETag 属性值与这个首部中所列出的相匹配的时候，才会对请求进行相应的处理。
const md5 = require('md5');
app.get('/demo.js',(req, res)=>{
    let jsPath = path.resolve(__dirname,'./static/js/demo.js');
    let cont = fs.readFileSync(jsPath);
    let etag = md5(cont);
    if(req.headers['if-none-match'] === etag){
        res.writeHead(304, 'Not Modified');
        res.end();
    } else {
        res.setHeader('ETag', etag);
        // res.setHeader('Cache-Control', 'public,max-age=100')
        // res.setHeader('Expires', getGLNZ()) //2分钟
        res.writeHead(200, 'OK');
        res.end(cont);
    }
})

app.listen(port,()=>{
    console.log(`listen on ${port}`)    
})

function getGLNZ(){
    return moment().utc().add(1,'m').format('ddd, DD MMM YYYY HH:mm:ss')+' GMT';
}