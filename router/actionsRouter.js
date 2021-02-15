const express = require('express');

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

// GET // all actions //
router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the actions for the project',
      });
    });
});

// get actions by id //
router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: 'The action with this ID is not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the action with this ID',
      });
    });
});

// POST // a new action to a project
 router.post('/', (req, res) => {
    const action = req.body;

    Actions.insert(action)
          .then(action => {
              res.status(200).json(action);
          })
          .catch(error => {
              res.status(500).json({ errorMessage: "Could not add a new action"})
          })
 });

// PUT //
router.put('/:id',  (req, res) => {
    const changes = req.body;
    const id = req.params.id;
      
    Actions.update(id, changes)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: 'The action could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the action',
        });
      });
  });

// DELETE // an action
router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The action has been nuked' });
      } else {
        res.status(404).json({ message: 'The action could not be removed' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });
});


module.exports = router;