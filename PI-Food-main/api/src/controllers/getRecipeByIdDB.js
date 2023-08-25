const { Recipe, Diet } = require('../db');

module.exports = async (id) => {
    const response = await Recipe.findOne({
        where: { id: id },
        include: [{ model: Diet, through: 'recipe_diet' }]
    })

    //NORMALIZACION DE DATOS PROVENIENTES DE LA BASE DE DATOS
    const dietNames = response.diets.map(diet => diet.name);
    const modifiedResponse = { ...response.toJSON(), diets: dietNames };

    return modifiedResponse;
}