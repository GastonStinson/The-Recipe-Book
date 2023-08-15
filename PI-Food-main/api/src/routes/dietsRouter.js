const express = require('express')
const router = express.Router()
const { Diet } = require('../db')

const getDietsAPI = require('../controllers/getDietsAPI')

router.get('/', async (req, res) => {
    //Usando controlador para traer Dietas de la API
    try {
        const dietsAPI = await getDietsAPI();

        const dietsArray = [];

        // Iterar a través de los objetos de la API y extraer los tipos de dietas
        dietsAPI.forEach(recipe => {
            if (recipe.diets && Array.isArray(recipe.diets)) {
                recipe.diets.forEach(diet => {
                    if (!dietsArray.includes(diet)) {
                        dietsArray.push(diet);
                    }
                });
            }
        });

        dietsArray.map(element => Diet.findOrCreate({
            where: { name: element }
        }))


        return res.status(200).json(dietsArray)
    } catch (error) {
        return res.status(400).send("Error creating Diets")
    }
})

module.exports = router;