import { AsyncStorage } from "react-native";


export const storeLang = async (selectedLanguage) => {
    try {
        await AsyncStorage.setItem('pchelka.org@user_language', selectedLanguage);
    } catch (error) {
        console.log("Error Storing User Language");
    }
}
export const getLang = async () => {
    try {
        const value = await AsyncStorage.getItem('pchelka.org@user_language');
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.log("Error Getting User Language");
    }
}