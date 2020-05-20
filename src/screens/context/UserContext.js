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
            return { ...state, name: action.payload };
        default:
            return state;
    }
};

const getUserDetails = dispatch => {
    return async () => {
        const senttoken = await getToken();
        console.log("Sent Token details:>>>>>>>>>>>>>> " + senttoken);
        requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;

        const response = await requestApi.post('/details');
        console.log(response.data);
        console.log("Token Before details>>>>>>>>>>>>>>" + senttoken);
        dispatch({ type: 'get_user_details', payload: response.data.data.fullName });
        console.log("Token After details>>>>>>>>>>>>>>>>" + await getToken() + "\n");
        return response.data.data.fullName;
    };
}





export const { Context, Provider } = createDataContext(UserReducer,
    { getUserDetails },
    { name: null, errorMessage: '', responsestatus: null }
);