import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../NavigationRef';
import { setToken, getToken, removeToken } from '../../api/token'
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
            return { ...state, responsestatus: action.payload.status };
        default:
            return state;
    }
};
const sendsms = dispach => {
    return async ({ mobile, otp }) => {
        //make api request to singup and ask for verify number
        try {
            const response = await requestApi.post('/sendsms', { mobile, otp });
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
            dispach({ type: 'add_error', payload: 'something went wrong with sign up' })
        }

    };
}
const verifysms = dispach => {
    return async ({ mobile, enteredotp, otp }) => {
        console.log({ enteredotp, otp, mobile });
        try {
            console.log('before verify sms>>>>>>>>>>');
            const response = await requestApi.post('/verifysmscode', { enteredotp, otp, mobile });
            console.log(response.data);
            v = response.data.data.token;
            console.log('after verify sms>>>>>>>>>>');
            console.log(v);
            //await AsyncStorage.setItem('token', response.data.data.token);
            setToken(v);
            console.log(getToken());
            //dispach({ type: 'sendsms', payload: response.data.data.token });
            //  navigate('LogIn');

        }
        catch (err) {
            console.log("errrror:" + err);
            dispach({ type: 'add_error', payload: 'something went wrong with sign up' })
        }
    };
}
const logout = dispach => {
    return async () => {
        const senttoken = await getToken();
        console.log("Sent Token:>>>>>>>>>>>>>> " + senttoken);
        requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;

        const response = await requestApi.post('/logout');
        console.log(response.data);
        console.log("Token Before logout>>>>>>>>>>>>>>" + senttoken);
        await removeToken();
        dispach({ type: 'logout' });
        console.log("Token After logout>>>>>>>>>>>>>>>>" + await getToken() + "\n");
    };
}



const register = dispach => {
    return async ({ fullName, email, dateOfBirth, gender, language }) => {
        const senttoken = await getToken();
        console.log("Register Sent Token:>>>>>>>>>>>>>> " + senttoken);
        requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;

        var response = await requestApi.post('/register', { fullName, email, dateOfBirth, gender, language });
        // .then(res => {
        // Return something
        dispach({ type: 'register', payload: response.data });
        // return true;
        //   }).catch((error) => { });;
        //console.log(this.state);
        return response.data;
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
    { sendsms, logout, verifysms, register },
    { token: null, errorMessage: '', responsestatus: null }
);