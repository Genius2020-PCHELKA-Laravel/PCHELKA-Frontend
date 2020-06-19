import React from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, Button } from 'react-native';
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
            transparent={true}
            animationType={'none'}
            style={styles.container}
            visible={changing}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View style={styles.wrapper}>
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
            </View>
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
