const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/WebProject")

    .then(() => {
        console.log("MongoDB connected");
    })

    .catch(() => {
        console.log("Failed to connect");
    })

const LoginSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("Collection1", LoginSchema)

module.exports = collection
