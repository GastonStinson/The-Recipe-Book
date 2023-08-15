import { GET_RECIPES, GET_BY_NAME, GET_DIETS, GET_BY_ID, FILTER_BY_ORIGIN, FILTER_BY_DIET, RESET_FILTER } from "../action-types/action-types";

let initialState = {
    allRecipes: [],
    allRecipesCopy: [],
    diets: [],
    recipeById: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                allRecipes: action.payload,
                allRecipesCopy: action.payload
            }

        case GET_BY_NAME:
            return {
                ...state,
                allRecipes: action.payload
            }

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        case GET_BY_ID:
            return {
                ...state,
                recipeById: action.payload
            }

        case RESET_FILTER:
            return {
                ...state,
                allRecipes: state.allRecipesCopy
            }

        case FILTER_BY_DIET: {
            const selectedDiet = action.payload;
            const filteredByDiet = selectedDiet === 'All Diets' ? state.allRecipes :
                state.allRecipes.filter((recipe) => recipe.diets.includes(selectedDiet))
            return {
                ...state,
                allRecipes: filteredByDiet
            }
        }

        case FILTER_BY_ORIGIN: {
            const selectedOrigin = action.payload;

            if (selectedOrigin === 'DB') {
                const fromDB = state.allRecipes.filter(recipe => recipe.id.toString().length === 36)
                return {
                    ...state,
                    allRecipes: fromDB
                }
            } else if (selectedOrigin === 'API') {
                const fromAPI = state.allRecipes.filter(recipe => recipe.id.toString().length < 36)
                return {
                    ...state,
                    allRecipes: fromAPI
                }
            } else {
                return
            }
        }

        default:
            return state;
    }
}

export default rootReducer;