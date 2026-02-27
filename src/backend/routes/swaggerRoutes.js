const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../lib/swagger');
const { methodNotAllowed } = require('../utils/error');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));
router.all(["/"], methodNotAllowed)

module.exports = router