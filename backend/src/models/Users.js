const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = new Schema({
    email: String,
    password: String
},{
    timestamps:true             //agrega 2 campos nuevos, updated y created
});

userSchema.methods.generateHash = function (password){                         //cifra la password 
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);            //genSalt es para ver cuantas veces se aplica el algoritmo
}

//model recibe el nombre del modelo y el esquema
module.exports = model('User', userSchema);