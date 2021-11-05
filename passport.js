const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');


// Creamos los salts de bcrypt
const saltRounds = 10;

passport.use(
    'register',
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                // Primero buscamos si el usuario existe en nuestra DB
                const previousUser = await User.findOne({
                    email: email
                });

                // Si hay usuario previamente, lanzamos un error
                if (previousUser) {
                    const error = new Error('The user is already registered!');
                    return done(error);
                }

                // Si no existe el usuario, vamos a "hashear" el password antes de registrarlo
                const hash = await bcrypt.hash(password, saltRounds);

                // Creamos el nuevo user y lo guardamos en la DB
                const newUser = new User({
                    email: email,
                    password: hash,
                });

                const savedUser = await newUser.save();

                // Invocamos el callback con null donde iría el error y el usuario creado
                done(null, savedUser);
            } catch (err) {
                // Si hay un error, resolvemos el callback con el error
                return done(err);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, email, password, done) =>{

            try {
                // Primero buscamos si el usuario existe en nuestra DB    
                const currentUser = await User.findOne({email: email});
                // Si NO existe el usuario, tendremos un error
                if (!currentUser){
                    const error = new Error("The user does not exist");
                    return done(error);
                }
                // Si existe el usuario, vamos a comprobar si su password enviado coincide con el registrado
                const isValidPassword = await bcrypt.compare(
                    password,
                    currentUser.password
                );

                // Si el password es incorrecto, enviamos un erro a nuestro usuario
                if(!isValidPassword) {
                    const error = new Error(
                        "The email & password combination is incorrect!"
                    );
                    return done(error);
                }
                
                done(null, currentUser);
            } catch (err) {
                // Si hay un error, resolvemos el callback con el error
                return done(err);
            }
        }
    )
);

// Funcion que usar el usuario de req.login para registrar su id en la cookie de sesion
passport.serializeUser((user, done)=>{
    return done(null, user._id); 
});

// Funcion que busca el usuario dada su _id en la DB y devolvera req.user si existe
passport.deserializeUser(async (userId, done)=>{
    try {
        const existingUser = User.findById(userId);
        return done(null, existingUser);
    } catch (err) {
        return done(err);
    }
});



module.exports = passport;