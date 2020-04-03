const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/client', require('./routes/api/client'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/goods', require('./routes/api/goods'));
app.use('/api/cart', require('./routes/api/cart'));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));