var mongoose = require('mongoose');

// Define our User schema
var Task = new mongoose.Schema({
    id: String,
    status: String,
    result: Number,
    query: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Task', Task);