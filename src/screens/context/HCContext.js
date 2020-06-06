import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../../navigationRef';
import Toast from 'react-native-simple-toast';

import { setToken, getToken, removeToken } from '../../api/token';

const HCreducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'set_services':
            return { ...state, services: action.payload };
        case 'set_providers':
            return { ...state, providers: action.payload };
        // case 'set_schedules_days':
        //     return { ...state, schedulesdays: action.payload };
        case 'set_schedules':
            return { ...state, schedules: action.payload };
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
        // case 'reset_selectedday':
        //     return { ...state, selectedday: action.payload };
        // case 'reset_start':
        //     return { ...state, selectedday: action.payload };
        case 'set_providerid':
            return { ...state, providerid: action.payload };
        case 'set_autoassign':
            return { ...state, autoassign: action.payload };
        // case 'set_fulldate':
        //     return { ...state, full_date: action.payload.full_date };
        case 'set_start':
            return { ...state, start: action.payload };
        case 'set_method':
            return { ...state, method: action.payload };
        case 'set_order_id':
            return { ...state, order_id: action.payload };
        case 'set_card':
            return { ...state, card: action.payload };
        case 'set_card_exp_month':
            return { ...state, card_exp_month: action.payload };
        case 'set_card_exp_year':
            return { ...state, card_exp_year: action.payload };
        case 'set_card_cvv':
            return { ...state, card_cvv: action.payload };

        case 'set_valid':
            return { ...state, valid: action.payload };
        case 'set_upcoming':
            return { ...state, upcoming: action.payload };
        case 'set_past':
            return { ...state, past: action.payload };
        case 'set_reloadappoitments':
            return { ...state, reloadAppointments: action.payload };
        case 'set_selected_upcoming':
            return { ...state, selectedupcoming: action.payload };

        case "RESET":
            return {
                ...state,
                providerid: '',
                autoassign: 1,
                subtotal: 0,
                discount: 0,
                VAT: 0,
                total: 0,
                errorMessage: '',
                frequency: 1,
                hours: 2,
                cleaners: 1,
                materials: 0,
                requirematerials: 'No',
                desc: '',
                selectedday: '',
                // full_date: '',
                start: '',
                method: -1,
                order_id: '',
                card: '',
                card_exp_month: '',
                card_exp_year: '',
                card_cvv: '',
                valid: '',
                upcoming: [],
                past: [],
                reloadAppointments: '',
                selectedupcoming: {},
            };
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
const getProviders = (dispatch) => {
    return async ({ serviceType }) => {
        try {
            const response = await requestApi.post('/providers', { serviceType });
            dispatch({ type: 'set_providers', payload: response.data.data });
            console.log(response)
            return response.data.data;
        } catch (err) {
            console.log("Error::HCContex::getProviders" + err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}

//from belal
// const getSchedulesDays = (dispatch) => {
//     return async ({ id }) => {
//         try {
//             const response = await requestApi.post('/schedulesDays', { id });
//             const availabledates = [];
//             response.data.data.map((u, i) => {
//                 availabledates[i] = u.availableDate;
//             });
//             dispatch({ type: 'set_schedules_days', payload: availabledates });
//             return response.data.data;
//         } catch (err) {
//             console.log("Error::HCContex::getScheduledays" + err);
//             dispatch({ type: 'add_error', payload: err })
//         }
//     };
// }
//from maher
const getSchedules = (dispatch) => {
    return async () => {
        try {
            const response = await requestApi.get('/getSchedules');
            //console.log(_.filter(schedules, { serviceProviderId: 1, availableDate: "2020-05-31" }))
            dispatch({ type: 'set_schedules', payload: response.data.data });
            return response.data.data;
        } catch (err) {
            console.log("Error::HCContex::getSchedules" + err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}


const setHC = (dispatch) => {
    return async (HCDetails) => {
        try {
            dispatch({ type: 'set_hc', payload: HCDetails });
        } catch (err) {
            console.log("HCContex::setHC::" + err);
            dispatch({ type: 'add_error', payload: err })
        }
    };
}


const pay = (dispatch) => {
    return async ({ order_id, card, card_exp_month, card_exp_year, card_cvv, amount, description }) => {
        try {
            console.log('{ order_id, card, card_exp_month, card_exp_year, card_cvv, amount, description }');
            console.log({ order_id, card, card_exp_month, card_exp_year, card_cvv, amount, description });
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            var result = await requestApi.post('/pay',
                { order_id, card, card_exp_month, card_exp_year, card_cvv, amount, description });
            // console.log("pay::HCCContext" + result);
            return result;
            // .then((response) => {
            // console.log("pay::HCCContext" + JSON.stringify(response.data.data));

            // if (response.data.data.result == 'ok') {
            //     console.log("result: ok, status:success");
            //     Toast.show("Payment result: " + response.data.data.result + "\n Payment status: " + response.data.data.status, Toast.LONG);
            //     return true;
            // }
            // else if (response.data.data.result == 'error') {
            //     Toast.show("Payment result: " + response.data.data.result + "\n Payment status: " + response.data.data.status + "\n Error: " + response.data.data.err_description, Toast.LONG);
            //     return false;
            // }
            // }).catch((error) => {
            //     console.log("Error::NotPaid::HCBooking: " + error);
            //     Toast.show("Not completed payment", Toast.LONG);
            //     return false;
            // });
        } catch (err) {
            console.log("Error::HCContex::pay::" + err);
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
                dispatch({ type: 'set_reloadappoitments', payload: 1 })
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


const getUpcoming = (dispatch) => {
    return async () => {
        try {
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            var result = await requestApi.get('/upComingBooking');
            // console.log("getUpcoming::HCCContext" + result.data.data);
            if (result.data.status) {
                dispatch({ type: 'set_upcoming', payload: result.data.data });
                return result.data.data;
            }
            else
                Toast.show(result.data.error, Toast.LONG);

        } catch (err) {
            console.log("Error::HCContex::upComingBooking::" + err);
            dispatch({ type: 'add_error', payload: err });
        }
    };
}
const getPast = (dispatch) => {
    return async () => {
        try {
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            var result = await requestApi.get('/pastBooking');
            console.log("pastBooking::HCCContext" + result.data.data);
            if (result.data.status) {
                dispatch({ type: 'set_past', payload: result.data.data });
                return result.data.data;
            }
            else
                Toast.show(result.data.error, Toast.LONG);
        } catch (err) {
            console.log("Error::HCContex::pastBooking::" + err);
            dispatch({ type: 'add_error', payload: err })
        }

    };
}
const getSelectedUpcoming = (dispatch) => {
    return async ({ id }) => {
        try {
            const senttoken = await getToken();
            requestApi.defaults.headers.common['Authorization'] = 'Bearer ' + senttoken;
            var result = await requestApi.post('/getBookingById', { id });
            console.log("getselectedUpcoming::HCCContext:  " + JSON.stringify(result.data.data));
            if (result.data.status) {
                dispatch({ type: 'set_selected_upcoming', payload: result.data.data });
                return result.data.data;
            }
            else
                Toast.show(result.data.error, Toast.LONG);
        } catch (err) {
            console.log("Error::HCContex::selectedupComing::" + err);
            dispatch({ type: 'add_error', payload: err });
        }
    };
}
export const { Context, Provider } = createDataContext(HCreducer,
    {
        getServices,
        setHC,
        HCBooking,
        getProviders,
        // getSchedulesDays,
        getSchedules,
        pay,
        getUpcoming,
        getPast,
        getSelectedUpcoming,
    },
    {
        services: [],
        providers: [],
        //schedulesdays: [],
        schedules: [],
        HC: '',
        providerid: '',
        autoassign: 1,
        subtotal: 0,
        discount: 0,
        VAT: 0,
        total: 0,
        errorMessage: '',
        frequency: 1,
        hours: 2,
        cleaners: 1,
        materials: 0,
        requirematerials: 'No',
        desc: '',
        selectedday: '',
        // full_date: '',
        start: '',
        method: -1,
        order_id: '',
        card: '',
        card_exp_month: '',
        card_exp_year: '',
        card_cvv: '',
        valid: '',
        upcoming: [],
        past: [],
        reloadAppointments: '',
        selectedupcoming: {},
    }
);