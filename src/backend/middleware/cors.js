const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true
};

module.exports = cors(corsOptions);
