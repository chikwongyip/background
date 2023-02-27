const fs = require("fs")
const path = require("path")
const readLine = require("readline")

//这个是可以在命令提示下填写日期
const fileName = path.join(__dirname,'../','../','logs',"23-02-26.access.log")
const readStream = fs.createReadStream(fileName)
const readline = readLine.createInterface({
    input:readStream
})

let chromeNum = 0
let sum = 0

readLine.on("line",(lineData) => {
    if(!lineData){
        return
    }
    sum++
    const arr = lineData.split(" -- ")
    if(arr[2] && arr[2].indexOf("Chrome") > 0){
        chromeNum++
    }
})
readLine.on("close",() => {
    console.log("sum:",sum,"chrome:",chromeNum)
})