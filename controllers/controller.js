const Costumer = require('../models/costumerSchema');
const moment = require('moment');

// Define your country list
const country_list = ["Afghanistan", "Albania", "Algeria", /* add your countries here */];

// GET / - Render home page
exports.getHomePage = (req, res) => {
    Costumer.find()
        .then((result) => {
            res.render("index", { title: 'Home page', users: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET /user/add.html - Render add customer page
exports.getAddCustomerPage = (req, res) => {
    res.render("user/add", { title: 'Add Customer page', country_list });
};

// GET /user/edit/:id - Render edit customer page
exports.getEditCustomerPage = (req, res) => {
    Costumer.findById(req.params.id)
        .then((userResult) => {
            res.render("user/edit", { country_list, user: userResult, title: "Edit Customer page" });
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET /user/search.html - Render search customer page
exports.getSearchCustomerPage = (req, res) => {
    res.render("user/search", { title: 'Search Customer page' });
};

// GET /user/view/:id - Render view customer page
exports.getViewCustomerPage = (req, res) => {
    Costumer.findById(req.params.id)
        .then((userResult) => {
            res.render("user/view", { moment: moment, user: userResult, title: "View Customer page" });
        })
        .catch((err) => {
            console.log(err);
        });
};

// POST /user/add.html - Handle adding a new customer
exports.addCustomer = (req, res) => {
    Costumer.create(req.body)
        .then(() => {
            res.redirect("/user/add.html");
        })
        .catch((err) => {
            console.log(err);
        });
};

// POST /search - Handle customer search
exports.searchCustomer = (req, res) => {
    const searchQuery = req.body.searchQuery;
    Costumer.find({
        $or: [
            { firstName: searchQuery },
            { lastName: searchQuery }
        ]
    })
        .then((result) => {
            res.render("user/search", { users: result, title: 'Search Results' });
        })
        .catch((err) => {
            console.log(err);
        });
};

// DELETE /edit/:id - Handle deleting a customer
exports.deleteCustomer = (req, res) => {
    Costumer.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

// PUT /edit/:id - Handle updating a customer
exports.updateCustomer = (req, res) => {
    Costumer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
};
