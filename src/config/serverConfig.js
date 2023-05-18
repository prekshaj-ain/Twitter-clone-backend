const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    DATABASE_URL : process.env.DATABASE_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET,
    AWS_REGION : process.env.AWS_REGION,
    SECRET_ACCESS_KEY : process.env.SECRET_ACCESS_KEY,
    ACCESS_KEY_ID : process.env.ACCESS_KEY_ID,
    BUCKET_NAME : process.env.BUCKET_NAME
}