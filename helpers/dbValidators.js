const Role = require('../models/role');
const User = require('../models/user');


const isRoleValid = async(role = '') => 
{
    const roleExists = await Role.findOne({role});

    if (!roleExists)
    {
        throw new Error(`role ${role} not found on Data Base`);
    }
}

const isemailValid = async(email) =>
{
    const emailExists = await User.findOne({email});

    if (emailExists)
    {
        throw new Error(`email: ${email} already registerd`);
    }
}

const userByIdExists = async(id) =>
{
    const userExists = await User.findById(id);

    if (!userExists)
    {
        throw new Error(`id: ${id} does not exist`);
    }
}


module.exports = 
{
    isRoleValid,
    isemailValid,
    userByIdExists
}
