const express = require("express");
const server = express();
const port = 9000;

const projectModel = require("./projects/projectRoutes.js");

server.use(express.json());

server.use("/projects", projectModel);

server.listen(port, () => {
    console.log(`---- Server Awake On ${port} ----`);
});