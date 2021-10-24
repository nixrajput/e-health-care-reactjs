import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { authConstants } from '../constants/index';

export const registerUser = (data) => {

    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_SIGNUP}_REQUEST`
        })

        await firebase.auth()
            .createUserWithEmailAndPassword(data.email, data.pass)
            .then(async (result) => {
                const user = result.user;
                await user
                    .sendEmailVerification()
                    .then(async () => {
                        await firebase.firestore()
                            .collection('users')
                            .doc(user.uid)
                            .set({
                                uid: user.uid,
                                name: data.name,
                                email: user.email,
                                phone: data.phone,
                                is_admin: false,
                                dateJoined: firebase
                                    .firestore
                                    .FieldValue
                                    .serverTimestamp()
                            }).then(() => {
                                dispatch({
                                    type: `${authConstants.USER_SIGNUP}_SUCCESS`
                                })
                            })
                            .catch(async (err) => {

                                await firebase.auth().currentUser.delete();

                                dispatch({
                                    type: `${authConstants.USER_SIGNUP}_FAILURE`,
                                    payload: { error: err }
                                })
                                throw err;
                            })
                    })
                    .catch((err) => {
                        dispatch({
                            type: `${authConstants.USER_SIGNUP}_FAILURE`,
                            payload: { error: err }
                        })
                        throw err;
                    })
            })
            .catch((err) => {
                dispatch({
                    type: `${authConstants.USER_SIGNUP}_FAILURE`,
                    payload: { error: err }
                })
                throw err;
            });
    }
}

export const loginUser = (data) => {

    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_LOGIN}_REQUEST`
        })

        await firebase.auth()
            .signInWithEmailAndPassword(data.email, data.pass)
            .then(async (result) => {
                const user = result.user;
                const verified = await user.emailVerified;
                if (verified) {

                    const currentUser = {
                        uid: user.uid
                    }
                    localStorage.setItem(
                        'user',
                        JSON.stringify(currentUser)
                    );

                    dispatch({
                        type: `${authConstants.USER_LOGIN}_SUCCESS`,
                        payload: { user: currentUser }
                    })

                }
                else {
                    dispatch({
                        type: `${authConstants.USER_LOGIN}_FAILURE`,
                        payload: { error: "Your account is not verified." }
                    })
                    throw Error("Your account is not verified. Please verify your account to login.");
                }

            })
            .catch((err) => {
                dispatch({
                    type: `${authConstants.USER_LOGIN}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })
    }
}

export const signUpWithGoogle = () => {
    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_GOOGLE_SIGN_UP}_REQUEST`
        })

        const googleProvider = new firebase.auth.GoogleAuthProvider();
        const userRef = firebase.firestore().collection("users");

        await firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then(async (result) => {
                const user = result.user;

                await userRef
                    .doc(user.uid)
                    .get()
                    .then(async (snapshot) => {
                        if (snapshot.exists) {
                            const currentUser = {
                                uid: user.uid
                            }

                            localStorage.setItem(
                                'user',
                                JSON.stringify(currentUser)
                            );

                            dispatch({
                                type: `${authConstants.USER_GOOGLE_SIGN_IN}_SUCCESS`,
                                payload: { user: currentUser }
                            })
                        }
                        else {
                            await userRef
                                .doc(user.uid)
                                .set({
                                    uid: user.uid,
                                    name: user.displayName,
                                    email: user.email,
                                    phone: user.phoneNumber,
                                    is_admin: false, dateJoined: firebase
                                        .firestore
                                        .FieldValue
                                        .serverTimestamp()
                                }).then(() => {
                                    dispatch({
                                        type: `${authConstants.USER_GOOGLE_SIGN_UP}_SUCCESS`
                                    })
                                    const currentUser = {
                                        uid: user.uid
                                    }

                                    localStorage.setItem(
                                        'user',
                                        JSON.stringify(currentUser)
                                    );

                                    dispatch({
                                        type: `${authConstants.USER_GOOGLE_SIGN_IN}_SUCCESS`,
                                        payload: { user: currentUser }
                                    })
                                })
                                .catch(async (err) => {

                                    await firebase.auth().currentUser.delete();

                                    dispatch({
                                        type: `${authConstants.USER_GOOGLE_SIGN_UP}_FAILURE`,
                                        payload: { error: err }
                                    })
                                    throw err;
                                })
                        }
                    })
            })
            .catch((err) => {
                dispatch({
                    type: `${authConstants.USER_GOOGLE_SIGN_UP}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })

    }
}

export const signInWithGoogle = () => {
    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_GOOGLE_SIGN_IN}_REQUEST`
        })

        const googleProvider = new firebase.auth.GoogleAuthProvider();

        await firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then(async (result) => {
                const user = result.user;

                await firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .get()
                    .then(async (snapshot) => {
                        if (snapshot.exists) {

                            const currentUser = {
                                uid: user.uid
                            }

                            localStorage.setItem(
                                'user',
                                JSON.stringify(currentUser)
                            );

                            dispatch({
                                type: `${authConstants.USER_GOOGLE_SIGN_IN}_SUCCESS`,
                                payload: { user: currentUser }
                            })
                        }
                        else {
                            await firebase.auth().currentUser.delete();

                            dispatch({
                                type: `${authConstants.USER_GOOGLE_SIGN_IN}_FAILURE`,
                                payload: { error: "This email address is not registered. Please register the email address first and then try again." }
                            })

                            throw Error("This email address is not registered. Please register the email address first and then try again.");
                        }
                    })

            })
            .catch((err) => {
                dispatch({
                    type: `${authConstants.USER_GOOGLE_SIGN_IN}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })

    }
}

export const logoutUser = () => {
    return async (dispatch) => {

        localStorage.removeItem('user');
        await firebase.auth().signOut();

        dispatch({
            type: `${authConstants.USER_LOGGED_OUT}_SUCCESS`
        })
    }
}

export const getCurrentUser = () => {
    return async (dispatch) => {
        dispatch({
            type: `${authConstants.USER_LOGIN}_REQUEST`
        })

        let currentUser = {};

        const user = localStorage.getItem('user') ?
            JSON.parse(localStorage.getItem('user')) :
            null

        if (user) {
            currentUser = {
                uid: user['uid']
            }
            dispatch({
                type: `${authConstants.AUTO_LOGGED_IN}_SUCCESS`,
                payload: { user: currentUser }
            })
        }
        else {
            dispatch({
                type: `${authConstants.USER_LOGGED_OUT}_SUCCESS`
            })
        }
        return currentUser;
    }
}

export const sendPasswordRestEmail = (email) => {
    return async (dispatch) => {
        dispatch({
            type: `${authConstants.PASSWORD_RESET_EMAIL}_REQUEST`
        })

        await firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                dispatch({
                    type: `${authConstants.PASSWORD_RESET_EMAIL}_SUCCESS`
                })
            }).catch((err) => {
                dispatch({
                    type: `${authConstants.PASSWORD_RESET_EMAIL}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            });
    }
}