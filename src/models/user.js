const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
},{timestamps: true});

userSchema.pre('save',function(next){
    const encryptedpassword = bcrypt.hashSync(this.password,12);
    this.password = encryptedpassword;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;