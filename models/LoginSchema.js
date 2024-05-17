const mongoose = require("../server");
const { Schema, model } = mongoose;

// Define the LoginSchema
const LoginSchema = new Schema({
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

let LLogin;

try {
    // Create a Mongoose model based on the schema
    LLogin = model('Login', LoginSchema);
    console.log("Login Table Created");
} catch (error) {
    // Handle any errors that occurred during model creation
    console.error('Error creating Login model:', error);
}

// Export the LoginSchema
module.exports = { LoginSchema, LLogin };
