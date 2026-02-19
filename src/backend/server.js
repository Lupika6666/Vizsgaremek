require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const corsMiddleware = require('./middleware/cors')
const logger = require('./config/logger')
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler')

//Route importok hely
const konyvekRoutes = require('./routes/konyvek')
const szerzokRoutes = require('./routes/szerzok')
const nyelvekRoutes = require('./routes/nyelvek')
const mufajokRoutes = require('./routes/mufajok')
const peldanyokRoutes = require('./routes/peldanyok')
const kolcsonzesekRoutes = require('./routes/kolcsonzesek')
const olvasokRoutes = require('./routes/olvasok')

const app = express()
const port = process.env.PORT || 3000

//Middlewarek helye
app.use(express.json())
app.use(corsMiddleware)

//HTTP kérés loggolás
app.use(morgan(':method :url :status :response-time ms', {
    stream: logger.stream
}));

//Route helyek (itt hívjuk meg a kéréseket) 
app.use('/api/konyvek', konyvekRoutes)
app.use('/api/szerzok', szerzokRoutes)
app.use('/api/nyelvek', nyelvekRoutes)
app.use('/api/mufajok', mufajokRoutes)
app.use('/api/peldanyok', peldanyokRoutes)
app.use('/api/kolcsonzesek', kolcsonzesekRoutes)
app.use('/api/olvasok', olvasokRoutes)

//Hibakezelés
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Szerver elindult a http://localhost:${port} címen`)
})