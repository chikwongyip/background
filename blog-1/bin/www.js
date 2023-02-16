// 引入npm http
const http = require("http");
// 设置端口
const PORT = 8000;
// 引入 app.js
const serverHandle = require("../app");
const server = http.createServer(serverHandle);
server.listen(PORT);