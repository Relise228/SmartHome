const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', value="Origin, Content-Type, x-auth-token");
    next();
});

// Define Routes
app.use('/api/client', require('./routes/api/client'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/goods', require('./routes/api/goods'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/order', require('./routes/api/order'));
app.use('/api/review', require('./routes/api/review'));
app.use('/api/admin', require('./routes/api/admin'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));