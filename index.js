/* eslint-disable semi */

/* Read the readme for the sources */

var fs = require('fs')
var path = require('path')
var http = require('http')
var mime = require('mime-types')

var mime = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png'
}

http.createServer(onrequest).listen(8000)

function onrequest(req, res) {
    var route = req.url

    if (route === '/') {
        route = 'index.html'

    } else if (route === "/images") {
        var extension = path.extname(route)
        var type = mime[extension] || 'text/html'
        res.setHeader('Content-Type', type)

        fs.readdir('./static/images/', (err, files) => {
            for (var i = 0; i < files.length; i++) {
                res.write("<li>" + files[i] + "</li>")
            }
        })
        res.write("<h1>Dit zijn alle afbeeldingen die er zijn</h1>")

        route = "/imagelist.html"
    }

    fs.readFile(path.join('static', route), onread)

    function onread(err, buf) {
        if (err) {
            res.statusCode = 404
            fs.readFile(path.join('static', '404.html'), onread)
        } else {
            res.statusCode = 200
            res.end(buf)
        }
    }
}
