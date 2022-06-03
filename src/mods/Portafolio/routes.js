//Imports
//----------------------------------------------------------------------------
const { getUsersC, updateUserPassC, createUserC, deleteUserC } = require('./controllers');
const { Router } = require('express');


const rootRoutes = '/portafolio';
const routes = Router();
//Routes
//----------------------------------------------------------------------------

//consulta a todos los proyectos del pertafolio
routes.get('/', getUsersC);

//consulta a un solo proyecto del pertafolio
routes.get('/:id', getUsersC);

// Create a new proyecto del pertafolio
routes.post('/', createUserC);


// deleted un proyecto del pertafolio
routes.delete('/', deleteUserC);



//Exports
const router = Router();
router.use(rootRoutes, routes);

module.exports = router;


