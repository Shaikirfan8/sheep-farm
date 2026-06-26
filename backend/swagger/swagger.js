const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sheep Farm Management API",
            version: "1.0.0",
            description: "REST API documentation for Sheep Farm Management System"
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Development Server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: [
        "./routes/*.js"
    ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;