const axios = require('axios')
const { KEY } = process.env;

module.exports = async (id) => {
    const { data } = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}&addRecipeInformation=true`)
    return data
}