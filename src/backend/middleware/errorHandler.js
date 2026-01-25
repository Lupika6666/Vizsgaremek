const logger = require('../config/logger');

function notFoundHandler(req, res, next) {
    logger.warn(`404 - Nem található: ${req.method} ${req.originalUrl}`, {
        ip: req.ip,
        userAgent: req.get('user-agent')
    });
    
    res.status(404).json({ 
        hiba: "A kért végpont nem található",
        url: req.originalUrl 
    });
}

function errorHandler(err, req, res, next) {
    logger.error(`Hiba: ${err.message}`, {
        error: err.stack,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        body: req.body
    });
    
    res.status(err.status || 500).json({ 
        hiba: err.message || "Belső szerverhiba" 
    });
}

module.exports = {
    notFoundHandler,
    errorHandler
};