const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/WebProject")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Failed to connect:", error);
    });

module.exports = mongoose;

