const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
// Crear datos de los productos
const products = [
    {
        name: "Alfiler",
        description: "Es un alfiler de costura hecho de acero inoxidable. Dicho es capaz de resistir el paso del tiempo y el desgaste que este genera",
        price: 1.1,
        image: "https://i2.wp.com/almacenmerceria.com/wp-content/uploads/alfileres-bonis-11129-negro.jpg"
    },
    {
        name: "Bote Salvavidas",
        description: "Este artefacto salvavidas cumple con los estándares requeridos para el rescate marítimo y las operaciones acuáticas. Color rojo con reflectantes para ser fácilmente visible",
        price: 2.2,
        image: "https://thumbs.dreamstime.com/z/un-bote-salvavidas-o-una-balsa-transportada-para-evacuaci%C3%B3n-de-emergencia-en-caso-desastre-bordo-buque-el-es-equipo-seguridad-193896442.jpg"
    },
    {
        name: "Caja Fuerte",
        description: "Caja fuerte de color negro y 1 metro cúbico de capacidad. Incluye la instalación en el lugar que desee el usuario",
        price: 3.3,
        image: "https://www.soloseguridad.net/site/company/e0/122938/images/189364/caja-fuerte-giv_ci3.jpg"
    },
    {
        name: "Dedal de costura",
        description: "Dedal de costura para evitar posibles accidentes durante el proceso de costura.",
        price: 4.4,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/De_a_coudre.jpg/220px-De_a_coudre.jpg"
    },
    {
        name: "Espada",
        description: "Artículo decorativo con forma de Espada. Está orientado a ser colgado en paredes amplias.",
        price: 5.5,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Trp-Sword-14226124129-v06.png/250px-Trp-Sword-14226124129-v06.png"
    },
    {
        name: "Gráfica",
        description: "Tarjeta gráfica LKL GTX 3080. Es una gráfica orientada a videojuegos, pero puede servir para entornos de trabajo.",
        price: 6666.66,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/df/RTX_3090_Founders_Edition%21.jpg"
    },
    {
        name: "Helado",
        description: "Helado artesanal fabricado en Heladerías ElGnomo SL. Está disponible en diferentes sabores, siendo el más recomendado el de limón.",
        price: 7.77,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Cucurucho_argentino.jpg/220px-Cucurucho_argentino.jpg"
    },
    {
        name: "Insecto en ámbar",
        description: "Es una pieza de ámbar con un insecto en su interior. Sirve como artículo decorativo, pero por su tamaño, también puede ser usado en joyería.",
        price: 8.88,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Baltic_Amber.jpg"
    },
    {
        name:"Jilguero",
        description:"Figura realista de un jilguero. Sirve como artículo decorativo, así como el uso de pisapapeles en la oficina.",
        price: 9.99,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Carduelis_carduelis_close_up_2.jpg/375px-Carduelis_carduelis_close_up_2.jpg"
    },
    {
        name:"Koala de porcelana",
        description:"Figura de porcelana con forma de Koala. La pintura no está incluida, la imagen es un ejemplo del resultado final de la figura tras aplicar la pintura.",
        price: 10.10,
        image :"https://images3.programmerclick.com/699/1e/1e39b33a8d5630b14d399a93b671688b.JPEG"
    },
    {
        name:"Lexus",
        description:"Coche Lexus a escala. Es un artículo de coleccionista, por tanto, incluye detalles realistas como los mecanismos de las puertas, el motor, entre otros.",
        price: 11.11,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Lexus_IS_300h_F_Sport_%28III%29_%E2%80%93_Frontansicht%2C_18._August_2013%2C_D%C3%BCsseldorf.jpg/375px-Lexus_IS_300h_F_Sport_%28III%29_%E2%80%93_Frontansicht%2C_18._August_2013%2C_D%C3%BCsseldorf.jpg"
    },
    {
        name:"Madera",
        description:"Madera orientada a la construcción de muebles. En el proceso de extracción de la madera se han respetado las medidas ambientales y ecológicas.",
        price: 12.12,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Taxus_wood.jpg/330px-Taxus_wood.jpg"
    },
    {
        name:"Neón",
        description:"Luces de neón para ser usadas en escritorios orientados al mundo de los videojuegos, no obstante, también sirven como luz de escritorio si se realiza una instalación adecuada. La instalación está incluida.",
        price: 13.13,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Neon.JPG/1199px-Neon.JPG"
    },
    {
        name:"Obelisco",
        description:"Obelisco decorativo realizado en mármol y con 50 metros de altura. La instalación y colocación está incluida en el precio.",
        price: 14444.14,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Ob%C3%A9lisque_Louqsor_Concorde_a.jpg/330px-Ob%C3%A9lisque_Louqsor_Concorde_a.jpg"
    },
    {
        name:"Plato chino",
        description:"Plato de porcelana de edición limitada, incluye dibujos orientales. Aunque está orientado al uso decorativo, puede ser usado con fines gastronómicos.",
        price: 15.15,
        image :"https://i.pinimg.com/736x/03/6c/40/036c4061672a69fa1a48d09dbef2f28a.jpg"
    },
    {
        name:"Queso de cabra",
        description:"Queso de cabra realizado en la granja TommyDominguez SL. Puede ser usado como aperitivo, o como ingrediente de recetas más elaboradas.",
        price: 16.16,
        image :"https://upload.wikimedia.org/wikipedia/commons/d/d3/QuesoCabraLaCollada.jpg"
    },
    {
        name:"Robot de cocina",
        description:"Robot de cocina cuyo fin es replicar los platos de las recetas incorporadas a mano. Es capaz de realizar cualquier tipo de receta siempre y cuando cuente con los ingredientes indicados.",
        price: 17.17,
        image :"https://upload.wikimedia.org/wikipedia/commons/c/c2/Robot_de_cocina_inteligente.jpg"
    },
    {
        name:"Sillas",
        description:"Es un juego de sillas de madera rígida de roble. Es capaz de resistir el desgaste gracias al barniz utilizado.",
        price: 18.18,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adam_Nudd-Homeyer_4_Slat_Tappan_Side_Chair_ca_2010s_-present.jpg/330px-Adam_Nudd-Homeyer_4_Slat_Tappan_Side_Chair_ca_2010s_-present.jpg"
    },
    {
        name:"Teclado ergonómico",
        description:"Es un teclado ergonómico orientado a largas jornadas de escritura, cuenta con unas teclas acolchadas y un reposamanos integrado. Compatible con los sistemas operativos actuales del mercado",
        price: 19.19,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Computer_keyboard_ES_layout.svg/600px-Computer_keyboard_ES_layout.svg.png"
    },
    {
        name:"Ukelele",
        description:"Instrumento musical fabricado en Hawai",
        price: 20.20,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ukulele1_HiRes.jpg/207px-Ukulele1_HiRes.jpg"
    },
    {
        name:"Violonchelo",
        description:"Instrumento musical de cuerda orientado a usarse en conciertos y salas de música.",
        price: 21.21,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Cello_front_side.png/198px-Cello_front_side.png"
    },
    {
        name:"WalkieTalkie",
        description:"Instrumentos de comunicación inalámbrica con alcance de 100 metros, incluye batería y cargador. Durabilidad de 100horas de autonomía.",
        price: 22.22,
        image :"https://upload.wikimedia.org/wikipedia/commons/b/bd/Recreational_Walkie_Talkies.jpg"
    },
    {
        name:"Xilófono",
        description:"Instrumento musical de percusión orientado al uso en colegios. También puede servir como instrumento decorativo",
        price: 23.23,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tres_xil%C3%B3fonos.JPG/220px-Tres_xil%C3%B3fonos.JPG"
    },
    {
        name:"Yoyó",
        description:"Juguete de cuerda que también puede servir para realizar múltiples trucos, dependiendo de la habilidad del usuario.",
        price: 24.24,
        image :"https://upload.wikimedia.org/wikipedia/commons/9/92/Wooden_yo-yo.jpg"
    },
    {
        name:"Zafiro",
        description:"Pieza de zafiro de alto valor, apto para regalos o reutilización en joyería.",
        price: 25.25,
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Logan_Sapphire_SI.jpg/375px-Logan_Sapphire_SI.jpg"
    }
];
const users = [
    {
        email: "edward.white@commerce.admin.com",
        password: "$2b$10$2KR3VxFLNfyGeZBdJz5X7uFJf1vSQvHAWX383l3kHUcSfEKhAyyyO" //12345x
    },
    {
        email: "exampleuser@mail.com",
        password: "$2b$10$Ms/orY8QPgDpcFzQM8dYBOQEprjOdYW0xPTWe.fDaB0wW.qyix7Zi" 
    }
];
const productDocuments = products.map(product => new Product(product))
const userDocuments = users.map(user => new User(user));
// CONEXION
mongoose
.connect("mongodb://localhost:27017/ecommerce-indra", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    const allProducts = await Product.find();
    // Si existen products previamente, dropeamos
    if(allProducts.length){
        await Product.collection.drop();
    }

    const allUsers = await User.find();
    if(allUsers.length){
        await User.collection.drop();
    }
})
.catch((err) => console.log("Error in deleting data: "+err))
.then(async () => {
    await Product.insertMany(productDocuments);
    await User.insertMany(userDocuments);
})
.catch((err) => console.log("Error in creating data: "+err))
.finally(() => mongoose.disconnect());