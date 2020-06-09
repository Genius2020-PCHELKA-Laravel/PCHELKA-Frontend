import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../navigationRef';
import { setToken, getToken, removeToken } from '../../api/token';

const UserReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'set_user_details':
            return { ...state, userDetails: action.payload };
        case 'edit_user_details':
            return { ...state, userDetails: action.payload };
        // case 'add_new_address':
        //     return { ...state, addresses: [action.payload, ...state.addresses] };
        case 'add_new_address':
            return { ...state, addresses: [...state.addresses, action.payload] };
        case 'set_user_addresses':
            return { ...state, addresses: action.payload };
        case 'set_user_addresses_loaded':
            return { ...state, addressesloaded: action.payload };

        case 'update_mobile':
            return { ...state, mobile: action.payload };
        case 'set_full_name':
            return { ...state, fullname: action.payload };
        case 'check_full_name':
            return { ...state, checkname: action.payload };
        case 'set_selected_address':
            return { ...state, selected_address: action.payload };
        case 'set_selected_address_name':
            return { ...state, selected_address_name: action.payload };
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
            dispatch({ type: 'set_user_details', payload: response.data.data });
            //dispatch({ type: 'set_full_name', payload: response.data.data.fullName });
            //setUserDetailsStorage(response.data.data);
            return response.data.data;
        } catch (err) {
            console.log("Error in UserContext: " + err)
        }

    }
}
//get the addresses and save locally
const getUserAddresses = dispatch => {
    return async () => {
        try {
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            var response = await requestApi.get('/userLocation');
            //setUserAddressesStorage(response.data.data);
            return response.data.data;
        } catch (err) {
            console.log("Error in UserContext: " + err)
        }

    }
}
const editUserDetails = dispatch => {
    return async ({ mobile, fullName, email, dateOfBirth, gender, language }) => {
        //console.log({ mobile, fullName, email, dateOfBirth, gender, language });
        try {
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            const response = await requestApi.post('/userUpdate', { mobile, fullName, email, dateOfBirth, gender, language });
            return response.data;
        } catch (error) {
            console.error("error in edit user: " + error);
        }
    };
}
//save from Map after confirm and select location
const addNewAddress = dispatch => {
    return async ({ address, lat, lon, details, area, street, buildingNumber, apartment }) => {
        //console.log({ address, lat, lon, details, area, street, buildingNumber, apartment });
        try {
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            const response = await requestApi.post('/userLocation', { address, lat, lon, details, area, street, buildingNumber, apartment });
            var id = response.data.data.locationId;
            dispatch({ type: 'add_new_address', payload: { id, address, lat, lon, details, area, street, buildingNumber, apartment } });
            dispatch({ type: 'set_selected_address_name', payload: address });
            dispatch({ type: 'set_selected_address', payload: id });
            console.log("User Context::addNewAddress::response");
            console.log(response);
            return response.data.status;
        } catch (error) {
            console.error("Error::UserContext::addNewAddress:: " + error);
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
            console.log("UserContext::checkFullName:: " + error)
        });
    }
}
export const { Context, Provider } = createDataContext(UserReducer,
    {
        getUserDetails,
        editUserDetails,
        checkFullName,
        addNewAddress,
        getUserAddresses
    },
    {
        addresses: [],
        addressesloaded: false,
        fullname: '',
        checkname: '',
        userDetails: "",
        errorMessage: '',
        responsestatus: null,
        selected_address_name: '',
        selected_address: ''
    }
);