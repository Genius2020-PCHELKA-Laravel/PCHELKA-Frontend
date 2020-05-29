import { AsyncStorage } from "react-native";

export const getRedirect = async () => {
    try {
        const value = await AsyncStorage.getItem('pchelka.org@redirect');
        if (value !== null) {
            console.log("get redirect");
            console.log(value);
            return value;
        }
    } catch (e) {
        return null;
    }
};

export const setRedirect = async (redirect) => {
    try {
        await AsyncStorage.setItem('pchelka.org@redirect', redirect);
        console.log("set redirect");
        console.log(redirect);
    } catch (e) {
        return null;
    }
};

export const removeRedirect = async (redirect) => {
    try {
        await AsyncStorage.removeItem('pchelka.org@redirect');
    } catch (e) {
        return null;
    }
};