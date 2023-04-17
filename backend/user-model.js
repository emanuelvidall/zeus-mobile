//iniciando schema de usermodel requiring mongoose e mongodb
require('./database')

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    //setando formas de validacao do input para previnir dados sujos no db
    name: {
        type: String, 
        required: [true, 'nao pode ser vazio'],
        index: true,
        unique: true
    }
})

//registrando scheman com mongoose
module.exports = User = mongoose.model('User', userSchema);




