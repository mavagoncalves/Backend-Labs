require('dotenv').config();
const express = require('express');
//mongoose : control for data --> schema
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const webRoutes = require('./routes/webRoutes');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');

const webSetup = [
    express.urlencoded({ extended: true }),
    methodOverride('_method'),
    session({
        secret: 'my_super_secret_session',
        resave: false,
        saveUninitialized: false
    }),
    flash(),
    (req, res, next) => {
        res.locals.successMsg = req.flash('success');
        res.locals.errorMsg = req.flash('error');
        next();
    }
];

app.use(webSetup);

// security 
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// web routes
app.use('/', webRoutes);

mongoose.connect(process.env.MONGO_URI, {
  family: 4 //forces Node to use standard IPv4
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => console.log('Server is running'));
  })
  .catch(err => console.log(err));