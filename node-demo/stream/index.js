const fs = require('fs');


var showMem = function() {
  var mem = process.memoryUsage();
  var format = function(bytes) {
      return (bytes/1024/1024).toFixed(2)+'MB';
  };
  console.log('Process1: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
}

// const server = require('http').createServer();

// readfile
// server.on('request', (req, res) => {
//   fs.readFile('./big.file', (err, data) => {
//     if (err) throw err;
//     showMem()
//     res.end(data);
//   });
// });

// strem
// server.on('request', (req, res) => {
//   const src = fs.createReadStream('./big.file');
//   showMem()
//   src.pipe(res);
// });

// server.listen(8000);

// const { Writable } = require('stream');
// const outStream = new Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   }
// });

// process.stdin.pipe(outStream);

// const { Readable } = require('stream'); 
// const inStream = new Readable({
//   read(size) {
//     this.push(String.fromCharCode(this.currentCharCode++));
//     if (this.currentCharCode > 90) {
//       this.push(null);
//     }
//   }
// });
// inStream.currentCharCode = 65;
// inStream.pipe(process.stdout);


// const { Duplex } = require('stream');

// const inoutStream = new Duplex({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   },
//   read(size) {
//     this.push(String.fromCharCode(this.currentCharCode++));
//     if (this.currentCharCode > 90) {
//       this.push(null);
//     }
//   }
// });

// inoutStream.currentCharCode = 65;
// process.stdin.pipe(inoutStream).pipe(process.stdout);


// const { Transform } = require('stream');

// const upperCaseTr = new Transform({
//   transform(chunk, encoding, callback) {
//     this.push(chunk.toString().toUpperCase());
//     callback();
//   }
// });

// process.stdin.pipe(upperCaseTr).pipe(process.stdout);


// const { Transform } = require('stream');
// const commaSplitter = new Transform({
//   readableObjectMode: true,
//   transform(chunk, encoding, callback) {
//     this.push(chunk.toString().trim().split(','));
//     callback();
//   }
// });
// const arrayToObject = new Transform({
//   readableObjectMode: true,
//   writableObjectMode: true,
//   transform(chunk, encoding, callback) {
//     const obj = {};
//     for(let i=0; i < chunk.length; i+=2) {
//       obj[chunk[i]] = chunk[i+1];
//     }
//     this.push(obj);
//     callback();
//   }
// });
// const objectToString = new Transform({
//   writableObjectMode: true,
//   transform(chunk, encoding, callback) {
//     this.push(JSON.stringify(chunk) + '\n');
//     callback();
//   }
// });
// process.stdin
//   .pipe(commaSplitter)
//   .pipe(arrayToObject)
//   .pipe(objectToString)
//   .pipe(process.stdout)


// const fs = require('fs');


// const http = require('http');
// let s = '';
// for (let i=0; i<1024*10; i++) {
//     s+='a'
// }

// const str = s;

// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     if (req.url === '/buffer') {
//       const bufStr = Buffer.from(s);
//       res.end(bufStr);
//     } else if (req.url === '/string') {
//       res.end(str);
//     }
// });

// server.listen(3000);
// ab -c 200 -t 60 http://127.0.0.1:3000/buffer
// ab -c 200 -t 60 http://127.0.0.1:3000/string
