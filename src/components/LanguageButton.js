
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import { getLang, storeLang } from '../api/userLanguage';
import { Avatar } from 'react-native-elements';
import ConfirmationDialog from './ConfirmationDialog';
import { Context as UserContext } from '../screens/context/UserContext';
import LanguageDialog from '../components/LanguageDialog';

const LanguageButton = ({ t }) => {
    const { userLanguage } = useContext(UserContext);

    const [lang, setLang] = useState('en');
    const [changing, setChanging] = useState(false);
    const [showModalVisibleLanguage, setShowModalVisibleLanguage] = useState(false);
    const changeLanguage = (lng) => {
        try {
            console.log("Toggle language to:  " + lng);
            setLang(lng);
            storeLang(lng);
            i18n.changeLanguage(lng);
            // userLanguage({ language: lng })
            //     .then((resposnse) => {
            //         console.log("LanguageButton::UserLanguage:: " + resposnse);
            //     })
            //     .catch((err) => {
            //         console.log("LanguageButton::UserLanguage::Error:: " + err.response);
            //     });
        } catch (e) { "Error:: " + e }
    }

    useEffect(() => {
        getLang().then((response) => {
            console.log("languagebutton selected Lang in Use Effect:  " + response);
            setLang(response);
            i18n.changeLanguage(response);

        }).catch((err) => {
            console.log("language Screen Can not get lang");
            storeLang('en');
            i18n.changeLanguage('en');
        });
    }, []);
    return (
        <View style={styles.container}>
            <ConfirmationDialog lang={lang} setLang={setLang} changing={changing} setChanging={setChanging} />
            <LanguageDialog
                lang={lang}
                setLang={setLang}
                changeLanguage={changeLanguage}
                showModalVisibleLanguage={showModalVisibleLanguage}
                setShowModalVisibleLanguage={setShowModalVisibleLanguage} />

            {
                lang === 'en' ?
                    <Avatar
                        size="small"
                        rounded
                        source={require('../../assets/en.png')}
                        onPress={() => { setShowModalVisibleLanguage(true) }}
                        activeOpacity={0.7}
                        containerStyle={styles.flag}
                    />
                    :
                    lang === 'ru' ?
                        <Avatar
                            size="small"
                            rounded
                            source={require('../../assets/ru.png')}
                            onPress={async () => { setShowModalVisibleLanguage(true) }}
                            activeOpacity={0.7}
                            containerStyle={styles.flag}
                        />
                        :
                        <Avatar
                            size="small"
                            rounded
                            source={require('../../assets/en.png')}
                            onPress={async () => { setShowModalVisibleLanguage(true) }}
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