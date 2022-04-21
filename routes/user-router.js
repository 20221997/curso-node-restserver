const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos } = require('../middleware/validar-campos');
const { esRolValido, emailExiste, userExistById } = require('../helpers/db-validators');

const { userGet, 
        userPost, 
        userPut, 
        userDelete, 
        userPatch } = require('../controllers/users');

const router = Router();

router.get('/', userGet );

router.put('/:id',[
     check('id','It is not a ID valid').isMongoId(),
     check('id').custom(userExistById),
     check('role').custom(esRolValido),
     validarCampos
], userPut );

router.post('/', [
     check('name', 'Name is required').not().isEmpty(),   
     check('password', 'Password must be 6 characters long').isLength({ min:6 }),   
     check('email', 'Email is not valid').isEmail(),   
     check('email').custom(emailExiste),   
     //check('role', 'Role is not valid').isIn(['ADMIN_ROLE','USER_ROLE']), 
     check('role').custom(esRolValido),
     validarCampos  
] ,userPost );

router.delete('/:id',[
     check('id','It is not a ID valid').isMongoId(),
     check('id').custom(userExistById),
     validarCampos  
], userDelete );

router.patch('/', userPatch );

module.exports = router;