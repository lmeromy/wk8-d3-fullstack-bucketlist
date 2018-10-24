const express = require('express');
const app = express();
const path = require('path'); // WHAT IS THIS?
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public'); // WHAT IS THIS??
app.use(express.static(publicPath)); // static are all the files we have already created?? Very unclear why we need this
app.use(parser.json());  // this is where we specify json as our desired parsing format? 

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('leahs_wishlist');
  const placesCollection = db.collection('places');
  const placesRouter = createRouter(placesCollection);
  app.use('/api/places', placesRouter);
})
.catch(console.error);

app.listen(3000, function () {
  console.log(`Listening on port ${this.address().port}`);
});
