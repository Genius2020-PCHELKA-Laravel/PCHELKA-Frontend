
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, RefreshControl } from 'react-native';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import FontBold from './FontBold';
import { Context as UserContext } from '../screens/context/UserContext';
import { Avatar } from 'react-native-elements';
import { navigate } from '../navigationRef';
import { getLang, storeLang } from '../api/userLanguage';
import HomeScreenAddresses from './lcation/HomeScreenAddresses';
import { getToken } from '../api/token';
// import ConfirmationDialog from '../components/ConfirmationDialog';
import { fontNormalize, Normalize } from '../components/actuatedNormalize';
const SettingsButton = ({ t }) => {
    const { state: ustate } = useContext(UserContext);
    const [address, setAddress] = useState('');
    const [showAddressesModal, setShowAddressesModal] = useState(false);
    // const [shouldShowLang, setShouldShowLang] = useState(true);
    // const [lang, setLang] = useState('en');
    // const [changing, setChanging] = useState(false);

    useEffect(() => {
        // if (ustate.addressesloaded && ustate.addresses != '' && typeof ustate.addresses != 'undefined')
        // if (ustate.addresses.length === 0 || ustate.addresses === undefined)
        if (ustate.addresses === undefined)
            setAddress(t('address'))
        else if (ustate.addresses[0] != undefined)
            setAddress(ustate.addresses[0].details + ',' + ustate.addresses[0].address);
    }, [ustate.addresses]);

    // useEffect(() => {
    //     getLang().then((response) => {
    //         console.log("SettingScreen selected Lang in Use Effect:  " + response);
    //         setLang(response);
    //         i18n.changeLanguage(response);
    //         shouldShowLang ? setShouldShowLang(false) : setShouldShowLang(true);
    //         if (response == 'en') {
    //             setShouldShowLang(true);
    //         }
    //         else {
    //             setShouldShowLang(false);
    //         }
    //     }).catch((err) => {
    //         console.log("Settings Screen Can not get lang");
    //     });
    // }, []);
    // const changeLanguage = (lng) => {
    //     try {
    //         console.log("Toggle language to:  " + lng);
    //         setLang(lng);
    //         storeLang(lng);
    //         i18n.changeLanguage(lng);
    //         shouldShowLang ? setShouldShowLang(false) : setShouldShowLang(true);
    //     } catch (e) { "Error:: " + e }
    // }

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <TouchableOpacity
                    style={{ marginRight: Normalize(35), }}
                    activeOpacity={.5}
                    onPress={() => { showAddressesModal == false ? setShowAddressesModal(true) : setShowAddressesModal(false); }}>
                    <Text style={styles.locationButtonStyle} numberOfLines={1} ellipsizeMode='middle' >
                        {
                            address == '' ? t('addresses') : address
                        }
                        {' '}<Entypo name="chevron-down" size={Normalize(15)} color="#f5c500" />
                    </Text>
                </TouchableOpacity >
                <Avatar
                    size="small"
                    rounded
                    icon={{ size: Normalize(15), name: 'user', type: 'font-awesome', color: '#fff' }}
                    onPress={() => navigate('SettingNavigator')}
                    activeOpacity={0.7}
                    containerStyle={styles.avatar}
                />
            </View>
            <HomeScreenAddresses
                addresses={ustate.addresses}
                showAddressesModal={showAddressesModal}
                setShowAddressesModal={setShowAddressesModal}
            />
            {/* <ConfirmationDialog changing={changing} setChanging={setChanging} /> */}


            {/* {shouldShowLang ?
                <TouchableOpacity activeOpacity={.5} onPress={() => changeLanguage('ru')}>
                    <Text style={styles.languageButtonStyle}>русский {' '}
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={.5} onPress={() => changeLanguage('en')}>
                    <Text style={styles.languageButtonStyle}>English{' '}
                    </Text>
                </TouchableOpacity>
            }
             */}

        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',

    },
    locationButtonStyle: {
        paddingVertical: Normalize(10),
        paddingHorizontal: 0,
        backgroundColor: '#fff',
        // borderRadius: 25,
        // borderWidth: 1,
        // borderColor: '#000',
        textAlign: 'center',
        fontSize: fontNormalize(16),
        // fontWeight: "500",
        color: '#000',
        top: 10,
        marginRight: Normalize(35),
        marginLeft: Normalize(35),
        width: Normalize(200),
        fontWeight: "bold",
    },
    avatar: {
        borderColor: '#7a7a7a',
        borderWidth: 1,
        backgroundColor: '#7a7a7a',
        flex: 1,
        right: Normalize(20),
        top: 20,
        width: Normalize(25),
        height: Normalize(25),
    },
});

export default withNamespaces()(SettingsButton);