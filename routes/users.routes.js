const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");


// Middleware propio para algunos endpoint que requieren usuarios autenticados
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user) => {
        if (error) {
            return res.status(401).redirect('/login');
        }
        
        req.login(user, (err) => {
            // Si hay un error logeando al usuario, resolvemos el controlador
            if (err) {
                return res.status(401).redirect('/login');
            }
            // Si no hay error, redijimos a los usuarios a la ruta que queramos
            return res.status(200).redirect('/allproducts');
        });
    })(req, res, next);
});


router.post('/register', (req, res, next) => {
    // Invocamos a la autenticación de Passport
    passport.authenticate('register', (error, user) => {
        // Si hay un error, renderizamos de nuevo el formulario con un error
        if (error) {
            return res.status(400).redirect("/register");
        }

        // Si no hay error, redijimos a los usuarios a la ruta que queramos
        return res.status(200).redirect('/allproducts');
    })(req); // ¡No te olvides de invocarlo aquí!
});


router.post("/logout", [authMiddleware.isAuthenticated], (req, res, next) => {
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
        return res.sendStatus(200); // Si no hay usuario, no habremos cambiado nada
    }
});


/**
 * Si la sesion esta iniciada, se agrega la id del producto comprado al carrito del usuario
 * Recibe por post la id del producto.
 * Problema: hay que comprobar si dicho producto con dicha id existe en la base de datos
 */
router.put("/add-to-cart",[authMiddleware.isAuthenticated], async (req, res, next)=>{
    try{
        if(req.session.passport){
            const userId = req.session.passport.user;
            const productId = req.body.productId;
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {"cart": productId}
                },
                {new: true}
            );
            return res.status(200).json(updatedUser);
        } else {
            return res.status(400).json({message: "No puedes agregar productos porque no has iniciado sesion"});
        }
    }catch(err){
        next(err);
    }
}); 


router.get("/my-cart", [authMiddleware.isAuthenticated], async (req, res, next) => {
    try {
        if(req.session.passport){
            const userId = req.session.passport.user;
            const user = await User.findById(userId);
            const cartProductsIds = user.cart.map((item)=>item.valueOf());
        
            if (user){
                return res.status(200).json({cartProductsIds});
            } else {
                return res.status(400).json(err.message);
            }
        } else {
            return res.status(400).json({message: "No estas logueado en la aplicacion"})
        }
    } catch (err) {
        next(err); 
    }
});


module.exports = router;