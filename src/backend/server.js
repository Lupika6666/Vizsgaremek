require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const corsMiddleware = require('./middleware/cors')
const logger = require('./config/logger')
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')

//Route importok hely
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require('./routes/authorRoutes')
const languageRoutes = require('./routes/languageRoutes')
const genreRoutes = require('./routes/genreRoutes')
const bookCopyRoutes = require('./routes/bookCopyRoutes')
const rentalRoutes = require('./routes/rentalRoutes')
const readerRoutes = require('./routes/readerRoutes')
const userRoutes = require('./routes/userRoutes')
const swaggerRoutes = require('./routes/swaggerRoutes')

const app = express()
const port = process.env.PORT || 3000

//Middlewarek helye
app.use(express.json())
app.use(corsMiddleware)

app.use(cookieParser())

//HTTP kérés loggolás
app.use(morgan(':method :url :status :response-time ms', {
    stream: logger.stream
}));

//Route helyek (itt hívjuk meg a kéréseket) 
app.use('/api/konyvek', bookRoutes)
app.use('/api/szerzok', authorRoutes)
app.use('/api/nyelvek', languageRoutes)
app.use('/api/mufajok', genreRoutes)
app.use('/api/peldanyok', bookCopyRoutes)
app.use('/api/kolcsonzesek', rentalRoutes)
app.use('/api/olvasok', readerRoutes)
app.use('/api/felhasznalok', userRoutes)
app.use('/api/docs', swaggerRoutes)

//Hibakezelés
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
    logger.info(`Szerver elindult a http://localhost:${port} címen`)
})