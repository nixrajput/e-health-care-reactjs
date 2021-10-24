import { userDataConstants } from '../constants'

const initState = {
    currentUser: {},
    customUser: {},
    isProfileCompleteStepOne: false,
    isProfileCompleteStepTwo: false,
    checkingProfileStepOne: false,
    checkedProfileStepOne: false,
    checkingProfileStepTwo: false,
    checkedProfileStepTwo: false,
    fetching: false,
    fetched: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    error: null,
}

const userDataReducer = (state = initState, action) => {
    switch (action.type) {
        // GET CURRENT USER DATA
        case `${userDataConstants.GET_USER_DATA}_REQUEST`:
            return state = {
                ...state,
                fetching: true
            }
        case `${userDataConstants.GET_USER_DATA}_SUCCESS`:
            return state = {
                ...state,
                currentUser: action.payload.currentUser,
                fetched: true,
                fetching: false
            }
        case `${userDataConstants.GET_USER_DATA}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                fetched: false,
                fetching: false
            }

        // GET CUSTOM USER DATA
        case `${userDataConstants.GET_CUSTOM_USER_DATA}_REQUEST`:
            return state = {
                ...state,
                fetching: true
            }
        case `${userDataConstants.GET_CUSTOM_USER_DATA}_SUCCESS`:
            return state = {
                ...state,
                customUser: action.payload.customUser,
                fetched: true,
                fetching: false
            }
        case `${userDataConstants.GET_CUSTOM_USER_DATA}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                fetched: false,
                fetching: false
            }

        // CHECK IF PROFILE COMPLETE STEP ONE
        case `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_REQUEST`:
            return state = {
                ...state,
                checkingProfileStepOne: true
            }
        case `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_SUCCESS`:
            return state = {
                ...state,
                isProfileCompleteStepOne: action.payload.isProfileCompleteStepOne,
                checkingProfileStepOne: false,
                checkedProfileStepOne: true
            }
        case `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                checkingProfileStepOne: false,
                checkedProfileStepOne: false
            }

        // CHECK IF PROFILE COMPLETE STEP TWO
        case `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_REQUEST`:
            return state = {
                ...state,
                checkingProfileStepTwo: true
            }
        case `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_SUCCESS`:
            return state = {
                ...state,
                isProfileCompleteStepTwo: action.payload.isProfileCompleteStepTwo,
                checkingProfileStepTwo: false,
                checkedProfileStepTwo: true
            }
        case `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                checkingProfileStepTwo: false,
                checkedProfileStepTwo: true
            }

        // UPDATE CURRENT USER DATA
        case `${userDataConstants.UPDATE_USER_DATA}_REQUEST`:
            return state = {
                ...state,
                updating: true
            }
        case `${userDataConstants.UPDATE_USER_DATA}_SUCCESS`:
            return state = {
                ...state,
                updating: false,
                updated: true,
            }
        case `${userDataConstants.UPDATE_USER_DATA}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                updating: false,
                updated: false,
            }

        default:
            return state;
    }
}

export default userDataReducer;