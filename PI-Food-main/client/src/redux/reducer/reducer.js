import {
    GET_RECIPES,
    GET_BY_NAME,
    GET_DIETS,
    FILTER_BY_ORIGIN,
    FILTER_BY_DIET,
    RESET_FILTER,
    ORDER_ALPH_AZ,
    ORDER_ALPH_ZA,
    ORDER_HS_ASC,
    ORDER_HS_DES,
    FIRST_PAGE,
    PAGINADO
} from "../action-types/action-types";

let initialState = {
    allRecipes: [],
    allRecipesCopy: [],
    diets: [],
    page: 1
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        //TRAER RECETAS DESDE EL SERVER
        case GET_RECIPES:
            return {
                ...state,
                allRecipes: action.payload,
                allRecipesCopy: action.payload
            }

        //TRAER SOLO LA RECETA QUE COINCIDA CON EL VALUE DE LA SEARCH BAR 
        case GET_BY_NAME:
            return {
                ...state,
                allRecipes: action.payload
            }


        //TRAER DIETS DESDE EL SERVER
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }


        //----FILTROS-----
        case RESET_FILTER:
            return {
                ...state,
                allRecipes: state.allRecipesCopy
            }

        case FILTER_BY_DIET: {
            const selection = action.payload;
            const filteredByDiet = state.allRecipes.filter((recipe) =>
                recipe.diets.includes(selection)
            );
            return {
                ...state,
                allRecipes: filteredByDiet
            }
        }

        case FILTER_BY_ORIGIN: {
            return {
                ...state,
                allRecipes: action.payload
            }
        }


        //----ORDER----
        case ORDER_ALPH_AZ:
            return {
                ...state,
                allRecipes: [...state.allRecipes.sort((a, b) => a.title.localeCompare(b.title))],
            };

        case ORDER_ALPH_ZA:
            return {
                ...state,
                allRecipes: [...state.allRecipes.sort((a, b) => b.title.localeCompare(a.title))],
            };

        case ORDER_HS_ASC: {
            return {
                ...state,
                allRecipes: [...state.allRecipes.sort((a, b) => b.healthScore - a.healthScore)]
            }
        }

        case ORDER_HS_DES: {
            return {
                ...state,
                allRecipes: [...state.allRecipes.sort((a, b) => a.healthScore - b.healthScore)]
            }
        }

        case PAGINADO: {
            return {
                ...state,
                page: action.payload
            }
        }

        case FIRST_PAGE: {
            return {
                ...state,
                page: 1
            }
        }

        default:
            return state;
    }
}

export default rootReducer;