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
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
// import { Context as HCContext } from '../screens/context/HCContext';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import { withNamespaces } from 'react-i18next';
import Toast from 'react-native-simple-toast';

export default class AddressDetailsConfirm extends React.Component {
    //const [modalVisible, setModalVisible] = useState(false);
    // const { state, getprice0, getprice1, getprice2 } = useContext(HCContext);
    constructor(props) {
        super(props);
        this.state = { modalVisible: false, sbf: '' };
        //this.handleSubmitButton();
    }
    handleSubmitButton() {
        console.log("Passed Latitude to AddressDetailsConfir::");
        console.log(this.props.latitude);
        console.log("Passed longitude to AddressDetailsConfir::");
        console.log(this.props.longitude);
        if (this.props.latitude > 37 || this.props.latitude < 32 ||
            this.props.longitude > 42 || this.props.longitude < 34) {
            this.setState({ modalVisible: false });
            this.setState({ sbf: '' });
            Toast.show("Not served in this region", Toast.LONG);
            return;
        }
        else {

            this.setState({ sbf: '' });
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
                            <TouchableOpacity
                                style={{ backgroundColor: "#ff9800" }}
                                onPress={() => {
                                    this.setState({ modalVisible: false })
                                }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Entypo name="chevron-down" size={35} color="#dcdcdc" />
                                </View>
                            </TouchableOpacity>
                            <FontRegular mystyle={{ color: '#dcdcdc', fontSize: 21, left: 15 }} value='addressdetails'></FontRegular>
                            <View style={{ borderBottomColor: '#dcdcdc', borderBottomWidth: 1, }} />
                            <Spacer />
                            <View style={styles.SectionStyle}>

                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(text) => this.setState({ sbf: text })}
                                    value={this.state.sbf}
                                    // underlineColorAndroid="#F6F6F7"
                                    placeholder='Street @ Building @ Flatnumber'
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    // ref={ref => {
                                    //     this._emailinput = ref;
                                    // }}
                                    returnKeyType="next"
                                    // onSubmitEditing={() => this._addressinput && this._addressinput.focus()}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.savebuttonStyle}
                                activeOpacity={0.5}
                                onPress={() => {
                                    if (this.state.sbf.trim() == '') {
                                        Toast.show('Enter Street @ BuildingNumber @ Apartment', Toast.LONG);
                                        return;
                                    }
                                    this.props.onclick(this.state.sbf);
                                    this.setState({ modalVisible: false });
                                }}>
                                <Text style={styles.buttonTextStyle}>save</Text>
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
                    <Text style={styles.buttonTextStyle}>Confirm</Text>
                </TouchableOpacity>
            </View >
        );
    }


}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: 250,
        width: '100%',
        bottom: 0
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
        backgroundColor: '#ff9800',
        borderWidth: 0,
        borderColor: '#ff9800',
        alignItems: 'center',
        borderRadius: 30,
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
        marginLeft: 10,
        marginRight: 10,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 22,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dcdcdc',
        fontSize: 20,
        padding: 10,
        height: 50
    },
});








