const express = require("express");
const http = require("http");
const config = require("./config.js");

const app = express();

const server = http.createServer(app);

Object.entries(config.FilePaths).forEach(([path, resolvePath]) => {
      console.log('静态路径-----',path,resolvePath);
      app.use(path, express.static(resolvePath))
})

server.listen(config.port, () => {
      console.log('服务已经启动----',`http://localhost:${config.port}`);
});