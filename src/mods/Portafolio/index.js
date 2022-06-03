//Imports
//---------------------------------------------------------------------------------------------
const  PortafolioRoutes = require("./routes")
// const UserControllers = require("./controllers")
// const UserServices = require("./services")
// const UserHelpers = require("./helpers")
// const UserUtils = require("./utils")


// const UserRoutes = UserRout.UserRoutes;

const logg = () => {
    console.log("hola User");
}



//Se exportan los controlladores, servicios y rutas para que puedan ser usados por otros modulos
//Sin embargo internamente dentro de cada modulo se pueden llamar directamente
module.exports = {
    logg, //esta es solo para hacer test
    PortafolioRoutes
}