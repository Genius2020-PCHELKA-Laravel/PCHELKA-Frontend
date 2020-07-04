
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import FontBold from './FontBold';
import { Context as AuthContext } from '../screens/context/AuthContext';
import { Context as UserContext } from '../screens/context/UserContext';
import { Context as HCContext } from '../screens/context/HCContext';
import { getLang, storeLang } from '../api/userLanguage';
import { Avatar } from 'react-native-elements';
// import ConfirmationDialog from './ConfirmationDialog';

import RNRestart from 'react-native-restart'; // Import package from node modules
const LoginButton = ({ t }) => {
    const { state: astate, login } = useContext(AuthContext);
    const { state: ustate, dispatch: udispatch } = useContext(UserContext);
    const { state: hcstate, dispatch: hcdispatch } = useContext(HCContext);
    // const [shouldShow, setShouldShow] = useState(true);
    const [lang, setLang] = useState('en');
    const [changing, setChanging] = useState(false);


    function Effect(props) {
        const val = useRef();
        React.useEffect(() => {
            val.current = props;
        }, [props]);
        React.useEffect(() => {
            console.log("MOUNT", props);
            return () => console.log("UNMOUNT", val.current);
        }, [val]);
        return null;
    }



    const changeLanguage = (lng) => {
        try {
            console.log("Toggle language to:  " + lng);
            setLang(lng);
            storeLang(lng);
            i18n.changeLanguage(lng);
            // shouldShow ? setShouldShow(false) : setShouldShow(true);
        } catch (e) { "Error:: " + e }
        // RNRestart.Restart();
    }
    useEffect(() => {
        getLang().then((response) => {
            console.log("SettingScreen selected Lang in Use Effect:  " + response);
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
            console.log("Settings Screen Can not get lang");
        });
    }, []);
    return (
        <View style={styles.container}>
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


            {/* <TouchableOpacity onPress={async () => { await hcdispatch({ type: 'RESET' }); await udispatch({ type: 'RESET' }); login(); }}>
                <Text style={styles.loginButtonStyle}>
                    {t('login')} {' '}
                    <FontAwesome5 name="user" size={14} color="#7a7a7a" />
                </Text>
            </TouchableOpacity> */}


            <Avatar
                size="small"
                rounded
                icon={{ size: 25, name: 'login', type: 'antdesign', color: '#000' }}
                onPress={async () => { await hcdispatch({ type: 'RESET' }); await udispatch({ type: 'RESET' }); login(); }}
                activeOpacity={0.7}
                containerStyle={styles.avatar}
            />

        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    loginButtonStyle: {
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
        fontWeight: "bold",
        right: 15,
        color: '#7a7a7a'
    },
    languageButtonStyle: {
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
        fontWeight: "900",
        right: 30,
        color: '#7a7a7a',
        fontWeight: "bold",

    },
    avatar: {
        borderColor: '#aaa',
        borderWidth: 0,
        backgroundColor: '#fff',
        flex: 1,
        right: 20,
        top: 7,
        width: 35,
        height: 35,
    },
    flag: {
        borderColor: '#000',
        borderWidth: 0,
        backgroundColor: '#fff',
        flex: 1,
        left: 20,
        top: 7,
        width: 25,
        height: 25,
    },
});

export default withNamespaces()(LoginButton);