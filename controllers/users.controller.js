//const {response} = require('express');

const usersGet = (req, res) =>
 {
    const {q, device, page = '1', limit} = req.query;

    res.json
    (
        {
            msg: 'get API - Controller',
            q, 
            device,
            page,
            limit
        }
    );
 }

 const usersPost = (req, res) =>
 {
    const {name, age} = req.body;

    res.json
    (
        {
            msg: 'post API - Controller',
            name,
            age
        }
    );
 }

 const usersPut = (req, res) =>
 {
    const {id} = req.params;

    res.json
    (
        {
            msg: 'put API - Controller',
            id
        }
    );
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

 const usersDelete = (req, res) =>
 {
    res.json
    (
        {
            msg: 'delete API - Controller'
        }
    );
 }


 module.exports = 
 {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
 }