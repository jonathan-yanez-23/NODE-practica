require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/ecommerce-indra", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});