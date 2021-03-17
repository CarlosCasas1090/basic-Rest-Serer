const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const usersGet = async(req, res) =>
 {
    const {limit = 5, from = 0} = req.query;

    const [total, users] = await Promise.all
    (
        [
            User.countDocuments({status: true}), //count users where status = true
            User.find({status: true}) //find users where status = true
                .skip(Number(from))
                .limit(Number(limit))
        ]
    );

    res.json
    (
        {
            total,
            users
        }
    );
 }

 const usersPost = async(req, res) =>
 {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //save on DB
    await user.save();

    res.json(user)
 }

 const usersPut = async(req, res) =>
 {
    const {id} = req.params;
    const {_id, password, google, email, ...others} = req.body; //exclude fields that will not be updated (add role?)

    if (password)
    {
        //encrypt password
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, others);

    res.json(user);
 }

 const usersPatch = (req, res) =>
 {
    res.json
    (
        {
            msg: 'patch API - Controller'
        }
    );
 }

 const usersDelete = async(req, res) =>
 {
    const {id} = req.params;
    //const uid = req.uid;

    //Delete permanently
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {status: false}); //just update status to false instead of delete user  

    res.json(user); 
 }


 module.exports = 
 {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
 }