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


// View All Tasks
router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.render('tasks/index', { tasks });
});


// Create New Form
router.get('/tasks/new', (req, res) => {
    res.render('tasks/new');
});

router.post('/tasks', async (req, res) => {
    await Task.create({ title: req.body.title, completed: req.body.completed === 'on' });
    req.flash('success', 'Task successfully created!'); // MESSAGE
    res.redirect('/tasks');
});


// View Individual Task
router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('tasks/show', { task });
});


// Edit Form
router.get('/tasks/:id/edit', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('tasks/edit', { task });
});

router.put('/tasks/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, { // uses method-override for PUT
        title: req.body.title, 
        completed: req.body.completed === 'on' 
    });
    req.flash('success', 'Task successfully updated!'); // MESSAGE
    res.redirect('/tasks');
});


// Delete Button
router.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id); // uses method-override for PUT
    req.flash('success', 'Task permanently deleted!'); // MESSAGE
    res.redirect('/tasks');
});
module.exports = router;