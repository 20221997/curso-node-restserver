const mongoose = require('mongoose');


const dbConection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('MongoDB conectado')

    } catch (err) {
        console.log(err)
        throw new Error('Error al iniciar base de datos')
    }

}

module.exports = {
    dbConection
} 