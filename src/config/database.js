const mongoose = require("mongoose");

const { DATABASE_URL } = require("./serverConfig");

const connect = async ()=>{
    await mongoose.connect(DATABASE_URL);
}

module.exports = connect;