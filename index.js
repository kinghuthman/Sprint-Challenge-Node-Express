const express = require("express");
const server = express();
const port = 9000;
const actions = require("./data/helpers/actionModel");

const projectModel = require("./projects/projectRoutes.js");
const actionModel = require("./actions/actionRoutes.js");

server.use(express.json());

server.use("/projects", projectModel);
server.use("/actions", actionModel);

server.listen(port, () => {
    console.log(`---- Server Awake On ${port} ----`);
});