const axios = require('axios');
const {Dog, Temperament} = require('../db.js');
require('dotenv').config();
const { API_KEY } = process.env;


const getDogApi = async () => {
    try {
        const api = await axios.get('https://api.thedogapi.com/v1/breeds');
        const dogsAll = api.data?.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                min_height: parseInt(dog.height.metric.split("-")[0]),
                max_height: parseInt(dog.height.metric.split("-")[1]),
                min_weight: parseInt(dog.weight.metric.split("-")[0]),
                max_weight: parseInt(dog.weight.metric.split("-")[1]),
                min_lifeSpan: parseInt(dog.life_span.split('-')[0]),
                max_lifeSpan: parseInt(dog.life_span.split('-')[1]),
                temperaments: dog.temperament,
                from: "API"
               
            };
        });
        return dogsAll;
    } catch {
        throw new Error("La informacion no fue Brindada");

    }
};
////////////////////////////////////////////////////////////////////////////////////////////

const getDogs = async () => {
    try {
        const allDogApi = await getDogApi();
        const allDogDb = await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ["name"],
                through:{
                    attributes: []
                }

            }
        });
            const allDogsTemperament = allDogDb.map(dog =>{
                return{
                    id: dog.id,
                    name: dog.name,
                    image: dog.image,
                    min_height: dog.min_height,
                    max_height: dog.max_height,
                    min_weight: dog.min_weight,
                    max_weight: dog.max_weight,
                    min_lifeSpan: dog.min_lifeSpan,
                    max_lifeSpan: dog.max_lifeSpan,
                    temperaments: dog.temperaments.map(elem => { return elem.name }).join(', '),
                    from: dog.from
    
                }
            })
            return [...allDogApi, ...allDogsTemperament]
        } catch (error) {
            throw new Error(error);           
        };
}; 
/////////////////////////////////////////////////////////////////////////////////////////


           const getDogsIdRaza = async (id) => {
           if(!isNaN(id)){

            let result = await axios(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`);
             console.log(result);
               if (!Object.keys(result.data).length) {
                
                 throw new Error(`The Dog with id ${id} does not exist`);
           }
                  return result.data;
           } else {
              let result = await Dog.findByPk(id);
               if (!Object.keys(result).length) {
                 throw new Error(`The Dog with id ${id} does not exist`);
         }
             return result;
      }
    };
        
///////////////////////////////////////////////////////////////////////////////////////

const getAllDogsName = async (name) => {
    try {
        const allDogs = await getDogs();
        const filtered = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))

        if(filtered.length > 0){
            return filtered;
        } else {
            throw new Error(`El preeo no encontrado ${name}`)
        }
        
    } catch (error) {
        throw new Error(error);
    }
};
//////////////////////////////////////////////////////////////////////////////////////


const getTemperaments = async () => {
    try {
        const temperamentDogApi = await getDogApi()
        let temperament = [];
        temperamentDogApi.map(dog => {
            if(dog.temperaments){
                temperament.push(...dog.temperaments.split(', '))
            };
        });
        temperament.map(elem => {
            Temperament.findOrCreate({
                where: {
                    name: elem,
                },
            });
        });
    } catch (error) {
        throw new Error(error);
        
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////

const postDogs = async (image,name,min_height,max_height,min_weight,max_weight,min_lifeSpan,max_lifeSpan) => {
 

    try {
        const dogApiBody = await getDogs();
        const LowerCaseByName = name.toLowerCase();
        const nameDogB = dogApiBody.find(dog => dog.name.toLowerCase() === LowerCaseByName.trim())
        if(nameDogB){
            throw new Error(`El perro ${name} ya existe en la API ó en la base de dato`);
        }
        else if(!name || !min_height || !max_height || !min_weight || !max_weight || !min_lifeSpan || !max_lifeSpan) {
            throw new Error("Se necesita llenar toda la informacion que se solicita");
        }
        else if(min_height <= 0 || max_height <= 0 || min_weight <= 0 || max_weight <= 0 || min_lifeSpan <= 0 || max_height <= 0){
            throw new Error("La esperanza de vida, el peso y la altura no pueden ser negativos");
        }
        else if(min_height >= max_height){
            throw new Error("La altura minima es mayor que la altura maxima, valide sus datos")
        }
        else if(min_weight >= max_weight){
            throw new Error("El peso minimo es mayor que el peso maximo, valide sus datos");
        }
        else if(min_lifeSpan >= max_lifeSpan){
            throw new Error("La esperanza de vida minima es mayor que la esperanza de vida maxima, valide sus datos");
       }
        const dogNew = await Dog.create({
            name,
            image,
            min_height,
            max_height,
            min_weight,
            max_weight,
            min_lifeSpan,
            max_lifeSpan,
            from
        });
        return dogNew;        
    } catch (error) {
        throw new Error(error);
    }

}
////////////////////////////////////////////////////////////////////////////////////////////

const delDog = async (id) => {
    try {
        const dogDel = await Dog.destroy({
            where: {
                id,
            }
        })
        return dogDel;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    getDogs,
    getDogsIdRaza,
    getAllDogsName,
    getTemperaments,
    postDogs,
    delDog

}

