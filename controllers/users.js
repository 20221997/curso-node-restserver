const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user');

const userGet = async(req = request ,res = response) => {

    // const {name='no name', apikey, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const users = await Usuario.find(query)
    //         .skip( Number(desde) )
    //         .limit( Number(limite) );

    // const total = await Usuario.countDocuments(query);
            
    const [total, users] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]) 

    res.json({
        total,
        users
    })
}

// Crea usuario
const userPost = async(req,res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Encriptar passsword
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    })
}

// Actualiza
const userPut = async(req = request, res = response) => {

    const id = req.params.id;
    const { _id, password, google, email, ...resto } = req.body;

    if( password ) {
        // ENCRIPTAR CONTRASEÑA
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt ); 
    }

    const user = await Usuario.findByIdAndUpdate( id, resto );

    res.json(user)
}
const userDelete = async(req, res = response) => {

    const { id } = req.params;
    // Borramos fisicamente
    // const user = await Usuario.findByIdAndDelete(id);

    const user = await Usuario.findByIdAndUpdate( id , { estado: false} );

    res.json(user)
}
const userPatch = (req, res = response) => {
    res.json({
        msg:"patch API - controlador"
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
}

