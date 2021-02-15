const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

// GET //
router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the projects',
      });
    });
});


// GET projects by id //
router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then(projects => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: 'The project with this ID is not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the project',
      });
    });
});

// GET // project actions
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
      .then(actions => {
        if (actions) {
          res.status(200).json(actions);
        } else {
          res.status(404).json({ message: 'The project actions with this ID is not found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the actions for this project',
        });
      });
  });


// POST // a new project
router.post('/', (request, response) => {
    const { name, description } = request.body; 

    if (!name || !description) {
        response.status(400)
            .json({ errorMessage: "Please provide name and description for the project." }) 
    } else {
        Projects.insert(request.body)
            .then(project => {
            console.log(project);
            response.status(201).json(project);
        })
        .catch(error => {
            console.log(error);
            response.status(500)
                .json({ error: "There was an error while saving the project to the database" })
        });
    }
});

// PUT // edit a project
router.put('/:id',  (req, res) => {
  const changes = req.body;
  const id = req.params.id;
    
  Projects.update(id, changes)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    });
});


// DELETE // a project
router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The project has been nuked' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
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