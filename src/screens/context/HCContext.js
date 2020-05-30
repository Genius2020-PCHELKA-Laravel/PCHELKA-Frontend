import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../navigationRef';

import { setToken, getToken, removeToken } from '../../api/token';
const HCreducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'set_services':
            return { ...state, services: action.payload };
        case 'update_totals':
            return { ...state, discount: action.payload.discount, subtotal: action.payload.subtotal, total: action.payload.total };
        case 'set_frequency':
            return { ...state, frequency: action.payload };
        case 'set_hc':
            return { ...state, HC: action.payload };
        case 'set_hours':
            return { ...state, hours: action.payload };
        case 'set_cleaners':
            return { ...state, cleaners: action.payload };
        case 'set_materials':
            return { ...state, materials: action.payload };
        case 'set_desc':
            return { ...state, desc: action.payload };
        case 'set_selectedday':
            return { ...state, selectedday: action.payload };
        case 'set_selectedprovider':
            return { ...state, selectedprovider: action.payload };
        case 'set_fulldate':
            return { ...state, full_date: action.payload.full_date };
        case 'set_start':
            return { ...state, start: action.payload };
        case 'update_addresses':
            return { ...state, addresses: action.payload };
        case 'set_method':
            return { ...state, method: action.payload };
        case 'loader':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};
const getServices = (dispatch) => {
    return async () => {
        try {
            const response = await requestApi.get('/service');
            dispatch({ type: 'set_services', payload: response.data.data });
            return response.data.data;
        } catch (err) {
            console.log("Error::HCContex::getservices" + err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}
const setHC = (dispatch) => {
    return async (HCDetails) => {
        try {
            // console.log("####################");
            // console.log(HCDetails);
            dispatch({ type: 'set_hc', payload: HCDetails });
        } catch (err) {
            console.log("HCContex::setHC::" + err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}

const HCBooking = dispatch => {
    return async ({
        serviceType,
        duoDate,
        duoTime,
        subTotal,
        discount,
        totalAmount,
        locationId,
        providerId,
        scheduleId,
        paymentWays,
        frequency,
        answers
    }) => {
        try {
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            const response = await requestApi.post('/booking', {
                serviceType,
                duoDate,
                duoTime,
                subTotal,
                discount,
                totalAmount,
                locationId,
                providerId,
                scheduleId,
                paymentWays,
                frequency,
                answers
            }).then((response) => {
                console.log("HCBooking::HCCContext" + response.data);
                if (response.data.status == true)
                    console.log("Booked");
                else
                    console.log(response.data.error);
            }).catch((error) => {
                console.log("Error::NotBooked::HCBooking: " + error)
            });
        } catch (err) {
            console.log("Error: HC Booking          " + err)
        }
    }
}
export const { Context, Provider } = createDataContext(HCreducer,
    {
        getServices,
        setHC,
        HCBooking
    },
    {
        services: [],
        HC: '',
        subtotal: 0,
        discount: 0,
        VAT: 0,
        total: 0,
        errorMessage: '',
        loading: false,
        frequency: 1,
        hours: 2,
        cleaners: 1,
        materials: 0,
        requirematerials: 'No',
        desc: '',
        selectedprovider: '',
        selectedday: '',
        full_date: '',
        start: '',
        method: '',
        addresses: '',
    }
);