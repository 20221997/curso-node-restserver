const { response, request } = require('express');

const userGet = (req = request ,res = response) => {

    const {name='no name', apikey, limit } = req.query;

    res.json({
        msg:'get API - controlador',
        name,
        apikey,
        limit
    })
}
const userPost = (req,res = response) => {

    const {name, age} = req.body;

    res.json({
        msg:'post API - controlador',
        name,
        age
    })
}
const userPut = (req = request ,res = response) => {

    const id = req.params.id

    res.json({
        msg:'put API - controlador',
        id
    })
}
const userDelete = (req,res = response) => {

    res.json({
        msg:'delete API - controlador'
    })
}
const userPatch = (req,res = response) => {

    res.json({
        msg:'patch API - controlador'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
}