const express = require('express');
const app = express();
const path = require('path');
const collection = require("./mongodb");
const bcrypt = require("bcrypt");

// done
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

app.get('/user_dashboard', (req, res) => {
  res.render('user_dashboard');
});

app.get('/user', (req, res) => {
  res.render('user');
});

app.get('/about', (req, res) => {
  res.render('about');
});

//register user
app.post("/signup", async (req, res) => {

  const data = {
    FirstName: req.body.fname,
    LastName: req.body.lname,
    Email: req.body.Email,
    password: req.body.password
  }

  //check if the user already exists
  const existinguser = await collection.findOne({ Email: data.Email });
  if (existinguser) {
    res.render("signup_error");
  } else {

    const saltRounds = 10; //Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword; //Replace the hash password with original password.

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.render("home")
  }

});

//login User
app.post("/login", async (req, res) => {
  try {
    const user = await collection.findOne({ Email: req.body.Email });

    if (!user) {
      return res.render("login_error");
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordMatch) {
      res.render("user_dashboard");
    } else {
      res.send("WRONG PASSWORD!");
    }
  } catch (error) {
    res.render("login_error");
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
