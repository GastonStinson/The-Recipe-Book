const axios = require('axios')
const { KEY } = process.env

module.exports = async (title) => {
    const { data } = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&titleMatch=${title}&addRecipeInformation=true`)
    return data.results
}