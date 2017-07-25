/**
 * index.js
 * src/routes
 *
 * Created by samover on 18/07/2017.
 */


const express = require('express');

const router = express.Router();
const DocumentationController = require('../controllers/documentation.controller');

/**
 * ROUTE DECLARATIONS
 */
router.use('/documentation', DocumentationController.create());

// Catch all unknown routes.
router.all('*', (req, res) => res.sendStatus(404));

module.exports = router;
