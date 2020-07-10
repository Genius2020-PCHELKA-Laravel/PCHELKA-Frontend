import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, TouchableWithoutFeedback } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import RNRestart from 'react-native-restart';
import Spacer from './Spacer';
import { Updates } from 'expo';
import { withNamespaces } from 'react-i18next';
import i18n from '../locales/i18n';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
import { AntDesign, Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { BackHandler } from 'react-native';
import Modal from 'react-native-modal';
import { Normalize, fontNormalize } from './actuatedNormalize';

const ExitDialog = props => {
    const { changing, setChanging, ...attributes } = props;

    componentDidMount = () => {
        this.mounted = true;
    }
    componentWillUnmount = () => {
        this.mounted = false;
    }
    const handleCancel = () => {
        setChanging(false);
    };

    const handleChange = async () => {
        try {
            setChanging(false);
            BackHandler.exitApp();
        } catch (e) {
            setChanging(false);
            console.log("Error:: " + e);
        }
    };

    return (

        <Modal
            style={{ flex: 1, margin: 0 }}
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={500}
            animationOutTiming={500}
            avoidKeyboard={true}
            backdropColor='transparent'
            transparent={true}
            isVisible={changing}
            hideModalContentWhileAnimating={false}
            coverScreen={true}
            onBackButtonPress={() => setChanging(false)}
            onBackdropPress={() => setChanging(false)}
            // onSwipeComplete={() => setChanging(false)}
            // swipeThreshold={200}
            // swipeDirection="down"
            onRequestClose={() => {
                // alert('Modal has been closed.');
            }}>
            <TouchableOpacity onPress={() => setChanging(false)} style={styles.wrapper}>

                <TouchableWithoutFeedback>

                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row', backgroundColor: "#f5c500", justifyContent: "center", borderTopLeftRadius: 14, borderTopRightRadius: 14,
                        }}>
                            <View style={{ flexDirection: 'column', height: 75, justifyContent: "center" }}>
                                <FontBold value={i18n.t('exitapp')} mystyle={{ fontSize: fontNormalize(20), color: "#fff" }}></FontBold>
                            </View>
                        </View>
                        <Spacer />
                        {/* <View flexDirection="row" style={{ marginBottom: 5 }}> */}
                        {/* <FontBold mystyle={{ fontSize: 20 }} value={i18n.t('exit')} /> */}
                        {/* <AntDesign style={{ position: "absolute", right: 15, top: 0 }} name="warning" size={45} color="#d21404" /> */}
                        {/* </View> */}
                        <Spacer>
                            <FontRegular mystyle={{ fontSize: fontNormalize(16) }} value={i18n.t('doyouwanttoexit')} />
                        </Spacer>
                        <View flexDirection="row" style={{ justifyContent: "flex-end", marginTop: Normalize(20) }}>
                            <TouchableOpacity style={styles.btn} onPress={handleCancel} >
                                <FontBold value={i18n.t('cancel')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={handleChange} >
                                <FontBold mystyle={{ color: "#b52424" }} value={i18n.t('ok')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};
export default withNamespaces()(ExitDialog);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: Normalize(210),
        width: '90%',
        bottom: "40%",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        // borderWidth: 1,
        // borderColor: "#2Ac062",
        shadowColor: '#7a7a7a',
        shadowOpacity: 1.0,
        shadowOffset: {
            height: Normalize(10),
            width: Normalize(10)
        },
        shadowRadius: 10,
        elevation: Normalize(10)
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "#ffffffaa"
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
        marginHorizontal: Normalize(10),
        backgroundColor: "#fff",
        paddingHorizontal: Normalize(15),
        paddingVertical: Normalize(5)

    },

});
