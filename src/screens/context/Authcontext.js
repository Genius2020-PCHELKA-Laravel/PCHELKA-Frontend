import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../navigationRef';

import { setToken, getToken, removeToken } from '../../api/token';
const initialstate = { loading: false, token: null, errorMessage: '', responsestatus: null };
const authreducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'sendsms':
            return { errorMessage: '', token: action.payload };
        case 'logout':
            return { token: 'undefined', errorMessage: '' };
        case 'register':
            //console.log(action.payload);
            return { ...state, responsestatus: action.payload };
        case 'loader':
            return { ...state, loading: action.payload };
        case "RESET":
            return initialState;
        default:
            throw new Error(`Not supported action ${action.type}`);
    }
};
const sendsms = dispatch => {
    return async ({ mobile, otp }) => {
        //make api request to singup and ask for verify number
        try {
            const response = await requestApi.post('/sendsms', { mobile, otp });
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
            await dispatch({ type: 'add_error', payload: 'something went wrong with sign up' })
        }

    };
}
const verifysms = dispatch => {
    return async ({ mobile, enteredotp, otp }) => {
        console.log({ enteredotp, otp, mobile });
        try {
            console.log('before verify sms>>>>>>>>>>');
            const response = await requestApi.post('/verifysmscode', { enteredotp, otp, mobile });
            console.log(response.data);
            let v = response.data.data.token;
            console.log('after verify sms>>>>>>>>>>');
            console.log(v);
            //await AsyncStorage.setItem('token', response.data.data.token);
            await setToken(v);
            console.log(getToken());
            //dispatch({ type: 'sendsms', payload: response.data.data.token });
            //  navigate('LogIn');

        }
        catch (err) {
            console.log("errrror:" + err);
            dispatch({ type: 'add_error', payload: 'something went wrong with sign up' })
        }
    };
}
const logout = (dispatch) => {
    return async () => {
        try {
            const senttoken = await getToken();
            console.log("Sent Token:>>>>>>>>>>>>>> " + senttoken);
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;

            const response = await requestApi.post('/logout');
            console.log(response.data);
            console.log("Token Before logout>>>>>>>>>>>>>>" + senttoken);
            await removeToken();
            await dispatch({ type: 'logout' });
            console.log("Token After logout>>>>>>>>>>>>>>>>" + await getToken() + "\n");
            navigate('HomeScreenLogIn');
        } catch (err) {
            console.log("Logout func: " + err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}

const login = (dispatch) => {
    return async () => {
        try {
            console.log("Login Screen:>>>>>>>>>>>>>> ");
            // dispatch({ type: 'logout' });
            navigate('LoginPhoneScreen', { redirect: 'Dashboard' });
        } catch (err) {
            console.log(err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}

const register = dispatch => {
    return async ({ fullName, email, language, address, lat, lon, details, area, street, buildingNumber, apartment }) => {
        console.log({ fullName, email, language, address, lat, lon, details, area, street, buildingNumber, apartment });
        try {
            await dispatch({ type: 'loader', payload: true });
            const senttoken = await getToken();
            console.log("Register Sent Token:>>>>>>>>>>>>>> " + senttoken);
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            const response = await requestApi.post('/register', { fullName, email, language, address, lat, lon, details, area, street, buildingNumber, apartment });
            console.log("response in context register Auth Context>>>>>>>>>>>>>>>>" + response.data.status);
            await dispatch({ type: 'register', payload: response.data.status });
            if (response.data.status == true)
                await dispatch({ type: 'loader', payload: false });
            return response.data.status;
        } catch (error) {
            await dispatch({ type: 'loader', payload: false });
            console.error("error in registration: " + error);
        }
        // .then(res => {
        // Return something

        // return true;
        //   }).catch((error) => { });;
        //console.log(this.state);
        // return response.data;
    };
}


/*
const getservices=dispach=>{
    return async()=>{
        const response= await requestApi.get('/service');
        console.log(response.data);
    };
}*/
export const { Context, Provider } = createDataContext(authreducer,
    { sendsms, logout, verifysms, register, login },
    { loading: false, token: null, errorMessage: '', responsestatus: null }
);