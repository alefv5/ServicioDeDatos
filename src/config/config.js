const data = {
    "development": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "postgres",
        "define": {
            "schema": "public",
            "timestamps": false
        }
    },
    
    "production": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "postgres",
        "NODE_ENV": "production",
        "define": {
            "schema": "public",
            "timestamps": false
        },        
        "dialectOptions": {
            "ssl": {
                "rejectUnauthorized": false
            }
        }, 
        "DATABASE_URL": process.env.DATABASE_URL

    }
};


module.exports = data;