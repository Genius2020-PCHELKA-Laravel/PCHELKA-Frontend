import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../navigationRef';

import { setToken, getToken, removeToken } from '../../api/token';
const HCreducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'update_totals':
            return { ...state, subtotal: action.payload.subtotal, total: action.payload.total };
        case 'set_frequency':
            return { ...state, frequency: action.payload };
        case 'set_hours':
            return { ...state, hours: action.payload };
        case 'set_cleaners':
            return { ...state, cleaners: action.payload };
        case 'set_materials':
            return { ...state, materials: action.payload };
        case 'set_desc':
            return { ...state, desc: action.payload };
        case 'get_Addresses':
            return { ...state };
        case 'loader':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};
const getprice = (dispatch) => {
    return async () => {
        try {
            console.log(">>>>>>>>");
            // const senttoken = await getToken();
            //requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            //const response = await requestApi.post('/logout');
            dispatch({ type: 'get_price', payload: computed });
        } catch (err) {
            console.log(err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}

const getAddresses = (dispatch) => {
    return async () => {
        try {
            console.log(">>>>>>>>");
            // const senttoken = await getToken();
            //requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            //const response = await requestApi.post('/logout');
            dispatch({ type: 'get_addresses' });
        } catch (err) {
            console.log(err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}
export const { Context, Provider } = createDataContext(HCreducer,
    { getprice },
    { price: 100, subtotal: 0, VAT: 0, total: 0, errorMessage: '', loader: false, frequency: 'One-time', hours: 2, cleaners: 1, materials: 0, requirematerials: 'No', desc: '' }
);