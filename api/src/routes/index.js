const { Router } = require('express');
const routerDogs = require('./dogs.routes.js')
const temperamentDogs = require('./temperaments.routes.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', routerDogs);
router.use('/temperaments', temperamentDogs);


module.exports = router;
