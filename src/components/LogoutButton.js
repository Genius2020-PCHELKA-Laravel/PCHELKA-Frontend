
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

// import ConfirmationDialog from './ConfirmationDialog';
import { Updates } from 'expo';
import { Avatar } from 'react-native-elements';
import { getStorageExpoToken, setStorageExpoToken, removeStorageExpoToken, getToken, setToken, removeToken } from '../api/token';
import { navigate } from '../navigationRef';
import RNRestart from 'react-native-restart'; // Import package from node modules
import LogoutDialog from '../components/LogoutDialog';
import { Normalize, fontNormalize } from './actuatedNormalize';

const LogoutButton = ({ t }) => {
    const { state: astate, logout } = useContext(AuthContext);
    const { state: ustate, dispatch: udispatch, subscribeToNotification, unsubscribeToNotification } = useContext(UserContext);
    const { state: hcstate, dispatch: hcdispatch } = useContext(HCContext);
    // const [shouldShow, setShouldShow] = useState(true);
    const [isloading, setIsLoading] = useState(false);
    const [showModalVisibleLogout, setShowModalVisibleLogout] = useState(false);
    // const [changing, setChanging] = useState(false);

    const oklogout = async () => {
        setShowModalVisibleLogout(false);
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
    }
    useEffect(() => {
        // getLang().then(async (response) => {
        //     console.log("logoutbutton selected Lang in Use Effect:  " + response);

        //     setLang(response);
        //     i18n.changeLanguage(response);

        //     userLanguage({ language: response })
        //         .then((resposnse) => {
        //             console.log("LogoutButton::UserLanguage" + resposnse);
        //         })
        //         .catch((err) => {
        //             console.log("LogoutButton::UserLanguage::error:: " + err);
        //         });
        // }).catch((err) => {
        //     console.log("LogoutButton::Can not get lang" + err);
        // });
    }, []);

    return (
        <View style={styles.container}>
            <Loader loading={isloading} />
            <LogoutDialog
                showModalVisibleLogout={showModalVisibleLogout}
                setShowModalVisibleLogout={setShowModalVisibleLogout}
                oklogout={oklogout}
            />
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
            <TouchableOpacity onPress={async () => {
                setShowModalVisibleLogout(true);
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <FontBold value={t('logout')} mystyle={{ color: "#b52424", textAlignVertical: "center" }} />
                    <Avatar
                        size="small"
                        rounded
                        icon={{ size: Normalize(25), name: 'logout', type: 'antdesign', color: '#b52424' }}
                        activeOpacity={0.7}
                        containerStyle={styles.avatar}
                    />
                </View>


            </TouchableOpacity>

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
        paddingVertical: Normalize(10),
        paddingHorizontal: Normalize(10),
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: fontNormalize(12),
        fontWeight: "500",
        right: Normalize(15),
        color: '#7a7a7a'
    },
    languageButtonStyle: {
        paddingVertical: Normalize(8),
        paddingHorizontal: Normalize(10),
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: fontNormalize(12),
        fontWeight: "900",
        right: Normalize(30),
        color: '#7a7a7a'
    },
    flag: {
        borderColor: '#000',
        borderWidth: 0,
        backgroundColor: '#fff',
        left: 0,
        width: Normalize(35),
        height: Normalize(35),
    },
    avatar: {
        borderColor: '#aaa',
        borderWidth: 0,
        backgroundColor: '#fff',
        left: Normalize(20),
        width: Normalize(35),
        height: Normalize(35),
    },
});

export default withNamespaces()(LogoutButton);