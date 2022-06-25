const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/express-users', { useNewUrlParser: true, useUnifiedTopology: true });


const schema = new mongoose.Schema({
    number: String,
    name: String,
    event: String,
    city: String
});

module.exports = mongoose.model('Events', schema);