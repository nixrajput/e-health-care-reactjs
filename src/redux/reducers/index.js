import { combineReducers } from 'redux';
import snackbarReducer from './snackbar.reducer';
import authReducer from './auth.reducer';
import userDataReducer from './userData.reducer';
import helpReducer from './help.reducer';

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    auth: authReducer,
    userData: userDataReducer,
    help: helpReducer
})

export default rootReducer;