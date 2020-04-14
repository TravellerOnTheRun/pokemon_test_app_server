const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const pokemonSchema = new Schema({
    name: String,
    types: String,
    abilities: String,
    stats: String,
    imageUrl: String
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    favourites: [pokemonSchema]
});

module.exports = mongoose.model('User', userSchema);
