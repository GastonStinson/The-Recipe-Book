const { Recipe } = require('../db')

module.exports = async () => {
    const response = await Recipe.findAll()
    return response
}