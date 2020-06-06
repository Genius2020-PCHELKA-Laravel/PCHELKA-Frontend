import React, { Component, useState, useContext, useEffect } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    TouchableOpacity,
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

export default class AddressDetailsConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false, street: '', buildingnumber: '', apartment: '' };
    }
    handleSubmitButton() {
        console.log("Passed Latitude to AddressDetailsConfir::");
        console.log(this.props.latitude);
        console.log("Passed longitude to AddressDetailsConfir::");
        console.log(this.props.longitude);
        if (this.props.latitude > 37 || this.props.latitude < 32 ||
            this.props.longitude > 42 || this.props.longitude < 34) {
            this.setState({ modalVisible: false });
            this.setState({ street: '', buildingnumber: '', apartment: '' });
            Toast.show("Not served in this region", Toast.LONG);
            return;
        }
        else {
            this.setState({ street: '', buildingnumber: '', apartment: '' });
            this.setState({ modalVisible: true });
        }
    }
    render() {
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }} >
                    <View style={styles.wrapper}>

                        <View style={styles.container}>
                            <View style={{ justifyContent: 'flex-start', marginTop: 5, marginLeft: 15 }}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        this.setState({ modalVisible: false })
                                    }}
                                    style={{
                                        backgroundColor: '#fff',
                                    }}>
                                    <FontAwesome name="times" size={35} color="#7a7a7a" />
                                </TouchableOpacity>
                            </View>
                            <FontRegular mystyle={{ color: '#000', fontSize: 21, left: 15 }} value={i18n.t('addnewaddress')}></FontRegular>
                            <View style={{ borderBottomColor: '#ff9800', borderBottomWidth: 1, marginTop: 5, marginLeft: 15, marginRight: 15 }} />
                            <Spacer />
                            <View style={styles.SectionStyle}>

                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(text) => this.setState({ street: text })}
                                    value={this.state.street}
                                    // underlineColorAndroid="#F6F6F7"
                                    placeholder={i18n.t('street')}
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="none"
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
                                    style={styles.inputStyle}
                                    onChangeText={(text) => this.setState({ buildingnumber: text })}
                                    value={this.state.buildinnumber}
                                    // underlineColorAndroid="#F6F6F7"
                                    placeholder={i18n.t('buildingnumber')}
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="none"
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
                                    style={styles.inputStyle}
                                    onChangeText={(text) => this.setState({ apartment: text })}
                                    value={this.state.apartment}
                                    // underlineColorAndroid="#F6F6F7"
                                    placeholder={i18n.t('apartment')}
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="none"
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
                                style={styles.confirmbuttonStyle}
                                activeOpacity={0.5}
                                onPress={() => {
                                    if (this.state.street.trim() == '') {
                                        Toast.show(i18n.t('enteraddress'), Toast.LONG);
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
                                <FontBold mystyle={styles.buttonTextStyle} value={i18n.t('save')} />

                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>



                <TouchableOpacity
                    style={styles.confirmbuttonStyle}
                    activeOpacity={0.5}
                    onPress={() => {
                        this.handleSubmitButton();
                    }}>
                    <FontBold mystyle={styles.buttonTextStyle} value={i18n.t('confirm')} />
                </TouchableOpacity>
            </View >
        );
    }


}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: 360,
        width: '100%',
        bottom: 0,
        borderRadius: 14
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmbuttonStyle: {
        position: 'absolute',
        bottom: 15,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    savebuttonStyle: {
        position: 'absolute',
        bottom: 35,
        left: 10,
        right: 10,
        backgroundColor: '#dcdcd0',
        borderWidth: 0,
        borderColor: '#dcdcdc',
        alignItems: 'center',
        borderRadius: 30,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: '#7a7a7a',
        paddingVertical: 10,
        fontSize: 22,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#f5c500',
        fontSize: 20,
        padding: 15,
    },
});








