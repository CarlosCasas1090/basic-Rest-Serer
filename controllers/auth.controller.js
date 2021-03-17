const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/generateJwt');


const login = async(req, res) =>
{
    const {email, password} = req.body;

    try 
    {
        //verify email
        const user = await User.findOne({email});

        if (!user)
        {
            return res.status(400).json({msg: 'incorrect User/Password - user'});
        }

        //verify active user
        if (!user.status)
        {
            return res.status(400).json({msg: 'incorrect User/Password - status: false'});
        }

        //verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        
        if (!validPassword)
        {
            return res.status(400).json({msg: 'incorrect User/Password - password'});
        }

        //generate JWT
        const token = await generateJWT(user.id);
        
        res.json
        (
            {
                user,
                token
            }
        );
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({msg: 'Something went wrong on our side'})
    }
}

module.exports = 
{
    login
}