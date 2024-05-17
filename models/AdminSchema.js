const mongoose = require("../server");
const { Schema, model } = mongoose;

const AdminSchema = new Schema({
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
});

let ALogin;

try {
    // Create a Mongoose model based on the schema
    ALogin = model('Admin', AdminSchema);
    console.log("Login Table Created");
} catch (error) {
    // Handle any errors that occurred during model creation
    console.error('Error creating Login model:', error);
}

module.exports = { AdminSchema, ALogin };
