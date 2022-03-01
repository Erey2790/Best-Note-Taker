// Import express package
const express = require('express');

// Initialize our app variable by setting it to the value of express()
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/notes', (req, res) => {
    // `res.sendFile` is Express' way of sending a file
  // `__dirname` is a variable that always returns the directory that your server is running in
  res.sendFile(__dirname + '/public/assets/notes.html')
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});



//https://git.heroku.com/damp-inlet-53910.git
//https://damp-inlet-53910.herokuapp.com/