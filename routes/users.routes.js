const express = require("express");
const passport = require("passport");
const router = express.Router();


router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user) => {
        if (error) {
            return res.render('login', {
                error: error.message
            });
        }
        
        req.login(user, (err) => {
            // Si hay un error logeando al usuario, resolvemos el controlador
            if (err) {
                console.log(err);
                return res.render('login', {
                    error: err.message
                });
            }

            // Si no hay error, redijimos a los usuarios a la ruta que queramos
            return res.redirect('/products');
        });
    })(req, res, next);
});


module.exports = router;