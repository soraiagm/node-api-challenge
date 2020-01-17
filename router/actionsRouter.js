const express = require('express');

const Actions = require('../data/helpers/actionModel.js')

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

// POST // a new action
// router.post('/:id/actions', (req, res) => {
//     const { description, notes } = req.body; 
//     const id = req.params.id;

//     Actions.get(id)
//        .then(projectId => {
//            if (projectId.length === 0) {
//                Response.status(404).json({ message: "The project with this ID does not exist"})
//            }
//        })

//     if (!description || !notes) {
//         res.status(400).json({ errorMessage: "Please provide the description and the notes for the action"})
//     } else {
//         Actions.insert({ project_id: id, description: description, notes: notes })
//             .then(insertAction => {
//                 res.status(201).json(insertAction)
//             })
//             .catch(error => {
//                 res.status(500).json({ error: "There was an error adding the action to this project"})
//             })
//     }

    // if (!description || !notes) {
    //     res.status(400)
    //         .json({ errorMessage: "Please provide the description and notes for the project." }) 
    // } else {
    //     Actions.insert(request.body)
    //         .then(action => {
    //         console.log(action);
    //         res.status(201).json(action);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         res.status(500)
    //             .json({ error: "There was an error while saving the project to the database" })
    //     });
    // }
// });

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