import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { userDataConstants } from '../constants/index';

export const getcurrentUserData = (uid) => {
    return async (dispatch) => {

        dispatch({
            type: `${userDataConstants.GET_USER_DATA}_REQUEST`
        })

        await firebase.firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then(async (snapshot) => {
                const data = snapshot.data();

                dispatch({
                    type: `${userDataConstants.GET_USER_DATA}_SUCCESS`,
                    payload: { currentUser: data }
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${userDataConstants.GET_USER_DATA}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })
    }
}

export const checkIsProfileCompleteStepOne = (uid) => {
    return async (dispatch) => {

        let isProfileCompleteStepOne = false;

        dispatch({
            type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_REQUEST`
        })

        await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                const data = snapshot.data();

                if (data.is_hospital === true ||
                    data.is_hospital === false ||
                    data.is_hospital !== undefined) {
                    isProfileCompleteStepOne = true;
                }
                else {
                    isProfileCompleteStepOne = false;
                }

                dispatch({
                    type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_SUCCESS`,
                    payload: { isProfileCompleteStepOne: isProfileCompleteStepOne }
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })

    }
}

export const checkIsProfileCompleteStepTwo = (uid) => {
    return async (dispatch) => {

        let isProfileCompleteStepTwo = false;

        dispatch({
            type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_REQUEST`
        })

        await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                const data = snapshot.data();

                if (data.is_hospital === true) {
                    if (data.name && data.phone &&
                        data.age && data.gender && data.designation &&
                        data.instituteName && data.location) {
                        isProfileCompleteStepTwo = true;
                    }
                    else {
                        isProfileCompleteStepTwo = false;
                    }
                }
                else {
                    if (data.name && data.phone &&
                        data.age && data.gender && data.location) {
                        isProfileCompleteStepTwo = true;
                    }
                    else {
                        isProfileCompleteStepTwo = false;
                    }
                }

                dispatch({
                    type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_SUCCESS`,
                    payload: { isProfileCompleteStepTwo: isProfileCompleteStepTwo }
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })

    }
}

export const getCustomUserData = (uid) => {
    return async (dispatch) => {

        dispatch({
            type: `${userDataConstants.GET_CUSTOM_USER_DATA}_REQUEST`
        })

        await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                const data = snapshot.data();
                dispatch({
                    type: `${userDataConstants.GET_CUSTOM_USER_DATA}_SUCCESS`,
                    payload: { customUser: data }
                })
            }).catch((err) => {
                dispatch({
                    type: `${userDataConstants.GET_CUSTOM_USER_DATA}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })
    }
}

export const updateUserProfile = (uid, data) => {
    return async (dispatch) => {

        dispatch({
            type: `${userDataConstants.UPDATE_USER_DATA}_REQUEST`
        })

        await firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                dispatch({
                    type: `${userDataConstants.UPDATE_USER_DATA}_SUCCESS`
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${userDataConstants.UPDATE_USER_DATA}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            });


    }
}