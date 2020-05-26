
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import FontBold from './FontBold';
import { Context as AuthContext } from '../screens/context/AuthContext';
import { getLang, storeLang } from '../api/userLanguage';
import RNRestart from 'react-native-restart'; // Import package from node modules
const LoginButton = ({ t }) => {
    const { state, login } = useContext(AuthContext);
    const [shouldShow, setShouldShow] = useState(true);
    const [lang, setLang] = useState('en');
    const changeLanguage = (lng) => {
        try {
            console.log("Toggle language to:  " + lng);
            setLang(lng);
            storeLang(lng);
            i18n.changeLanguage(lng);
            shouldShow ? setShouldShow(false) : setShouldShow(true);
        } catch (e) { "Error:: " + e }
        RNRestart.Restart();
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
            {shouldShow ?
                <TouchableOpacity activeOpacity={.5} onPress={() => changeLanguage('ru')}>
                    <Text style={styles.languageButtonStyle}>русский {' '}
                        <FontAwesome5 name="exchange-alt" size={20} color="white" />
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={.5} onPress={() => changeLanguage('en')}>
                    <Text style={styles.languageButtonStyle}>English{' '}
                        <FontAwesome5 name="exchange-alt" size={20} color="white" />
                    </Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => { login(); }}>
                {/* <FontBold mystyle={styles.topButtonStyle} value={t('logout')}></FontBold> */}
                <Text style={styles.loginButtonStyle}>
                    {t('login')} <FontAwesome5 name="user" size={20} color="white" />
                </Text>
            </TouchableOpacity>

        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    loginButtonStyle: {
        padding: 10,
        backgroundColor: '#FF9800',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FF9800',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "500",
        right: 15,
        color: 'white'
    },
    languageButtonStyle: {
        padding: 10,
        backgroundColor: '#FF9800',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FF9800',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "500",
        right: 30,
        color: 'white'
    },
});

export default withNamespaces()(LoginButton);