const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require("bcrypt");
const MongoClient = require("mongodb").MongoClient;
const { addLoginUser, checkLoginCredentials } = require('./controllers/LoginController');
const { addAdminUser, checkAdminLoginCredentials } = require('./controllers/AdminController');
const { error } = require('console');

let db;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Define the directory where the templates are located
app.set('views', 'Views');

// Serve static files from the 'public' directory
app.use(express.static('assets'));
// Define a route
app.get('/', (req, res) => {
    res.render('home'); // index.ejs in the views folder
});

// More routes can be defined here
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/fogetPass', (req, res) => {
    res.render('forgetpass');
});

app.get('/signup_error', (req, res) => {
    res.render('signup_error');
});

app.get('/login_error', (req, res) => {
    res.render('login_error');
});

app.get('/about', (req, res) => {
    res.render('about');
});

//User
app.get('/user', (req, res) => {
    res.render('user');
});

app.get('/user_dashboard', (req, res) => {
    res.render('user_dashboard');
});

app.get('/user_demographics', (req, res) => {
    res.render('user_demographics');
});

app.get('/user_acconut', (req, res) => {
    res.render('user_acconut');
});

app.get('/user_detail', (req, res) => {
    res.render('user_detail');
});

app.get('/book_flight', (req, res) => {
    res.render('book_flight');
});
app.get('/book_flight2', (req, res) => {
    res.render('book_flight2');
});

app.get('/details_payment', (req, res) => {
    res.render('details_payment');
});

app.get('/feedback', (req, res) => {
    res.render('feedback');
});

//Admin
app.get('/user', (req, res) => {
    res.render('user');
});

app.get('/admin_login', (req, res) => {
    res.render('admin_login');
});

app.get('/admin_dahboard', (req, res) => {
    res.render('admin_dahboard');
});

app.get('/admin_signup', (req, res) => {
    res.render('admin_signup');
});



//register user
app.post("/signup", async (req, res) => {
    try {
        await addLoginUser(req.body.fname, req.body.lname, req.body.Email, req.body.password);
        res.render("home")
    } catch (error) {
        if (error.message === 'A user with this email already exists.') {
            // Display a message on the HTML page prompting the user to choose a different email
            res.render('signup_error')
        } else {
            // Handle other errors
            console.error('Failed to add user:', error);
        }
    }
});

//login User
app.post("/login", async (req, res) => {
    try {
        const isAuthenticated = await checkLoginCredentials(req.body.Email, req.body.password);
        if (isAuthenticated) {
            res.render("user_dashboard")
        } else {
            // Display a message on the HTML page informing the user of invalid credentials
            res.render("login_error")
        }
    } catch (error) {
        console.error('Failed to check login credentials:', error);
    }

});

//register admin
app.post("/admin_signup", async (req, res) => {

    try {
        await addAdminUser(req.body.fname, req.body.lname, req.body.Email, req.body.password);
        res.render("admin_login")
    } catch (error) {
        if (error.message === 'A user with this email already exists.') {
            // Display a message on the HTML page prompting the user to choose a different email
            res.render('signup_error')
        } else {
            // Handle other errors
            console.error('Failed to add user:', error);
        }
    }

});

//Login Admin
app.post("/admin_login", async (req, res) => {
    try {
        const isAuthenticated = await checkAdminLoginCredentials(req.body.Email, req.body.password);
        if (isAuthenticated) {
            res.render("admin_dashboard")
        } else {
            // Display a message on the HTML page informing the user of invalid credentials
            res.render("login_error")
            console.log("ERROOR")
        }
    } catch (error) {
        console.error('Failed to check login credentials:', error);
    }
});

app.get('/api/admins', (req , resp) => {
    db.collection('admins').find({}).toArray((err , client) => {
        if(err) throw err
        resp.send(client)
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
        db = client.db('admins'); // Add the database name here, e.g., client.db('myDatabaseName')
        console.log('Connected to MongoDB');
    });
});
