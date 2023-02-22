const fs = require("fs")
const path = require("path")

const fileName = path.resolve(__dirname,"data.txt")
// fs.readFile(fileName,(err,data) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data.toString())
// })

const content = "\n这是要写入的内容\n"
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
fs.writeFile(fileName,content,opt.append,(err) => {
    if(err){
        console.log(err)
    }
    return
})