import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { helpConstants } from '../constants';

export const getAllHelps = () => {
    return async (dispatch) => {

        dispatch({
            type: `${helpConstants.GET_ALL_HELP_DATA}_REQUEST`
        })

        const ref = firebase
            .firestore()
            .collection("helps")
            .orderBy("addedAt", "desc");

        ref.onSnapshot(async (snapshot) => {
            if (!snapshot.empty) {

                const fethcedData = await Promise.all(snapshot.docs
                    .map(async doc => {
                        const user = await doc.data().ownerId.get();
                        return ({
                            id: doc.id,
                            ...doc.data(),
                            userInfo: user.data()
                        })
                    }))

                dispatch({
                    type: `${helpConstants.GET_ALL_HELP_DATA}_SUCCESS`,
                    payload: { allData: fethcedData }
                })

            } else {
                dispatch({
                    type: `${helpConstants.GET_ALL_HELP_DATA}_SUCCESS`,
                    payload: { allData: [] }
                })
            }
        }, (error) => {
            dispatch({
                type: `${helpConstants.GET_ALL_HELP_DATA}_FAILURE`,
                payload: { error: error.message }
            })
            throw error;
        })
    }
}

export const createHelpQuestion = (data, uid) => {
    return async (dispatch) => {

        dispatch({
            type: `${helpConstants.CREATE_HELP}_REQUEST`
        })

        await firebase
            .firestore()
            .collection("helps")
            .add({
                ...data,
                ownerId: firebase.firestore().doc("users/" + uid),
                addedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                dispatch({
                    type: `${helpConstants.CREATE_HELP}_SUCCESS`
                })
            })
            .catch((error) => {
                dispatch({
                    type: `${helpConstants.CREATE_HELP}_FAILURE`,
                    payload: { error: error.message }
                })
                throw error;
            });
    }
}