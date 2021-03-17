const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res, next) =>
{
    const token = req.header('x-token');

    if (!token)
    {
        return res.status(401).json({msg: 'Token was not provided'});
    }

    try 
    {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const authUser = await User.findById(uid); //read the admin user

        if (!authUser)
        {
            return res.status(401).json({msg: 'user not found on DB'});
        }

        if (!authUser.status)//verify if admin user is active
        {
            return res.status(401).json({msg: 'Token not valid - admin user not active'});
        }

        req.user = authUser;

        next();
    } 
    catch (error) 
    {
        console.log(error);
        res.status(401).json({msg: 'Token not valid'});
    }
}


module.exports = 
{
    validateJWT
}