const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel'); // Pull in your existing model

// Landing Page
router.get('/', (req, res) => {
    res.render('index');
});


module.exports = router;