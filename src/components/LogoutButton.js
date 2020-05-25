
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import FontBold from './FontBold';
import Loader from '../components/Loader';
import { Context as AuthContext } from '../screens/context/AuthContext';
const LogoutButton = ({ t }) => {
    const { state, logout } = useContext(AuthContext);
    const [shouldShow, setShouldShow] = useState(true);
    const [lang, setLang] = useState('en');
    const storeKey = 'myLanguage';
    storeData = async (selectedLanguage) => {
        try {
            await AsyncStorage.setItem(storeKey, selectedLanguage);
            setLang(value);
            changeLanguage(value);
        } catch (error) {
            // Error saving data
        }
    }
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(storeKey);
            if (value !== null) {
                // We have data!!
                changeLanguage(value);
                setLang(value);
                if (value == 'en') {
                    setShouldShow(true);
                }
                else {
                    setShouldShow(false);
                }
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        storeData(lng);
        shouldShow ? setShouldShow(false) : setShouldShow(true);
    }
    useEffect(() => {
        retrieveData();
    }, []);
    return (
        <View style={styles.container}>
            <Loader loading={state.loading} />

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
            <TouchableOpacity onPress={() => { logout(); }}>
                {/* <FontBold mystyle={styles.topButtonStyle} value={t('logout')}></FontBold> */}
                <Text style={styles.logoutButtonStyle}>
                    {t('logout')} <FontAwesome5 name="user" size={20} color="white" />
                </Text>
            </TouchableOpacity>

        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    logoutButtonStyle: {
        padding: 10,
        backgroundColor: '#FF9800',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FF9800',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 16,
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

export default withNamespaces()(LogoutButton);