// app/routes.js
var Kmdata            = require('./models/kmdata.js');
module.exports = function(app, passport, io) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // Send the signup form data
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // Send the login form data
    app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form

    /* SIGNUP PAGE DISABLED !
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    */

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /*
    *var kmdata = [ //OLD DEV array to store messages
    *  { Kmetros: "1", litros: "2", precioT: "3", precioL: "4", fecha: "04/27/2018 10:43 PM" }
    *]
    */

    app.post('/kmdata', (req, res) =>{
      var kmdata = new Kmdata(req.body)

      kmdata.save((err) => {
        if (err)
        sendStatus(500)

        //kmdata.push(req.body)
        io.emit('kmdata', req.body)// Fresh data homie!
        res.sendStatus(200)
      })
    });

    app.get('/kmdata', (req, res) =>{
      Kmdata.find({}, (err, Kmdata) =>{
        res.send(Kmdata)
      })
      //console.log(req.body) //Logs the incoming request to the console
    })

    io.on('connection',(socket) => {
      console.log('Client connected') //Logs the incoming users to the console
    })

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
