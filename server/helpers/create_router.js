const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  // INDEX route!
  router.get('/', (req, res) => {
    collection.find().toArray().then((docs) => {
      res.json(docs);
    });
  });


//Not using SHOW route in this project....should I keep it here?
  // SHOW route
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: ObjectID(id) }).then((doc) => {
      res.json(doc);
    });
  });

// CREATE route
  router.post('/', (req, res) => {
    collection.insertOne(req.body)
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
  });

  //UPDATE route
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    collection.updateOne(
      { _id: ObjectID(id) },
      { $set: updatedData }
    )
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))

  });


  //DESTROY route
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: ObjectID(id) })
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
  });

  return router;

};

module.exports = createRouter;
