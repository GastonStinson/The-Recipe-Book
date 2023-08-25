import axios from 'axios'
import { GET_RECIPES, PAGINADO, FIRST_PAGE, GET_BY_NAME, GET_DIETS, FILTER_BY_ORIGIN, ORDER_ALPH_AZ, ORDER_ALPH_ZA, ORDER_HS_ASC, ORDER_HS_DES, FILTER_BY_DIET, RESET_FILTER } from '../action-types/action-types'

export function getRecipes() {
    return async function (dispatch) {
        const { data } = await axios('http://localhost:3001/recipes')
        return dispatch({
            type: GET_RECIPES,
            payload: data
        })
    }
}

export function getByName(title) {
    return async function (dispatch) {
        const { data } = await axios(`http://localhost:3001/recipes?title=${title}`)
        return dispatch({
            type: GET_BY_NAME,
            payload: data
        })
    }
}

export function getDiets() {
    return async function (dispatch) {
        const { data } = await axios('http://localhost:3001/diets')
        return dispatch({
            type: GET_DIETS,
            payload: data
        })
    }
}

export function filterByDiet(selection) {
    return {
        type: FILTER_BY_DIET,
        payload: selection
    }
}

export function resetFilter() {
    return {
        type: RESET_FILTER
    }
}

export function filterOrigin(data) {
    return {
        type: FILTER_BY_ORIGIN,
        payload: data
    }
}

export const orderAlphAZ = () => {
    return {
        type: ORDER_ALPH_AZ
    }
}

export const orderAlphZA = () => {
    return {
        type: ORDER_ALPH_ZA
    }
}
export function orderHSAsc() {
    return {
        type: ORDER_HS_ASC
    }
}
export function orderHSDes() {
    return {
        type: ORDER_HS_DES
    }
}

export function paginado(direction, page) {
    if (direction === 'prev') {
        page = page - 1
    } else if (direction === 'next') {
        page = page + 1
    }

    return {
        type: PAGINADO,
        payload: page
    }
}

export function firstPage() {
    return {
        type: FIRST_PAGE
    }
}