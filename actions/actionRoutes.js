const express = require("express");
const router = express.Router();
const actionModel = require("../data/helpers/actionModel");




router.use(express.json());
 


router.get('/', (req, res) => {
  actionModel.get().then(allPosts => {
    res.status(200).json(allPosts)
  })
  .catch(err => {
      res.status(500).json({message: "The action information could not be retrieved"})
  })
});

router.get('/:id', (req, res) => {
  actionModel.get(req.params.id).then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({message: "The action information could not be retrieved"})
})
});

router.post('/', (req, res) => {
    let action = req.body;
    actionModel.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: `There was a problem creating an action.` })
        });
});

router.put('/:id', (req, res) => {
  actionModel.update(req.params.id, req.body)
  .then(action => {
    res.status(200).json(action)
  })
  .catch(err => {
    res.status(500).json({message: "error while updating"})
  })
});

router.delete('/:id', (req, res) => {
  actionModel.remove(req.params.id)
  .then( newProjectId => {
    res.status(200).json(newProjectId)
  })
  .catch(err => {
    res.status(400).json({message: "error while deleting"})
  })
});

module.exports = router;