
const validateFileds = require('../middlewares/validateFields');
const validateJwt = require('../middlewares/validateJwt');
const validateRoles = require('../middlewares/validateRoles');

module.exports =
{
    ...validateFileds,
    ...validateJwt,             //... brings all exports from the middleware
    ...validateRoles
}