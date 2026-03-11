const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Könyvtár API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [path.join(__dirname, '../controllers/*.js') ]
};

const openapiSpecification = swaggerJsdoc(options);
console.log("Talált útvonalak száma, amely leírást tartalmaz: ", Object.keys(openapiSpecification.paths).length)
module.exports = openapiSpecification;