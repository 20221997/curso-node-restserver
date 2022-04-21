const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

// Para extraer lo que no queremos sea expuesto
UserSchema.methods.toJSON = function() {
    const { password, __v, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );










// {
//     name: 'ass',
//     correo: 'sjndj',
//     password:'jdn',
//     img:'dede',
//     role:'kmddm',
//     estado: false,
//     gogle:false,
// }