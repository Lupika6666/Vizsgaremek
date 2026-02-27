require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const corsMiddleware = require('./middleware/cors')
const logger = require('./config/logger')
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler')
const sessionConfig = require('config/session')

//Route importok hely
const bookRoutes = require('./routes/bookRoutes')
const szerzoRoutes = require('./routes/authorRoutes')
const languageRoutes = require('./routes/languageRoutes')
const genreRoutes = require('./routes/genreRoutes')
const peldanyRoutes = require('./routes/bookCopyRoutes')
const rentalRoutes = require('./routes/rentalRoutes')
const readerRoutes = require('./routes/readerRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const port = process.env.PORT || 3000

//Middlewarek helye
app.use(express.json())
app.use(corsMiddleware)
//TODO Session kezelés, de még nem végleges
app.use(sessionConfig)

//HTTP kérés loggolás
app.use(morgan(':method :url :status :response-time ms', {
    stream: logger.stream
}));

//Route helyek (itt hívjuk meg a kéréseket) 
app.use('/api/konyvek', bookRoutes)
app.use('/api/szerzok', szerzoRoutes)
app.use('/api/nyelvek', languageRoutes)
app.use('/api/mufajok', genreRoutes)
app.use('/api/peldanyok', peldanyRoutes)
app.use('/api/kolcsonzesek', rentalRoutes)
app.use('/api/olvasok', readerRoutes)
app.use('/api/userek', userRoutes)

//Hibakezelés
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Szerver elindult a http://localhost:${port} címen`)
})