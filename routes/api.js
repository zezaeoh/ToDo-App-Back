const router = require('express').Router();
const Todo = require('../models/todo');

// Find All
router.get('/', (req, res) => {
  Todo.findAll()
    .then((todos) => {
      res.json(todos);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/:todoid', (req, res) => {
  Todo.findOneByTodoid(req.params.todoid)
    .then((todo) => {
      if (!todo) return res.status(404).send({ err: 'Todo not found' });
      res.json(todo);
    })
    .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post('/', (req, res) => {
  Todo.create(req.body)
    .then(todo => res.json({_id: todo._id}))
    .catch(err => {console.log(err); res.status(500).send(err);});
});

// Check by todoid
router.put('/:todoid/check', (req, res) => {
  Todo.checkByTodoid(req.params.todoid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

// Uncheck by todoid
router.put('/:todoid/uncheck', (req, res) => {
  Todo.uncheckByTodoid(req.params.todoid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

// Update by todoid
router.put('/:todoid', (req, res) => {
  Todo.updateByTodoid(req.params.todoid, req.body)
    .then(todo => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

// Delete by todoid
router.delete('/:todoid', (req, res) => {
  Todo.deleteByTodoid(req.params.todoid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
