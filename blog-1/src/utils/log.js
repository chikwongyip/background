const fs = require("fs")
const path = require("path")
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
// 写日志 传入 writeStream 函数
function writeLog(writeStream,log){
    writeStream.write(log + '\n')
}
//等价于 const writeStream = (filename) => {}
function createWriteStream(filename){
    const fullFileName = path.join(__dirname,'../','../','logs',filename)
    const writeStream = fs.createWriteStream(fullFileName,opt.append)
    return writeStream
}

// 写访问日志
// 调用 createWriteStream 创建一个函数
const accessWriteSteam = createWriteStream("access.log")
function access(log){
    
    writeLog(accessWriteSteam,log)
}

//写错误日志
const errorWriteStream = createWriteStream("error.log")
function error(log){
    writeLog(errorWriteStream,log)
}

//写入事件日志

const eventWriteStream = createWriteStream("event.log")
function event(log){
    writeLog(errorWriteStream,log)
}

module.exports = {
    access,
    error,
    event

}