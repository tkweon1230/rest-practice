const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

app.get('/', (req, res) => res.send('Api running'));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log( `Server started on port ${PORT}` ));