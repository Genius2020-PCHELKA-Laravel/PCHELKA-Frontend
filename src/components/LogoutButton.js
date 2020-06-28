
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import FontBold from './FontBold';
import Loader from '../components/Loader';
import { Context as AuthContext } from '../screens/context/AuthContext';
import { Context as UserContext } from '../screens/context/UserContext';
import { Context as HCContext } from '../screens/context/HCContext';
import { getLang, storeLang } from '../api/userLanguage';
// import ConfirmationDialog from './ConfirmationDialog';
import { Updates } from 'expo';
import { Avatar } from 'react-native-elements';
import { getStorageExpoToken, setStorageExpoToken, removeStorageExpoToken, getToken, setToken, removeToken } from '../api/token';
import { navigate } from '../navigationRef';
import RNRestart from 'react-native-restart'; // Import package from node modules
const LogoutButton = ({ t }) => {
    const { state: astate, logout } = useContext(AuthContext);
    const { state: ustate, dispatch: udispatch, subscribeToNotification, unsubscribeToNotification } = useContext(UserContext);
    const { state: hcstate, dispatch: hcdispatch } = useContext(HCContext);
    // const [shouldShow, setShouldShow] = useState(true);
    const [lang, setLang] = useState('en');
    const [isloading, setIsLoading] = useState(false);
    // const [changing, setChanging] = useState(false);
    const changeLanguage = (lng) => {
        try {
            console.log("Toggle language to:  " + lng);
            setLang(lng);
            storeLang(lng);
            i18n.changeLanguage(lng);
            // shouldShow ? setShouldShow(false) : setShouldShow(true);
        } catch (e) { "Error:: " + e }
    }
    useEffect(() => {
        getLang().then((response) => {
            console.log("logoutbutton selected Lang in Use Effect:  " + response);
            setLang(response);
            i18n.changeLanguage(response);
            // shouldShow ? setShouldShow(false) : setShouldShow(true);
            // if (response == 'en') {
            //     setShouldShow(true);
            // }
            // else {
            //     setShouldShow(false);
            // }
        }).catch((err) => {
            console.log("logoutbutton Screen Can not get lang");
        });
    }, []);
    return (
        <View style={styles.container}>
            <Loader loading={isloading} />
            {/* <ConfirmationDialog lang={lang} setLang={setLang} changing={changing} setChanging={setChanging} /> */}
            {/* {
                lang === 'en' ?
                    // <TouchableOpacity activeOpacity={.5} onPress={() => { setLang('ru'); setChanging(true) }}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => { changeLanguage('ru') }}>
                        <FontBold mystyle={styles.languageButtonStyle} value="русский" />
                    </TouchableOpacity>
                    :
                    lang === 'ru' ?
                        <TouchableOpacity activeOpacity={.5} onPress={() => { changeLanguage('en') }}>
                            <FontBold mystyle={styles.languageButtonStyle} value="English" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity activeOpacity={.5} onPress={() => { changeLanguage('ru') }}>
                            <FontBold mystyle={styles.languageButtonStyle} value="русский" />
                        </TouchableOpacity>
            } */}
            {
                lang === 'en' ?
                    <Avatar
                        size="small"
                        rounded
                        source={require('../../assets/ru.png')}
                        onPress={() => { changeLanguage('ru') }}
                        activeOpacity={0.7}
                        containerStyle={styles.flag}
                    />
                    :
                    lang === 'ru' ?
                        <Avatar
                            size="small"
                            rounded
                            source={require('../../assets/en.png')}
                            onPress={async () => { changeLanguage('en') }}
                            activeOpacity={0.7}
                            containerStyle={styles.flag}
                        />
                        :
                        <Avatar
                            size="small"
                            rounded
                            source={require('../../assets/ru.png')}
                            onPress={async () => { changeLanguage('ru') }}
                            activeOpacity={0.7}
                            containerStyle={styles.flag}
                        />
            }
            {/* <TouchableOpacity onPress={async () => {

                setIsLoading(true);
                logout().then(async () => {
                    setIsLoading(false);
                    await hcdispatch({ type: 'RESET' });
                    await udispatch({ type: 'RESET' });
                }).catch(() => setIsLoading(false));
            }}>
                <Text style={styles.logoutButtonStyle}>
                    {t('logout')} {' '}<FontAwesome5 name="user" size={14} color="#7a7a7a" />
                </Text>
            </TouchableOpacity> */}

            <Avatar
                size="small"
                rounded
                icon={{ size: 25, name: 'logout', type: 'antdesign', color: '#000' }}
                onPress={async () => {
                    setIsLoading(true);
                    var expoToken = await getStorageExpoToken();
                    await unsubscribeToNotification({ expo_token: expoToken });
                    logout().then(async () => {
                        await removeStorageExpoToken();
                        await removeToken();
                        await hcdispatch({ type: 'RESET' });
                        await udispatch({ type: 'RESET' });
                        setIsLoading(false);
                        navigate('HomeScreenLogIn');
                    }).catch((err) => {
                        console.log("LogoutButton::logout func:error:: " + err);
                        setIsLoading(false);
                    });
                }}
                activeOpacity={0.7}
                containerStyle={styles.avatar}
            />

        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',

    },
    logoutButtonStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "500",
        right: 15,
        color: '#7a7a7a'
    },
    languageButtonStyle: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "900",
        right: 30,
        color: '#7a7a7a'
    },
    flag: {
        borderColor: '#000',
        borderWidth: 0,
        backgroundColor: '#fff',
        left: 0,
        width: 35,
        height: 35,
    },
    avatar: {
        borderColor: '#aaa',
        borderWidth: 0,
        backgroundColor: '#fff',
        left: 20,
        width: 35,
        height: 35,
    },
});

export default withNamespaces()(LogoutButton);