const Usuario = require('../models/user');
const Role = require('../models/role'); 


const esRolValido = async(role = '') => {
  const existeRole = await Role.findOne({role});
  if( !existeRole ) {
    throw new Error(`Role ${ role } is not register in the BD`);
  }
}

const emailExiste = async( email = '' ) => {
  const existeEmail = await Usuario.findOne({email});
    if( existeEmail ) {
      throw new Error(`Exist the email ${email}`)
    }
}

const userExistById = async( id ) => {
  const existUser = await Usuario.findById(id);
  console.log(existUser)
    if( !existUser ) {
      throw new Error(`Not exist with the id ${id}`)
    }
}

module.exports = {
  esRolValido,
  emailExiste,
  userExistById
}