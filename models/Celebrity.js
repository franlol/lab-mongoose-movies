const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebrityModel = Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    catchPhrase: String
});

const Celebrity = mongoose.model('Celebrity', celebrityModel);

module.exports = Celebrity;
