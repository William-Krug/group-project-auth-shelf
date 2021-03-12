const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  res.sendStatus(200); // For testing only, can be removed
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
  // endpoint functionality
  const queryString = `
    INSERT INTO "item" ("description", "image_url")
    VALUES ($1, $2)`;
  pool
    .query(queryString, [req.body.description, req.body.image_url])
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
router.delete('/:id', (req, res) => {
  // endpoint functionality
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
