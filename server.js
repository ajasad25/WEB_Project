const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Define the directory where the templates are located
app.set('views', 'Views');

// Serve static files from the 'public' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// Define a route
app.get('/', (req, res) => {
  res.render('home'); // index.ejs in the views folder
});

// More routes can be defined here
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/signin', (req, res) => {
  res.render('signin');
});


app.get('/fogetPass', (req, res) => {
    res.render('forgetpass');
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
