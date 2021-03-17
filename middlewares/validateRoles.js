

const isAdminRole = (req, res, next) =>
{
    if (!req.user)
    {
        return res.status(500).json({msg: 'tried to verify role with unverified token'});
    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE')
    {
        return res.status(401).json({msg: `${name} is not administrator`});
    }

    next();
}

const hasRole = (...roles) =>       //...roles -> receives all parameters from caller
{
    
    return (req, res, next) => 
    {
        if (!req.user)
        {
            return res.status(500).json({msg: 'tried to verify role with unverified token'});
        }

        if (!roles.includes(req.user.role)) 
        {
            return res.status(401).json({msg: `not an authorized role, role needs to be: ${roles}`});
        }

        next();
    }
}


module.exports =
{
    isAdminRole,
    hasRole
}