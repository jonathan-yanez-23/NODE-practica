require("dotenv").config();
const express = require("express");
const app = express();
require("./db"); // Establecer conexion con DB
const path = require("path");
const hbs = require("hbs");

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./passport");


// MIDDLEWARE PARA SERIALIZACION
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//RUTAS
indexRoutes = require("./routes/index.routes");
userRoutes = require("./routes/users.routes");
productRoutes = require("./routes/products.routes");

// Inicializar passport y la sesion
app.use(
    session({
        secret: "ecommerceindra_node",
        resave: false, // Solo guarda sesion si hay cambios en ella
        saveUninitialized: false, // Se gestiona la sesion con passport
        cookie: {
            maxAge: 360000 // Milisegundos de duracion de la cookie (1Hora)
        },
        store: MongoStore.create({mongoUrl:"mongodb://localhost:27017/ecommerce-indra"})
    })
);
app.use(passport.initialize());
app.use(passport.session()); // middleware que agrega sesiones a los usuarios

//AGREGAR ROUTES
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

//ruta static para usar la carpeta publicp
app.use("/static", express.static("public"));

// Middleware para cuanda no haya ruta
app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

//Agregar controlador de errores con vista de ERROR
app.use((err, req, res, next) => {
    return res.status(err.status || 500).render('error', {
        message: err.message || 'Unexpected error',
        status: err.status || 500,
    });
});


//HANDLEBARS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerHelper("uppercase", (str) => {
    return str.toUpperCase();
});

hbs.registerHelper("stringify", (object)=>{
    return JSON.stringify(object);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening in http://localhost:"+PORT);
});

