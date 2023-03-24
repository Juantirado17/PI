const { Router } = require('express');
const {getDogs,getDogsIdRaza,getAllDogsName, getTemperaments, postDogs, delDog} = require('../controllers/controller.js');
const {Temperament,Dog} = require('../db.js')


const router = Router();


router.get('/', async (req, res) => { 
    const { name } = req.query;
         
    try {
        getTemperaments();
        if(name){
            const searchDogName = await getAllDogsName(name);
            res.status(200).send(searchDogName);
        }else{            const searchDog = await getDogs();
            res.status(200).send(searchDog);
        };
        
    } catch (error) {
        res.status(400).json({ error: error.message});
        
    }
 })

router.get('/:id', async (req, res) => {
    console.log('hola')
    const { id } = req.params;
    try {
        const dogSearch = await getDogsIdRaza(id);
        res.status(200).json(dogSearch);        
    } catch (error) {
        res.status(400).json({ error: error.message});
        
    }
});


router.post('/', async(req, res)=>{
    //hago destructuring de las variables que llegan por body
    let {
        name,
        min_height,
        min_weight,
        max_height,
        max_weight,
        temperament,
        min_lifeSpan,
        max_lifeSpan,
        image
    } = req.body;

    name = name.toLowerCase();//redefino la variable name

    //hago un try para verificar si la bd incluye el nuevo objeto pasado por body
    //SELECT * FROM Dogs WHERE name=name  -->el dato del objeto

    try{
        let dogFound = await Dog.findAll({
            where:{
                name:name
            }
        })
        // console.log(dogFound);
        //si el resultado del SELECT es favorable, no inserto un nuevo perro a la bd
        if(dogFound.length>0){
            res.status(403).send("El perro ya existe, no se puede crear el resultado")
        }else{
            let newDog = await Dog.create({
                name,
                min_height,
                min_weight,
                max_height,
                max_weight,
                temperament,
                min_lifeSpan,
                max_lifeSpan,
                image
            });

            //Busco en la tabla de temperaments
            //SELECT * FROM Temperaments WHERE name= temperament -->el dato del objeto
            let temperamentDog = await Temperament.findAll({
                where:{
                    name:temperament
                }
            });

            //a la tabla Dog le añado el temperamento con add<Table>
            newDog.addTemperament(temperamentDog);
            res.send('Nuevo perro con su temperamento fueron creados')
        }
    }catch(error){
        console.log(error)
    }


})


module.exports = router;



