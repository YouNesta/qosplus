var config = {};

config.env = "DEV";

config.DB_URL =  "localhost";
config.DB_NAME = "quosPlus";
config.DB_PORT = 27017;
config.DB_USERNAME = "quosPlus";
config.DB_PASSWORD = "quosPlus";

config.corsOptions = {
    origin: 'http://192.168.33.10:3000',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Requested-With'],
    credentials: true
};

module.exports = config;