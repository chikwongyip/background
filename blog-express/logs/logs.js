const fs = require("fs")
const path = require("path")

const filename = path.join(__dirname,"access.log");
const opt = {
    append:{
        endcoding:"utf8",
        mode:0o666,
        flag:'a'
    },
    overwirte:{
        endcoding:"utf8",
        mode:0o666,
        flag:'w'
    }
}
const wirteStream = fs.createWriteStream(filename,opt.append)

module.exports = {
    wirteStream
}