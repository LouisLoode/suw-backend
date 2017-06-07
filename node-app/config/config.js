console.log("process.env.NODE_ENV: "+process.env.NODE_ENV);
console.log("process.env.API_HOST: "+process.env.API_HOST);
console.log("process.env.API_PORT: "+process.env.API_PORT);
console.log("process.env.API_URL: "+process.env.API_URL);
console.log("process.env.MONGODB_URI: "+process.env.MONGODB_URI);
console.log("process.env.PRIVATE_KEY: "+process.env.PRIVATE_KEY);

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
