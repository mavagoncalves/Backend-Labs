const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Landing Page
router.get('/', (req, res) => {
    res.render('index');
});


// date --> friday
router.get('/friday', (req, res) => {
    // query string to test specific date, otherwise use today
    const dateQuery = req.query.date;
    const currentDate = dateQuery ? new Date(dateQuery) : new Date();
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[currentDate.getDay()];
    const isFriday = dayName === 'Friday';

    res.render('friday', { 
        dateString: currentDate.toDateString(), 
        dayName, 
        isFriday 
    });
});

module.exports = router;