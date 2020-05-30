import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../navigationRef';
import { setToken, getToken, removeToken } from '../../api/token';
const LocationReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'set_coord':
            return { ...state, coord: action.payload };
        default:
            return state;
    }
};




export const { Context, Provider } = createDataContext(UserReducer,
    {},
    { long: 0, lat: 0 }
);