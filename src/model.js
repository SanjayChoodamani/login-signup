const mongoose = require("mongoose")

const connect = mongoose.connect('mongodb://0.0.0.0:27017/Example');

connect.then(()=>{
    console.log("Database connected sucessfully");
}).catch(()=>{
    console.log("Could not connect to database");
})

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = mongoose.model('users', users);

module.exports = collection;