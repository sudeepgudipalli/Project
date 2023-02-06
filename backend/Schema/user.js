const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {type: String, required: [true,"Username is Required"]},
    email: {type: String, required: [true,"Email is Required"],unique: true},
    pass: {type: String, required: [true,"Password is Required"]},
    followed_ids : [String],
    admin: Boolean
})
userSchema.pre("save",async function(){
    const salt = bcrypt.genSaltSync();
    this.pass = bcrypt.hashSync(this.pass,salt);
})
module.exports = mongoose.model("Users",userSchema);