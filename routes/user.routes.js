const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields, validateJWT, validateRoles, hasRole} = require('../middlewares');
const {isRoleValid, isemailValid, userByIdExists} = require('../helpers/dbValidators');
const {usersGet, usersPut, usersPost, usersDelete, usersPatch} = require('../controllers/users.controller');

const router = Router();


router.get('/', usersGet);

router.post('/', 
[
    check('name', 'name is required').not().isEmpty(),
    check('password', 'min 6 characters on a password are required').isLength({min: 6}),
    check('email', 'invalid email').isEmail(),
    check('email').custom(isemailValid),
    //check('role', 'invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    validateFields
], usersPost);

router.put('/:id',
[
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userByIdExists),
    check('role').custom(isRoleValid),
    validateFields
],
usersPut);

router.patch('/', usersPatch);

router.delete('/:id',
[
    validateJWT,
    //isAdminRole,   //has to be admin
    hasRole('ADMIN_ROLE', 'SALES_ROLE'), //more flexible middleware to let other roles do things
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields
], 
usersDelete);

module.exports = router;