//require("reflect-metadata"); //falta creo---
const cors = require('cors') ;
const helmet = require('helmet');

//Con esto tengo acceso a todos los modulos
const mods = require('./mods');



//Main (mandos)
const port = process.env.PORT || 3008;

mods.Portafolio.logg();
const express = require('express');
const app = express();

-


// Middlewares
app.use(express.json()); // con esto se añdade el traductor de json en el programa
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
    
//Routes and modules
app.use('/', mods.Portafolio.PortafolioRoutes);

// app.get("/", (q,r) => {
//     r.json("hola")
// })

// app.get('/', (req,res)=> {
//     res.status(200).json({message: "Hi!"});
// });

app.get("/", (req,res) => {
    res.json({message: "hola"});
});



// //start express server

app.listen(port, require('dns').lookup(require('os').hostname(), function (err, add, fam) { 
    console.log('You server is runing on: http://localhost:'+port+' and on red: http://'+add+':'+port+'');
}));




module.exports = app
    

