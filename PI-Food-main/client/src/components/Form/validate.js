// VALIDAR TITULO
export default (input) => {
    let errors = {};

    if (input.title.length < 6) {
        { errors.e1 = 'Title must be longer than 6 characters !!' }
    }
    if (input.image.length === 0) {
        { errors.e2 = 'Image required !!' }
    }
    if (input.description.length < 10) {
        { errors.e3 = 'Description must be longer than 10 characters !!' }
    }
    if (input.healthScore <= 1 || input.healthScore >= 100) {
        { errors.e4 = 'Health score must be between 1 and 100 !!' }
    }
    if (input.diets.length < 1) {
        { errors.e5 = 'Select at least 1 diet' }
    }
    return errors

}



