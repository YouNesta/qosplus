var config = {};

config.env = "DEV";

config.DB_URL =  "localhost";
config.DB_NAME = "qosPlus";
config.DB_PORT = 27017;
config.DB_USERNAME = "quosPlus";
config.DB_PASSWORD = "quosPlus";

config.secret = "4815-darma-162342";

config.corsOptions = {
    origin: 'http://192.168.33.10:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};


config.freeRoutes = ['/api/v1/client/user/login', '/api/v1/client/user/subscribe'];

module.exports = config;