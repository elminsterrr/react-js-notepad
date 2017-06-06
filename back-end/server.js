const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const ObjectID = mongodb.ObjectID;
const NOTES_COLLECTION = 'notes';
const app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log('Database connection ready');

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log('App now running on port', port);
  });
});

// NOTES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({ 'error': message });
}

app.use(cors());

// GET: finds all notes "/api/notes"
app.get('/api/notes', function (req, res) {
  db.collection(NOTES_COLLECTION).find({}).sort({ timeRaw: -1 }).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get notes.');
    } else {
      res.status(200).json(docs);
    }
  });
});

// POST: creates a new note "/api/notes"
app.post('/api/notes', function (req, res) {
  const newNote = req.body;

  if (!req.body.title) {
    handleError(res, 'Invalid user input', 'Failed to create new note. Must provide a title.', 400);
    return;
  }

  if (!req.body.content) {
    handleError(res, 'Invalid user input', 'Failed to create new note. Must provide a content.', 400);
    return;
  }

  db.collection(NOTES_COLLECTION).insertOne(newNote, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to create new note.');
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

// GET: find note by id "/api/notes/:id"
app.get('/api/notes/:id', function (req, res) {
  db.collection(NOTES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get note');
    } else {
      res.status(200).json(doc);
    }
  });
});

// PUT: update note by id "/api/notes/:id"
app.put('/api/notes/:id', function (req, res) {
  const updateDoc = req.body;
  delete updateDoc._id;

  db.collection(NOTES_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to update note');
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

// DELETE: deletes note by id "/api/notes/:id"
app.delete('/api/notes/:id', function(req, res) {
  db.collection(NOTES_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, 'Failed to delete note');
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
