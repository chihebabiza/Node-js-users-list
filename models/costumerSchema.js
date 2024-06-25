const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a schema
const costumerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    age: Number,
    country: String,
    gender: String
}, { timestamps: true })

// create a model
const Costumer = mongoose.model("costumer", costumerSchema);

// export the model
module.exports = Costumer;