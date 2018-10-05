const express = require("express");
const server = express();
const port = 9000;

server.use(express.json());

server.listen(port, () => {
    console.log(`---- Server Awake On ${port} ----`);
});