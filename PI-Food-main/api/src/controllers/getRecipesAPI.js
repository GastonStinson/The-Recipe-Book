const axios = require('axios');
const { KEY } = process.env

module.exports = async () => {
    const { data } = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&number=100&addRecipeInformation=true`)
    return data.results
}