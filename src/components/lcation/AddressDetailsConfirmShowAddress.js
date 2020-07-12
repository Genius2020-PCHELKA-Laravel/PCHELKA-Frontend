import React, { Component, useState, useContext, useEffect } from 'react';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
// import { Context as HCContext } from '../screens/context/HCContext';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import { withNamespaces } from 'react-i18next';
import Toast from 'react-native-simple-toast';
import i18n from '../../locales/i18n';
import Modal from 'react-native-modal';
import { Normalize, fontNormalize } from '../actuatedNormalize';

export default class AddressDetailsConfirmShowAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            street: '',
            buildingnumber: '',
            apartment: '',
            streetStyle: styles.inputStyleError,
            buildingnumberStyle: styles.inputStyleError,
            apartmentStyle: styles.inputStyleError,
            saveButtonStyle: styles.saveButtonStyleError,
            saveButtonTextStyle: styles.saveButtonTextStyleError
        };
    }
    handleStreetChange(text) {
        this.setState({ street: text.trimStart() });
        if (text.trim() != '') {
            this.setState({ streetStyle: styles.inputStyle });
            if (this.state.buildingnumber.trim() == '' || this.state.apartment.trim() == '') {
                this.setState({ saveButtonStyle: styles.saveButtonStyleError });
                this.setState({ saveButtonTextStyle: styles.saveButtonTextStyleError });
            }
            else {
                this.setState({ saveButtonStyle: styles.saveButtonStyle });
                this.setState({ saveButtonTextStyle: styles.saveButtonTextStyle });
            }
        }
        else {
            this.setState({ streetStyle: styles.inputStyleError });
            this.setState({ saveButtonStyle: styles.saveButtonStyleError });
            this.setState({ saveButtonTextStyle: styles.saveButtonTextStyleError });
        }
    }
    handleBuildingnumberChange(text) {
        this.setState({ buildingnumber: text.trimStart() });
        if (text.trim() != '') {
            this.setState({ buildingnumberStyle: styles.inputStyle });
            if (this.state.street.trim() == '' || this.state.apartment.trim() == '') {
                this.setState({ saveButtonStyle: styles.saveButtonStyleError });
                this.setState({ saveButtonTextStyle: styles.saveButtonTextStyleError });
            }
            else {
                this.setState({ saveButtonStyle: styles.saveButtonStyle });
                this.setState({ saveButtonTextStyle: styles.saveButtonTextStyle });
            }
        }
        else {
            this.setState({ buildingnumberStyle: styles.inputStyleError });
            this.setState({ saveButtonStyle: styles.saveButtonStyleError });
            this.setState({ saveButtonTextStyle: styles.saveButtonTextStyleError });
        }
    }
    handleapartmentChange(text) {
        this.setState({ apartment: text.trimStart() });
        if (text.trim() != '') {
            this.setState({ apartmentStyle: styles.inputStyle });
            if (this.state.street.trim() == '' || this.state.buildingnumber.trim() == '') {
                this.setState({ saveButtonStyle: styles.saveButtonStyleError });
                this.setState({ saveButtonTextStyle: styles.saveButtonTextStyleError });
            }
            else {
                this.setState({ saveButtonStyle: styles.saveButtonStyle });
                this.setState({ saveButtonTextStyle: styles.saveButtonTextStyle });
            }
        }
        else {
            this.setState({ apartmentStyle: styles.inputStyleError });
            this.setState({ saveButtonStyle: styles.saveButtonStyleError });
            this.setState({ saveButtonTextStyle: styles.saveButtonTextStyleError });
        }
    }
    handleSubmitButton() {
        console.log("Passed Latitude to AddressDetailsConfir::");
        console.log(this.props.latitude);
        console.log("Passed longitude to AddressDetailsConfir::");
        console.log(this.props.longitude);
        // if (this.props.latitude > 37 || this.props.latitude < 32 ||
        //     this.props.longitude > 42 || this.props.longitude < 34) {
        //     this.setState({ modalVisible: false });
        //     this.setState({ street: '', buildingnumber: '', apartment: '' });
        //     Toast.show(i18n.t('notservedinthisarea'), Toast.LONG);
        //     return;
        // }
        if (this.props.country != "Ukraine") {
            this.setState({ modalVisible: false });
            this.setState({ street: '', buildingnumber: '', apartment: '' });
            Toast.show(i18n.t('notservedinthisarea'), Toast.LONG);
            return;
        }
        else {
            this.setState({
                id: this.props.uid,
                street: this.props.ustreet,
                buildingnumber: this.props.ubuildingnumber,
                apartment: this.props.uapartment,
                streetStyle: styles.inputStyle,
                buildingnumberStyle: styles.inputStyle,
                apartmentStyle: styles.inputStyle,
                saveButtonStyle: styles.saveButtonStyle,
                saveButtonTextStyle: styles.saveButtonTextStyle
            });
            this.setState({ modalVisible: true });
        }
    }
    render() {
        return (
            <View >
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={1200}
                    animationOutTiming={200}
                    avoidKeyboard={true}
                    backdropColor='transparent'
                    transparent={true}
                    isVisible={this.state.modalVisible}
                    hideModalContentWhileAnimating={false}
                    coverScreen={true}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    onBackButtonPress={() => this.setState({ modalVisible: false })}
                    onSwipeComplete={() => this.setState({ modalVisible: false })}
                    swipeThreshold={200}
                    swipeDirection="down"
                    onRequestClose={() => {
                        this.setState({ modalVisible: false });
                        // alert('Modal has been closed.');
                    }}>

                    <View style={styles.container}>
                        <View style={{ justifyContent: 'flex-start', marginTop: Normalize(5), marginLeft: Normalize(15) }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    this.setState({ modalVisible: false })
                                }}
                                style={{
                                    backgroundColor: '#fff',
                                    width: Normalize(35),
                                    height: Normalize(35),
                                    position: "absolute",
                                    right: Normalize(15),
                                    top: Normalize(5),
                                    zIndex: 18
                                }}>
                                <FontAwesome name="times" size={Normalize(35)} color="#7a7a7a" />
                            </TouchableOpacity>
                        </View>
                        <FontRegular mystyle={{ color: '#000', fontSize: Normalize(18), left: Normalize(15), top: Normalize(15) }} value={i18n.t('newaddress')}></FontRegular>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: Normalize(20), marginLeft: Normalize(15), marginRight: Normalize(15) }} />
                        <Spacer />
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={this.state.streetStyle}
                                onChangeText={(text) => this.handleStreetChange(text)}
                                value={this.state.street}
                                // underlineColorAndroid="#F6F6F7"
                                placeholder={i18n.t('street')}
                                placeholderTextColor="#aaa"
                                autoCapitalize="sentences"
                                keyboardType="default"
                                maxLength={25}
                                // ref={ref => {
                                //     this._emailinput = ref;
                                // }}
                                returnKeyType="next"
                                // onSubmitEditing={() => this._addressinput && this._addressinput.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={this.state.buildingnumberStyle}
                                onChangeText={(text) => this.handleBuildingnumberChange(text)}
                                value={this.state.buildingnumber}
                                // underlineColorAndroid="#F6F6F7"
                                placeholder={i18n.t('buildingnumber')}
                                placeholderTextColor="#aaa"
                                autoCapitalize="sentences"
                                keyboardType="default"
                                maxLength={25}
                                // ref={ref => {
                                //     this._emailinput = ref;
                                // }}
                                returnKeyType="next"
                                // onSubmitEditing={() => this._addressinput && this._addressinput.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={this.state.apartmentStyle}
                                onChangeText={(text) => this.handleapartmentChange(text)}
                                value={this.state.apartment}
                                // underlineColorAndroid="#F6F6F7"
                                placeholder={i18n.t('apartment')}
                                placeholderTextColor="#aaa"
                                autoCapitalize="sentences"
                                keyboardType="default"
                                maxLength={25}
                                // ref={ref => {
                                //     this._emailinput = ref;
                                // }}
                                returnKeyType="next"
                                // onSubmitEditing={() => this._addressinput && this._addressinput.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                        <TouchableOpacity
                            style={this.state.saveButtonStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                if (this.state.street.trim() == '') {
                                    Toast.show(i18n.t('enterstreet'), Toast.LONG);
                                    return;
                                }
                                if (this.state.buildingnumber.trim() == '') {
                                    Toast.show(i18n.t('enterbuildingnumber'), Toast.LONG);
                                    return;
                                }
                                if (this.state.apartment.trim() == '') {
                                    Toast.show(i18n.t('enterapartment'), Toast.LONG);
                                    return;
                                }
                                this.props.onclick(this.state.street, this.state.buildingnumber, this.state.apartment);
                                this.setState({ modalVisible: false });
                            }}>
                            <FontBold mystyle={this.state.saveButtonTextStyle} value={i18n.t('save')} />

                        </TouchableOpacity>
                    </View>
                </Modal>



                <TouchableOpacity
                    style={styles.confirmbuttonStyle}
                    activeOpacity={0.5}
                    onPress={() => {
                        this.handleSubmitButton();
                    }}>
                    <FontBold mystyle={styles.confirmButtonTextStyle} value={i18n.t('edit')} />
                </TouchableOpacity>
            </View >
        );
    }

}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: Normalize(330),
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#444444aa"
    },
    confirmbuttonStyle: {
        position: 'absolute',
        bottom: Normalize(15),
        left: Normalize(10),
        right: Normalize(10),
        backgroundColor: '#f5c500',
        borderWidth: 1,
        borderColor: '#f5c500',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: Normalize(20),
        marginBottom: Normalize(20),
        height: Normalize(50),
        textAlign: 'center',
        justifyContent: 'center',
    },
    saveButtonStyle: {
        position: 'absolute',
        bottom: Normalize(15),
        left: Normalize(10),
        right: Normalize(10),
        backgroundColor: '#f5c500',
        borderWidth: 1,
        borderColor: '#f5c500',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: Normalize(20),
        marginBottom: Normalize(20),
        height: Normalize(50),
        justifyContent: 'center',
    },
    saveButtonStyleError: {
        position: 'absolute',
        bottom: Normalize(15),
        left: Normalize(10),
        right: Normalize(10),
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: Normalize(20),
        marginBottom: Normalize(20),
        height: Normalize(50),
        textAlign: 'center',
        justifyContent: 'center'
    },
    SectionStyle: {
        flexDirection: 'row',
        height: Normalize(50),
        marginBottom: Normalize(10),
        marginLeft: Normalize(10),
        marginRight: Normalize(10),
        alignItems: 'center',
    },
    saveButtonTextStyle: {
        color: '#fff',
        paddingVertical: Normalize(10),
        fontSize: Normalize(20),
    },
    saveButtonTextStyleError: {
        color: '#7a7a7a',
        paddingVertical: Normalize(10),
        fontSize: Normalize(20),
    },
    confirmButtonTextStyle: {
        color: '#fff',
        fontSize: Normalize(20),
        textAlign: 'center',
        textAlignVertical: "center"
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#000',
        fontSize: Normalize(18),
        padding: Normalize(15),
    },
    inputStyleError: {
        flex: 1,
        color: '#aaa',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#aaa',
        fontSize: Normalize(18),
        padding: Normalize(15),
    },
});








