const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const arraySchema = new Schema({name: String});

const pokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    types: {
        type: [arraySchema],
        required: true
    },
    abilities: {
        type: [arraySchema],
        required: true
    },
    stats: {
        type: [arraySchema],
        required: true
    }
});

module.exports = mongoose.model('User', pokemonSchema);