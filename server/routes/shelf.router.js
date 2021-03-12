const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed

  console.log('isAuthenticated', req.isAuthenticated());
  console.log('user is', req.user);

  let queryText = `
      SELECT * FROM "item"
      WHERE user_id = $1;
  `;

  // get the id of the logged in user
  let userId = req.user.id;

  pool
    .query(queryText, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 *
 * req.body looks like:
 * {
 *  description: baseball   -- string
 *  image_url: http://www...  --string
 * }
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  //breadcrumbs for testing and debugging
  console.log('*** Router -> POST /api/shelf');
  console.log('req.body', req.body);

  //define userId
  let userId = req.user.id;

  // endpoint functionality
  const queryString = `
    INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3)`;
  pool
    .query(queryString, [req.body.description, req.body.image_url, userId])
    .then((dbRes) => {
      console.log('Successful item POST');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error in POST', err);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  let itemId = req.params.id;

  let userId = req.user.id;

  let queryText = `
    DELETE FROM "item" 
    WHERE "id"= $1 AND "user_id" = $2`;

  pool
    .query(queryText, [itemId, userId])
    .then(dbRes => {
      console.log(`Item ${itemId} DELETE Success`);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error in DELETE', err);
      res.sendStatus(500);
    })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
