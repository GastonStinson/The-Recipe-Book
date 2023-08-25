const express = require('express')
const router = express.Router()
const { Recipe, Diet } = require('../db')
const { Op } = require('sequelize')
const getRecipesBD = require('../controllers/getRecipesBD')
const getRecipesAPI = require('../controllers/getRecipesAPI')
const getRecipeById = require('../controllers/getRecipeById')
const getRecipeBytitle = require('../controllers/getRecipeByTitle')
const getRecipeByIdDB = require('../controllers/getRecipeByIdDB')

//Ruta para buscar todas las recetas, si se nos pasa un titulo por Query, buscar por titulos
router.get('/', async (req, res) => {
    //Recibe el titulo de la receta por Query
    const { title } = req.query
    try {
        //Condicional para buscar por titulo
        if (title) {
            const foundByTitleBD = await Recipe.findAll({
                where: {
                    title: {
                        //Verificar coincidencias con el titulo recibido
                        [Op.iLike]: `%${title}%`
                    }
                }
            })
            //Buscar primero en BD, si no encuentro en API
            if (foundByTitleBD.length > 0) return res.status(200).json(foundByTitleBD)

            const foundByTitleAPI = await getRecipeBytitle(title);
            if (foundByTitleAPI.length <= 0) return res.status(404).send(
                `The recipe with the specified title "${title}" was not found. Error: ` + error.message
            )
            return res.status(200).json(foundByTitleAPI)
        }

        //Buscar en BD y en API las recetas
        const recipesBD = await getRecipesBD();
        const recipesAPI = await getRecipesAPI();

        return res.status(200).json([...recipesBD, ...recipesAPI])
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
})


// -- RUTA DE BUSQUEDA POR ID --
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //Buscar por ID dentro de la base de datos
        if (id.toString().length == 36) {
            const foundByIdDB = await getRecipeByIdDB(id)

            return res.status(200).json(foundByIdDB)
        }

        //Buscar por ID en la API
        const foundById = await getRecipeById(id)

        return res.status(200).json(foundById)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


// -- RUTA DE CREACION DE RECETA --
router.post('/', async (req, res) => {
    const { title, image, description, healthScore, stepByStep, diets } = req.body;

    //Verificar que los atributos indispensables no sean nulos.
    if (!title || !image || !description) return res.status(400).send('Attributes "title", "image" and "description" are needed.')

    try {
        //Crear Receta en Base de Datos
        const createdRecipe = await Recipe.create({
            title,
            image,
            description,
            healthScore,
            stepByStep
        })
        //Buscar Dieta correspondiente
        const dietDB = await Diet.findAll({ where: { name: diets } })
        //Asignar Dieta a la Receta creada
        createdRecipe.addDiet(dietDB)

        return res.status(200).send(`The recipe with the title "${title}" was successfully created!`)
    } catch (error) {
        return res.status(400).send(`Failed to create the recipe!! ` + error.message)
    }
})

module.exports = router;