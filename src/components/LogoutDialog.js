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

const LogoutDialog = ({ navigation, t, showModalVisibleLogout, setShowModalVisibleLogout, oklogout }) => {



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
                isVisible={showModalVisibleLogout}
                hideModalContentWhileAnimating={false}
                coverScreen={true}
                // onBackButtonPress={() => setShowModalVisibleLogout(false)}
                // onBackdropPress={() => setShowModalVisibleLogout(false)}
                //onSwipeComplete={() => setShowModalVisibleLogout(false)}
                //swipeThreshold={200}
                //swipeDirection="down"
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>

                <TouchableOpacity activeOpacity={1.0} onPress={() => setShowModalVisibleLogout(false)} style={styles.wrapper}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container} >
                            <View style={{
                                flexDirection: 'row', backgroundColor: "#f5c500", justifyContent: "center", borderTopLeftRadius: 14, borderTopRightRadius: 14,
                            }}>
                                <View style={{ flexDirection: 'column', height: 75, justifyContent: "center" }}>
                                    <FontBold value={t('logoutapp')} mystyle={{ fontSize: 20, color: "#fff" }}></FontBold>
                                </View>
                            </View>
                            <Spacer />
                            <Spacer>
                                <FontRegular mystyle={{ fontSize: 16 }} value={t('doyouwanttologout')} />
                            </Spacer>
                            <View flexDirection="row" style={{ justifyContent: "flex-end", marginTop: 20 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => setShowModalVisibleLogout(false)}>
                                    <FontBold value={t('cancel')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={oklogout} >
                                    <FontBold mystyle={{ color: "#b52424" }} value={t('ok')} />
                                </TouchableOpacity>
                            </View>
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
    btn: {
        backgroundColor: '#f5c500',
        borderRadius: 7,
        borderColor: "#7a7a7a",
        borderWidth: 0,
        color: '#7a7a7a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 5

    },

});
export default withNamespaces()(LogoutDialog);



































