import { AsyncStorage } from "react-native";

export const setUserDetailsStorage = async (details) => {
    try {
        // console.log("api.setUserDetailsStorage():" + JSON.parse(details));
        var jsonOfItem = await AsyncStorage.setItem('pchelka.org@user_details', JSON.stringify(details));
        return jsonOfItem;

    } catch (e) {
        console.log("SetDetails AsyncStorage Error:: " + e);
    }
};

export const getUserDetailsStorage = async () => {
    try {
        const details = await AsyncStorage.getItem('pchelka.org@user_details');
        if (details !== null) {
            // alert("api/getUserDetailsStorage():" + JSON.parse(details));
            return JSON.parse(details);
        }
    } catch (e) {
        console.log("Error:: api/getUserDetailsStorage() " + e);
    }
};



export const removeUserDetailsStorage = async (details) => {
    try {
        await AsyncStorage.removeItem('pchelka.org@user_details');
    } catch (e) {
        return null;
    }
};