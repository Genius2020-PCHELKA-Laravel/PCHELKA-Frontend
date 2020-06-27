import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, TouchableWithoutFeedback } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import RNRestart from 'react-native-restart';
import Spacer from './Spacer';
import { getLang, storeLang } from '../api/userLanguage';
import { Updates } from 'expo';
import { withNamespaces } from 'react-i18next';
import i18n from '../locales/i18n';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
import { AntDesign, Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const AlertDialog = props => {
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
                        <View flexDirection="row" style={{ marginBottom: 5 }}>
                            <FontBold mystyle={{ fontSize: 20 }} value={i18n.t('alert')} />
                            {/* <AntDesign style={{ position: "absolute", right: 15, top: 0 }} name="warning" size={45} color="#d21404" /> */}
                        </View>
                        <FontRegular mystyle={{ fontSize: 16, lineHeight: 25 }} value={i18n.t('notpermittedyourescheduledbefore')} />
                        <View flexDirection="row" style={{ justifyContent: "flex-end", marginTop: 15 }}>
                            <TouchableOpacity style={styles.btn} onPress={handleCancel} >
                                <FontBold mystyle={{ color: 'blue' }} value={i18n.t('ok')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};
export default withNamespaces()(AlertDialog);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: 165,
        width: '90%',
        bottom: "40%",
        borderRadius: 0,
        borderWidth: 1,
        borderColor: "#7a7a7a",
        padding: 20
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
