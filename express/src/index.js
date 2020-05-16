const http = require('http');
const crypto = require('crypto');
const reqHeaders = [];
const algorithm = 'aes-256-cbc';
const key = ['this', 'is', 'a', 'test'].join(' ');
const encode = function(str) {
  var buf = new Buffer(str)
  var encrypted = "";
  var cip = crypto.createCipher(algorithm, key);
  encrypted += cip.update(buf, 'binary', 'hex');
  encrypted += cip.final('hex');
  return encrypted;
};
const decode = function(encrypted){
  var decrypted = "";
  var decipher = crypto.createDecipher(algorithm, key);
  decrypted += decipher.update(encrypted, 'hex', 'binary');
  decrypted += decipher.final('binary');
  return decrypted;
}
http.createServer(function(req, res) {
  reqHeaders.push(req.headers);
  let enc = encode(req.headers['host']);
  let dec = decode(enc);
  res.end('hello')
}).listen(8848);