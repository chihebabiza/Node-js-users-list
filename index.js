const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const costumerController = require('./controllers/controller'); // Require your controller file

// Middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: true }));

// Routes - use your main routes file if necessary
// Example: app.use('/', routes);

// GET requests
app.get('/', costumerController.getHomePage);

app.get('/user/add.html', costumerController.getAddCustomerPage);

app.get('/user/edit:id', costumerController.getEditCustomerPage);

app.get('/user/search.html', costumerController.getSearchCustomerPage);

app.get('/user/view:id', costumerController.getViewCustomerPage);

// POST request
app.post('/user/add.html', costumerController.addCustomer);

app.post('/search', costumerController.searchCustomer);

// DELETE request
app.delete('/edit/:id', costumerController.deleteCustomer);

// PUT request
app.put("/edit/:id", costumerController.updateCustomer);

// Connect to database
mongoose.connect('mongodb+srv://3vWL3pk17lvhh79K:3vWL3pk17lvhh79K@cluster0.yu2bxuj.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  });
