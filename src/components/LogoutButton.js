
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import FontBold from './FontBold';
import Loader from '../components/Loader';
import { Context as AuthContext } from '../screens/context/AuthContext';
import { getLang, storeLang } from '../api/userLanguage';
import RNRestart from 'react-native-restart'; // Import package from node modules
const LogoutButton = ({ t }) => {
    const { state, logout } = useContext(AuthContext);
    const [shouldShow, setShouldShow] = useState(true);
    const [lang, setLang] = useState('en');
    const [isloading, setIsLoading] = useState(false);
    const changeLanguage = (lng) => {
        try {
            console.log("Toggle language to:  " + lng);
            setLang(lng);
            storeLang(lng);
            i18n.changeLanguage(lng);
            shouldShow ? setShouldShow(false) : setShouldShow(true);
        } catch (e) { "Error:: " + e }
    }
    useEffect(() => {
        getLang().then((response) => {
            console.log("SettingScreen selected Lang in Use Effect:  " + response);
            setLang(response);
            i18n.changeLanguage(response);
            shouldShow ? setShouldShow(false) : setShouldShow(true);
            if (response == 'en') {
                setShouldShow(true);
            }
            else {
                setShouldShow(false);
            }
        }).catch((err) => {
            console.log("Settings Screen Can not get lang");
        });
    }, []);
    return (
        <View style={styles.container}>
            <Loader loading={isloading} />

            {shouldShow ?
                <TouchableOpacity activeOpacity={.5} onPress={() => changeLanguage('ru')}>
                    <Text style={styles.languageButtonStyle}>русский {' '}
                        {/* <FontAwesome5 name="exchange-alt" size={20} color="white" /> */}
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={.5} onPress={() => changeLanguage('en')}>
                    <Text style={styles.languageButtonStyle}>English{' '}
                        {/* <FontAwesome5 name="exchange-alt" size={20} color="white" /> */}
                    </Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => { setIsLoading(true); logout().then(() => setIsLoading(false)).catch(() => setIsLoading(false)); }}>
                {/* <FontBold mystyle={styles.topButtonStyle} value={t('logout')}></FontBold> */}
                <Text style={styles.logoutButtonStyle}>
                    {t('logout')} {' '}<FontAwesome5 name="user" size={14} color="#000" />
                </Text>
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f5c500',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "500",
        right: 15,
        color: '#000'
    },
    languageButtonStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f5c500',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "900",
        right: 30,
        color: '#000'
    },
});

export default withNamespaces()(LogoutButton);