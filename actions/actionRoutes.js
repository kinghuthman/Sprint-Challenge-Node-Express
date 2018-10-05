const express = require("express");
const router = express.Router();
const actionModel = require("../data/helpers/actionModel");
const projectModel = require("../data/helpers/projectModel");


router.use(express.json());
 
function validProject(req, res, next){
  if(req.body.userId) {
    projectModel.get().then(allUsers => {
        let filter = allUsers.filter(users => {
          return users.id == req.body.userId
        })
        if(filter[0]) {
          next();
        } else {
          res.status(401).json({message: "The included userId is not valid. Please include a vallid userId and try again."})
        }
      }).catch(err => {
        res.status(500).json({message: "There was an error validating userId"})
      })
  } else {
      res.status(400).json({message: "Please include a userId in your request"})
  }
}

router.get('/', (req, res) => {
  actionModel.get().then(allPosts => {
    res.status(200).json(allPosts)
  })
});

router.get('/:id', (req, res) => {
  actionModel.get(req.params.id).then(post => {
    res.status(200).json(post)
  })
});

router.post('/', validProject, (req, res) => {
  if (!req.body.text) {
    res.json(400).json({message: "Please add text and resubmit request"})
  } else if (req.body.id) {
    res.status(400).json({message: 'Please remove id and submit again. A new Id will be added automatically.'})
  } else {
    actionModel.insert(req.body)
      .then(postId => {
        res.status(200).json(postId)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
});

router.put('/:id', (req, res) => {
  actionModel.update(req.params.id, req.body)
  .then(count => {
    res.status(200).json(actions)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  actionModel.remove(req.params.id)
  .then( newProjectId => {
    res.status(200).json(newProjectId)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;