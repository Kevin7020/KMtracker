// app/models/kmdata.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our km model
var kmSchema = mongoose.Schema({

    Kmetros: String,
    litros: String,
    precioT: String,
    precioL: String,
    fecha: String,

});

// methods ======================
//None by now

// create the model for users and expose it to our app
module.exports = mongoose.model('Kmdata', kmSchema);
