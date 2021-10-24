import { helpConstants } from '../constants'

const initState = {
    allData: [],
    adding: false,
    added: false,
    fetching: false,
    fetched: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    error: null,
}

const helpReducer = (state = initState, action) => {
    switch (action.type) {

        // GET ALL HELPS
        case `${helpConstants.GET_ALL_HELP_DATA}_REQUEST`:
            return state = {
                ...state,
                fetching: true
            }
        case `${helpConstants.GET_ALL_HELP_DATA}_SUCCESS`:
            return state = {
                ...state,
                allData: [...action.payload.allData],
                fetching: false,
                fetched: true
            }
        case `${helpConstants.GET_ALL_HELP_DATA}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                fetching: false,
                fetched: false
            }


        // CREATE A HELP
        case `${helpConstants.CREATE_HELP}_REQUEST`:
            return state = {
                ...state,
                adding: true
            }
        case `${helpConstants.CREATE_HELP}_SUCCESS`:
            return state = {
                ...state,
                adding: false,
                added: true
            }
        case `${helpConstants.CREATE_HELP}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                adding: false,
                added: false
            }


        // UPDATE A HELP
        case `${helpConstants.UPDATE_HELP}_REQUEST`:
            return state = {
                ...state,
                updating: true
            }
        case `${helpConstants.UPDATE_HELP}_SUCCESS`:
            return state = {
                ...state,
                adding: false,
                updated: true
            }
        case `${helpConstants.UPDATE_HELP}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                updating: false,
                updated: false
            }


        // DELETE ANSWER HELP
        case `${helpConstants.DELETE_HELP}_REQUEST`:
            return state = {
                ...state,
                deleting: true
            }
        case `${helpConstants.DELETE_HELP}_SUCCESS`:
            return state = {
                ...state,
                deleting: false,
                deleted: true
            }
        case `${helpConstants.DELETE_HELP}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                deleting: false,
                deleted: false
            }

        default:
            return state;
    }
}

export default helpReducer;