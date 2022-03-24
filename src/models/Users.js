const Mongoose = require("mongoose")

const UserSchema = new Mongoose.Schema({
    name: String,
    surname:String,
    password: String,
    email: {
        type:String,
        unique:true,
    },
    active: Boolean,
    activatedDate: {
        type: Date,
        default: Date.now
    }
},{timestamps:true, versionKey:false})

module.exports= Mongoose.model("user",UserSchema);