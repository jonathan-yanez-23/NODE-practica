const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

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

router.post('/register', (req, res, next) => {
    // Invocamos a la autenticación de Passport
    passport.authenticate('register', (error, user) => {
        // Si hay un error, renderizamos de nuevo el formulario con un error
        if (error) {
            return res.render('register', {
                error: error.message
            });
        }

        // Si no hay error, redijimos a los usuarios a la ruta que queramos
        return res.redirect('/products');
    })(req); // ¡No te olvides de invocarlo aquí!
});


router.post("/logout", (req, res, next) => {
    if(req.user){
        // Se destruye el objeto req.user para el usuario
        req.logout();
        req.session.destroy(() => {
            // Eliminar cookie de sesión al cancelar la sesion
            res.clearCookie("connect.sid");
            // redirijimos a usuario a la home
            res.redirect("/");
        });
    } else {
        return res.sendStatus(304); // Si no hay usuario, no habremos cambiado nada
    }
});

router.put("/add-to-cart", async (req, res, next)=>{
    try{
        const productId = req.body.productId;
        const userId = req.body.userId;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {"cart": productId}
            },
            {new: true}
        );
        return res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}); 

router.put("/add-to-cartt", async (req, res, next)=>{
    try{
        if(req.user){
            productId = user._id;
        } else {
            return res.status(500).render("error", {message: "No has iniciado la sesion, por tanto no puedes agregar productos"});
        }
        const productId = req.body.productId;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {"cart": productId}
            },
            {new: true}
        );
        return res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}); 





module.exports = router;