import createDataContext from "./createDataContext";
import tracker from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signin':
            return { errorMessage: '', token: action.payload }
        case 'clear_error':
            return { ...state, errorMessage: '' }
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state;
    }
}

//this syntax is the same as making the return statment it is just more clean code

const tryLocalSignin = dispatch = async () => {
   try {
        const token = await AsyncStorage.getItem('token');

        if(token){
            dispatch({
                type: 'signin',
                payload: token
            });

            navigate('mainFlow')
        } else {
            navigate('loginFlow')
        }
   } catch(err) {
    console.log(err)
   }
}

const clearErrorMessage = dispatch => () => {
    dispatch({
        type: 'clear_error'
    })
}

const signup = dispatch => async ({ email, password }) => {
    try {
        const response = await tracker.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        
        navigate('mainFlow');
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'add_error', payload: error.response.data.error })
    }

}

const signin = dispatch => async ({ email, password }) => {
    try {
        const response = await tracker.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({
            type: 'signin',
            payload: response.data.token
        })

        navigate('mainFlow')
    } catch (error) {
        console.log(error.response.data.error)
        console.log("confused ")
        dispatch({
            type: 'add_error',
            payload: error.response.data.error
        })
    }
}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({
        type: 'signout'
    })
    navigate('loginFlow')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
)