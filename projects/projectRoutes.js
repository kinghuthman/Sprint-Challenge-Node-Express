const express = require("express");
const router = express.Router();
const projectModel = require("../data/helpers/projectModel");


router.get("/", (req, res) => {
    projectModel.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The project information could not be retreieved" });
      });
  });
  
  router.get("/:id", (req, res) => {
    projectModel.get(req.params.id)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The project information could not be retrieved" });
      });
  });
  
  router.post("/", (req, res) => {
    if (req.body.name.length < 128) {
      projectModel.insert(req.body)
        .then(projects => {
          res.status(200).json(projects);
        })
        .catch(err => {
          console.log("error", err);
          res
            .status(500)
            .json({ error: "The project information could not be posted" });
        });
    } else {
      res.status(401).json({ error: "Must be under 128 characters." });
    }
  });
  
  router.put("/:id", (req, res) => {
    projectModel.update(req.params.id, req.body)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "The project cannot be updated." });
      });
  });
  
  router.delete("/:id", (req, res) => {
    projectModel.remove(req.params.id)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "The project cannot be deleted." });
      });
  });
  
  
  module.exports = router;