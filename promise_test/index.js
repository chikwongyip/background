const fs = require("fs")
const { resolve } = require("path")
const path = require("path")
// function getFileContent(fileName,callback){
//     const fullFileName = path.resolve(__dirname,"files",fileName)
//     fs.readFile(fullFileName,(err,data) => {
//         if(err){
//             console.error(err)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// // 测试
// getFileContent("a.json",(aData) => {
//     console.log("adata",aData)
// })

// 用promise 获取文件内容
function getFileContent(fileName){
    const promise = new Promise((resolve,reject) => {
        const fullFileName = path.resolve(__dirname,"files",fileName)
        fs.readFile(fullFileName,(err,data) => {
            if(err){
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })    
    })
    return promise
}

// 测试
getFileContent("a.json").then((data) =>{
    console.log("a data",data)
    return getFileContent(data.next)
}).then((data) => {
    console.log("b data",data)
    return getFileContent(data.next)
}).then((data) => {
    console.log("c data",data)
})
    

