import axios from 'axios'
import { FILTER_BY_ORIGIN } from '../action-types/action-types'

export function getRecipes() {
    return async function (dispatch) {
        const { data } = await axios('http://localhost:3001/recipes')
        return dispatch({
            type: 'GET_RECIPES',
            payload: data
        })
    }
}

export function getByName(title) {
    return async function (dispatch) {
        const { data } = await axios(`http://localhost:3001/recipes?title=${title}`)
        return dispatch({
            type: 'GET_BY_NAME',
            payload: data
        })
    }
}

export function getDiets() {
    return async function (dispatch) {
        const { data } = await axios('http://localhost:3001/diets')
        return dispatch({
            type: 'GET_DIETS',
            payload: data
        })
    }
}

export function getById(id) {
    return async function (dispatch) {
        const { data } = await axios(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: 'GET_BY_ID',
            payload: data
        })
    }
}

export function filterByDiet(selection) {
    return {
        type: 'FILTER_BY_DIET',
        payload: selection
    }
}

export function resetFilter() {
    return {
        type: 'RESET_FILTER'
    }
}

//export function filterOrigin(selection) {
//    return async function (dispatch) {
//        if (selection == 'All') return
//        else if (selection == 'DB') {
//            const { data } = await axios('http://localhost:3001/recipes/DB')
//            return dispatch({
//                type: 'FILTER_BY_ORIGIN',
//                payload: data
//            })
//        } else if (selection == 'API') {
//            const { data } = await axios('http://localhost:3001/recipes/API')
//            return dispatch({
//                type: 'FILTER_BY_ORIGIN',
//                payload: data
//            })
//        }
//    }
//}

export function filterOrigin(selection) {
    return {
        type: FILTER_BY_ORIGIN,
        payload: selection
    }
}

