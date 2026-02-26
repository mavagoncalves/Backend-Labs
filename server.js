require('dotenv').config();
const express = require('express');
//control for data --> schema
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI, {
  family: 4 //forces Node to use standard IPv4
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => console.log('Server is running'));
  })
  .catch(err => console.log(err));