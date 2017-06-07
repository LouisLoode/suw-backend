module.exports = {
    env: process.env.NODE_ENV || 'development',
    api: {
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || '3000',
        url: process.env.API_URL || 'http://localhost:3000'
    },
    mongodb: process.env.MONGODB_URI || 'mongodb://mongodb:27017/suw_backend_dev',
    key: {
        privateKey: process.env.PRIVATE_KEY || 'YourPrivateKey',
    }
};
