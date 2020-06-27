
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import { getLang, storeLang } from '../api/userLanguage';
import { Avatar } from 'react-native-elements';
import ConfirmationDialog from './ConfirmationDialog';

const LanguageButton = ({ t }) => {
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

        }).catch((err) => {
            console.log("Settings Screen Can not get lang");
        });
    }, []);
    return (
        <View style={styles.container}>
            <ConfirmationDialog lang={lang} setLang={setLang} changing={changing} setChanging={setChanging} />
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
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    flag: {
        borderColor: '#000',
        borderWidth: 0,
        backgroundColor: '#fff',
        flex: 1,
        left: 20,
        top: 7,
        width: 30,
        height: 30,
    },
});

export default withNamespaces()(LanguageButton);