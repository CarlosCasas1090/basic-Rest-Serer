const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') =>
{
    return new Promise((resolve, reject) =>
    {
        const payload = {uid}; //you can store anything on payload but is not safe

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, 
            {
                expiresIn: '4h'
            },
            (err, token) =>
            {
                if (err)
                {
                    console.log(err);
                    reject('Token can not be generated');
                }
                else
                {
                    resolve(token);
                }
            });
    });
}


module.exports = 
{
    generateJWT
}