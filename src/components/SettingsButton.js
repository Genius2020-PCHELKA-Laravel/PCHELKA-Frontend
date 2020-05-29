
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import FontBold from './FontBold';
import Loader from '../components/Loader';
import { Context as AuthContext } from '../screens/context/AuthContext';
import { Context as UserContext } from '../screens/context/UserContext';
import { Avatar } from 'react-native-elements';
import { navigate } from '../navigationRef';
import { getLang, storeLang } from '../api/userLanguage';
import { setRedirect, getRedirect, removeRedirect } from '../api/redirect';
import HomeScreenAddresses from './lcation/HomeScreenAddresses';
const SettingsButton = ({ t }) => {
    const { getUserAddresses } = useContext(UserContext);
    const [reloadAddresses, setReloadAddresses] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState('');
    const [showAddressesModal, setShowAddressesModal] = useState(false);
    //load new address name in settingsbutton after add new

    //load all addresses
    useEffect(() => {
        getUserAddresses().then((response) => {
            setAddresses(response.reverse());
            setAddress(response[0].details + ',' + response[0].address);
        }).catch((err) => {
            console.log("ERROR::SettingsButton::UseEffect ");
            console.log(err);
        });
        // getUserAddressesStorage().then((response) => {
        //     if (typeof response != 'undefined') {
        //         setAddresses(response.reverse());
        //         setAddress(response[0].details + ',' + response[0].address);
        //     }
        //     else {
        //         getUserAddresses().then((response) => {
        //             setAddresses(response.reverse());
        //             setAddress(response[0].details + ',' + response[0].address);
        //         }).catch((err) => {
        //             console.log("ERROR::SettingsButton::UseEffect::getUserAddresses::  ");
        //             console.log(err);
        //         });
        //     }
        // }).catch((error) => {
        //     console.log("ERROR::SettingsButton::UseEffect::getUserDetailsStorage::  ");
        //     console.log(error);
        // });

    }, [reloadAddresses]);

    const { state, logout } = useContext(AuthContext);
    const [shouldShowLang, setShouldShowLang] = useState(true);
    const [lang, setLang] = useState('en');
    const [isLoading, setIsLoading] = useState(false);
    const changeLanguage = (lng) => {
        try {
            console.log("Toggle language to:  " + lng);
            setLang(lng);
            storeLang(lng);
            i18n.changeLanguage(lng);
            shouldShowLang ? setShouldShowLang(false) : setShouldShowLang(true);
        } catch (e) { "Error:: " + e }
    }
    useEffect(() => {
        getLang().then((response) => {
            console.log("SettingScreen selected Lang in Use Effect:  " + response);
            setLang(response);
            i18n.changeLanguage(response);
            shouldShowLang ? setShouldShowLang(false) : setShouldShowLang(true);
            if (response == 'en') {
                setShouldShowLang(true);
            }
            else {
                setShouldShowLang(false);
            }
        }).catch((err) => {
            console.log("Settings Screen Can not get lang");
        });
    }, []);
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity activeOpacity={.5} onPress={async () => { await setRedirect('HomeNavigator'); navigate('MapScreen') }}>
                <Text style={styles.locationButtonStyle} numberOfLines={1} ellipsizeMode='middle' >
                    {
                        address == '' ? t('Addresses') : address
                    }
                    <Entypo name="chevron-down" size={14} color="#ff9800" />
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={.5} onPress={() => { setIsLoading(true); showAddressesModal == false ? setShowAddressesModal(true) : setShowAddressesModal(false); }}>
                <Loader loading={isLoading} />
                <Text style={styles.locationButtonStyle} numberOfLines={1} ellipsizeMode='middle' >
                    {
                        address == '' ? t('Addresses') : address
                    }
                    <Entypo name="chevron-down" size={14} color="#ff9800" />
                </Text>
            </TouchableOpacity >
            <HomeScreenAddresses
                setIsLoading={setIsLoading}
                addresses={addresses}
                reloadAddresses={reloadAddresses}
                setReloadAddresses={setReloadAddresses}
                showAddressesModal={showAddressesModal}
                setShowAddressesModal={setShowAddressesModal}
            />

            {shouldShowLang ?
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
            <Avatar
                size="small"
                rounded
                icon={{ name: 'user', type: 'font-awesome' }}
                onPress={() => navigate('SettingNavigator')}
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
    locationButtonStyle: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ff9800',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "500",
        color: '#ff9800',
        top: 10,
        marginRight: 40,
        width: 150
    },
    languageButtonStyle: {
        padding: 10,
        backgroundColor: '#ff9800',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ff9800',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "500",
        right: 30,
        color: 'white',
        top: 10
    },
    avatar: {
        backgroundColor: '#ff9800',
        flex: 1,
        right: 20,
        top: 15
    },
});

export default withNamespaces()(SettingsButton);