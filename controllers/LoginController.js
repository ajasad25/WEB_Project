const { LLogin } = require('../models/LoginSchema');
const bcrypt = require('bcrypt');

// Function to add a new login user
async function addLoginUser(firstName, lastName, email, password) {
    try {
        // Check if a user with the provided email already exists
        const existingUser = await LLogin.findOne({ Email: email });
        
        // If a user with the provided email already exists, throw a custom error
        if (existingUser) {
            throw new Error('A user with this email already exists.');
        }

        // Create a new instance of the Login model with the user's information
        const data = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            password: password
        };

        // Hash the password
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; // Replace the plain password with the hashed one.

        // Save the new user to the database
        const userdata = await LLogin.create(data);
        console.log("New user added successfully:", userdata);
    } catch (error) {
        console.error('Error adding new login user:', error);
        throw error; // Propagate the error to the caller
    }
}



async function checkLoginCredentials(email, password) {
    try {
        // Find the user with the provided email
        const user = await LLogin.findOne({ Email: email });
        
        // If no user found, return false
        if (!user) {
            return false;
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // Return true if passwords match, otherwise false
        return isPasswordMatch;
    } catch (error) {
        console.error('Error checking login credentials:', error);
        throw error;
    }
}

module.exports = { addLoginUser,checkLoginCredentials };