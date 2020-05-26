import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../navigationRef';
import { setToken, getToken, removeToken } from '../../api/token';
import { getUserDetailsStorage, setUserDetailsStorage, removeUserDetailsStorage } from '../../api/userDetails';
const UserReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'get_user_details':
            console.log(action.payload.fullName);
            return { ...state, userDetails: action.payload };
        case 'update_mobile':
            return { ...state, mobile: action.payload };
        case 'check_full_name':
            return { ...state, checkname: action.payload };
        default:
            return state;
    }
};

const getUserDetails = dispatch => {
    return async () => {
        const senttoken = await getToken();
        // console.log("Sent Token details:>>>>>>>>>>>>>> " + senttoken);
        try {
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            var response = await requestApi.post('/details');
            await setUserDetailsStorage(response.data.data);
            await dispatch({ type: 'get_user_details', payload: response.data.data });
            console.log("User Context getUserDetails" + response.data.data.fullName);
            return response.data.data;
        } catch (err) {
            console.log("Error in UserContext: " + err)
        }
        // console.log("Token Before details>>>>>>>>>>>>>>" + senttoken);
        // dispatch({ type: 'get_user_details', payload: response.data.data.fullName });
        // console.log("Token After details>>>>>>>>>>>>>>>>" + await getToken() + "\n");

    }
}
const checkFullName = dispatch => {
    return async (mobile, redirect) => {
        const senttoken = await getToken();
        // requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
        console.log("Mobile in context" + mobile);
        const response = await requestApi.post('/checkFullName', { mobile }).then((response) => {
            console.log(response.data);
            dispatch({ type: 'check_full_name', payload: response.data.data });
            if (response.data.data == false)
                navigate('RegisterUserScreen', { redirect: redirect });
            else
                navigate(redirect);
        }).catch((error) => {
            console.log("User Context: catched: " + error)
        });
    }
}
export const { Context, Provider } = createDataContext(UserReducer,
    { getUserDetails, checkFullName },
    { mobile: '', checkname: '', userDetails: '', fullName: '', errorMessage: '', responsestatus: null }
);