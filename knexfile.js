const dotenv = require('dotenv')

dotenv.config() // setting the env variables

module.exports = {
    development: {
        client: process.env.DB_CLIENT || 'mysql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'ks',
            port: process.env.DB_PORT || '3306'
        }
    }
}