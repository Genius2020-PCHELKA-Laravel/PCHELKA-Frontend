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
            return { ...state, userDetails: action.payload };
        case 'edit_user_details':
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
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            var response = await requestApi.post('/details');
            setUserDetailsStorage(response.data.data);
            return response.data.data;
        } catch (err) {
            console.log("Error in UserContext: " + err)
        }

    }
}

const editUserDetails = dispatch => {
    return async ({ mobile, fullName, email, dateOfBirth, gender, language }) => {
        console.log({ mobile, fullName, email, dateOfBirth, gender, language });
        try {
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            const response = await requestApi.post('/userUpdate', { mobile, fullName, email, dateOfBirth, gender, language });
            //console.log(response);
            setUserDetailsStorage({ mobile, fullName, email, dateOfBirth, gender, language });
            return response.data.status;
        } catch (error) {
            console.error("error in edit user: " + error);
        }
    };
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
    { getUserDetails, editUserDetails, checkFullName },
    { checkname: '', userDetails: "", errorMessage: '', responsestatus: null }
);