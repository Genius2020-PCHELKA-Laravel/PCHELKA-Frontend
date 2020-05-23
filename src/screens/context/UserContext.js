import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../navigationRef';
import { setToken, getToken, removeToken } from '../../api/token';
const UserReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'get_user_details':
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
        try {
            const senttoken = await getToken();
            console.log("Sent Token details:>>>>>>>>>>>>>> " + senttoken);
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;

            const response = await requestApi.post('/details');
            console.log(response.data);
            console.log("Token Before details>>>>>>>>>>>>>>" + senttoken);
            // dispatch({ type: 'get_user_details', payload: response.data.data.fullName });
            dispatch({ type: 'get_user_details', payload: response.data.data });
            console.log("Token After details>>>>>>>>>>>>>>>>" + await getToken() + "\n");
        } catch (err) {
            console.log("Details           " + err);
        }
    }
}
const checkFullName = dispatch => {
    return async (mobile) => {
        try {
            const senttoken = await getToken();
            // requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            console.log("Mobile in context" + mobile);
            const response = await requestApi.post('/checkFullName', { mobile }).then((res) => {
                console.log(res.data);
                dispatch({ type: 'check_full_name', payload: res.data.data });
                if (res.data.data == false)
                    navigate('Register');
                else
                    navigate('HomeCleaningScreen');
            }).catch((error) => {
                console.log("catched: " + error)
            });
        } catch (err) {
            console.log("check full name           " + err)
        }
    }
}
export const { Context, Provider } = createDataContext(UserReducer,
    { getUserDetails, checkFullName },
    { mobile: '', checkname: '', userDetails: null, errorMessage: '', responsestatus: null }
);