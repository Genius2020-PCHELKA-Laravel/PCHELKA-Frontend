import React, { Component, useState, useContext, useEffect } from 'react';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Context as HCContext } from '../screens/context/HCContext';
import { Context as UserContext } from '../screens/context/UserContext';
import Spacer from '../components/Spacer';
import FontBold from '../components/FontBold';
import FontLight from '../components/FontLight';
import FontRegular from '../components/FontRegular';
import { withNamespaces } from 'react-i18next';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { getLang } from '../api/userLanguage';
import Loader from '../components/Loader';
import { Avatar } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';


const LanguageDialog = ({ navigation, t, showModalVisibleLanguage, setShowModalVisibleLanguage, lang, setLang, changeLanguage }) => {



    // const fetchLang
    useEffect(() => {
        // alert(lang)
    }, []);




    return (
        <View style={{ marginTop: 22 }}>
            <Modal
                style={{ flex: 1, margin: 0 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInTiming={1200}
                animationOutTiming={1200}
                avoidKeyboard={true}
                backdropColor='transparent'
                transparent={true}
                isVisible={showModalVisibleLanguage}
                hideModalContentWhileAnimating={false}
                coverScreen={true}
                onBackButtonPress={() => setShowModalVisibleLanguage(false)}
                onBackdropPress={() => setShowModalVisibleLanguage(false)}
                onSwipeComplete={() => setShowModalVisibleLanguage(false)}
                swipeThreshold={200}
                swipeDirection="down"
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>

                <TouchableOpacity activeOpacity={1.0} onPress={() => { setShowModalVisibleLanguage(false) }} style={styles.wrapper}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container} >
                            <View style={{
                                flexDirection: 'row', backgroundColor: "#f5c500", justifyContent: "center", borderTopLeftRadius: 14, borderTopRightRadius: 14,
                            }}>
                                <View style={{ flexDirection: 'column', height: 75, justifyContent: "center" }}>
                                    <FontBold value={t('applanguage')} mystyle={{ fontSize: 20, color: "#fff" }}></FontBold>
                                </View>
                            </View>
                            <Spacer />
                            <TouchableOpacity onPress={() => { changeLanguage('en'); setShowModalVisibleLanguage(false); }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.3 }}>
                                        <Avatar
                                            size="small"
                                            rounded
                                            source={require('../../assets/en.png')}
                                            onPress={() => { changeLanguage('en'); setShowModalVisibleLanguage(false); }}
                                            activeOpacity={0.7}
                                            containerStyle={styles.flag}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <FontBold value={t('english')} mystyle={{ fontSize: 20, }}></FontBold>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <RadioButton onPress={() => { changeLanguage('en'); setShowModalVisibleLanguage(false); }} value='en' status={lang == 'en' || typeof lang == 'undefined' ? 'checked' : 'unchecked'} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <Spacer />
                            <TouchableOpacity onPress={() => { changeLanguage('ru'); setShowModalVisibleLanguage(false); }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.3 }}>
                                        <Avatar
                                            size="small"
                                            rounded
                                            source={require('../../assets/ru.png')}
                                            onPress={() => { changeLanguage('ru'); setShowModalVisibleLanguage(false); }}
                                            activeOpacity={1}
                                            containerStyle={styles.flag}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <FontBold value={t('russian')} mystyle={{ fontSize: 20 }}></FontBold>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <RadioButton onPress={() => { changeLanguage('ru'); setShowModalVisibleLanguage(false); }} value='ru' status={lang == 'ru' ? 'checked' : 'unchecked'} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: 210,
        width: '90%',
        bottom: "40%",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        // borderWidth: 1,
        // borderColor: "#2Ac062",
        shadowColor: '#7a7a7a',
        shadowOpacity: 1.0,
        shadowOffset: {
            height: 10,
            width: 10
        },
        shadowRadius: 10,
        elevation: 10
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    flag: {
        borderColor: '#000',
        borderWidth: 0,
        backgroundColor: '#fff',
        left: 20,
        width: 40,
        height: 40,
    },

});
export default withNamespaces()(LanguageDialog);