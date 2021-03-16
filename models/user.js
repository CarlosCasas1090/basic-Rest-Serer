
const {Schema, model} = require('mongoose');

const userSchema = Schema
(
    {
        name: 
        {
            type: String,
            required: [true, 'name is required']
        },
        email: 
        {
            type: String,
            required: [true, 'email is required'],
            unique: true
        },
        password: 
        {
            type: String,
            required: [true, 'password is required'],
        },
        img: 
        {
            type: String,
        },
        role: 
        {
            type: String,
            required: true
        },
        status: 
        {
            type: Boolean,
            default: true,
        },
        goolge: 
        {
            type: Boolean,
            default: false,
        },
    }
);

userSchema.methods.toJSON = function()
{
    const {__v, password, ...user} = this.toObject(); //excluding __v and password from user object
    return user;
}

module.exports = model('User', userSchema);