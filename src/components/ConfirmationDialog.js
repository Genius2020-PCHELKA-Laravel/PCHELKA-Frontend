import React from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import RNRestart from 'react-native-restart'; // Import package from node modules
import Spacer from './Spacer';
import i18n from '../locales/i18n';
import { getLang, storeLang } from '../api/userLanguage';

const ConfirmationDialog = props => {
    const { changing, setChanging, ...attributes } = props;

    componentDidMount = () => {
        this.mounted = true;
    }
    componentWillUnmount = () => {
        this.mounted = false;
    }
    const handleCancel = () => {
        //this.setState({ dialogVisible: false });
    };

    const handleChange = () => {
        try {
            console.log("Toggle language to:  " + lng);
            setLang(lang);
            storeLang(lang);
            i18n.changeLanguage(lang);
            //shouldShowLang ? setShouldShowLang(false) : setShouldShowLang(true);
        } catch (e) { "Error:: " + e }
        setChanging(false);
        RNRestart.Restart();
    };

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={changing}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View >
                {/* <TouchableOpacity onPress={() => { }}>
                    <Text>Show Dialog</Text>
                </TouchableOpacity> */}
                <Dialog.Container visible={changing}>
                    <Dialog.Title>Restart</Dialog.Title>
                    <Dialog.Description>
                        Changing language require restarting the App
          </Dialog.Description>

                    <Dialog.Button style={styles.btn} label="Cancel" onPress={() => setChanging(false)} />
                    <Dialog.Button style={styles.btn} label="Restart" onPress={handleChange} />
                </Dialog.Container>
            </View>
        </Modal>
    );
};
export default ConfirmationDialog;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    btn: {
        backgroundColor: '#f5c500',
        borderRadius: 14,
        borderWidth: 1,
        color: '#000',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10,

    },

});
