// app/models/kmdata.js
// load the things we need
var mongoose = require('mongoose');

/*
*Define the schema for our km model
*and add the name of the mongodb collection.
*/
var kmSchema = mongoose.Schema(
  {
    Kmetros: String,
    litros: String,
    precioT: String,
    precioL: String,
    fecha: String,
  },
  {
    collection: 'KMlogs'
  }
);

// methods ======================
//None by now

// create the model for users and expose it to our app
module.exports = mongoose.model('Kmdata', kmSchema);
