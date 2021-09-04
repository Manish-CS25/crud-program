const http = require("http");
const fs = require("fs");

const fileContent = fs.readFileSync("basic.html");
//err, data) => {
//console.log(data);

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "html/txt" });
  res.end(fileContent);
});

server.listen(4000, "127.0.0.1", () => {
  console.log("listening on port 4000");
});
