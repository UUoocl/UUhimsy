
var path = require('path');
var http = require('http');
var fs = require('fs');
var childProc = require('child_process');

const host = 'localhost';
const port = 8001;
 console.log(__dirname)

var sourceFile = path.join(__dirname, '..', 'Browser_Sources','obs_webSocket_details','websocketDetails.js');
var destinationFile = path.join(__dirname, 'public','lib','websocketDetails.js');

fs.copyFile(sourceFile, destinationFile, (err) => {
    if (err) {
        console.log("Error Found:", err);
    }
    else {
        console.log("Copied");
    }
});

var dir = path.join(__dirname, 'public');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript',
    mjs: 'text/javascript',
    wasm: 'application/wasm',
    task: 'application/wasm'
};

var server = http.createServer(function (req, res) {
    var reqpath = req.url.toString().split('?')[0];
    if (req.method !== 'GET') {
        res.statusCode = 501;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Method not implemented');
    }
    var file = path.join(dir, reqpath.replace(/\/$/, '/getUserMedia.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);

    s.on('open', function () {
        res.setHeader('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    });
});

server.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}/`);
});

childProc.exec(`open -a "Google Chrome" http://${host}:${port}`);