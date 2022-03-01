// Import express package
const express = require('express');
// Import Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');



// Initialize our app variable by setting it to the value of express()
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});



//https://git.heroku.com/damp-inlet-53910.git
//https://damp-inlet-53910.herokuapp.com/