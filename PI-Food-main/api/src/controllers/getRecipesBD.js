const { Recipe, Diet } = require('../db');

module.exports = async () => {
    const response = await Recipe.findAll({ include: [{ model: Diet, through: 'recipe_diet' }] });

    //NORMALIZACION DE DATOS PROVENIENTES DE LA BASE DE DATOS
    const modifiedResponse = response.map(recipe => {
        const dietNames = recipe.diets.map(diet => diet.name);
        return { ...recipe.toJSON(), diets: dietNames };
    });

    return modifiedResponse;
}