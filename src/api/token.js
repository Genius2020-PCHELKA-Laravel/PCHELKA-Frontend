import { AsyncStorage } from "react-native";

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('pchelka.org@auth_token');
        if (value !== null) {
            return value;
        }
    } catch (e) {
        return null;
    }
};

export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('pchelka.org@auth_token', token);
    } catch (e) {
        return null;
    }
};

export const removeToken = async (token) => {
    try {
        await AsyncStorage.removeItem('pchelka.org@auth_token');
    } catch (e) {
        return null;
    }
};