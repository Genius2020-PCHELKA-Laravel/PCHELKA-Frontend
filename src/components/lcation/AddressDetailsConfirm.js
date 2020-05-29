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
        this.state = { modalVisible: false, street: '', buildingnumber: '', apartment: '' };
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
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: 5 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ modalVisible: false })
                                    }}
                                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9800', borderRadius: 35, width: '25%' }}>
                                    <Entypo name="chevron-down" size={35} color="#f5f5f7" />
                                </TouchableOpacity>
                            </View>
                            <FontRegular mystyle={{ color: '#000', fontSize: 21, left: 15 }} value='Add New Address'></FontRegular>
                            <View style={{ borderBottomColor: '#ff9800', borderBottomWidth: 1, }} />
                            <Spacer />
                            <View style={styles.SectionStyle}>

                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(text) => this.setState({ street: text })}
                                    value={this.state.street}
                                    // underlineColorAndroid="#F6F6F7"
                                    placeholder='Street'
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="none"
                                    keyboardType="default"
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
                                    placeholder='Building Number'
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="none"
                                    keyboardType="default"
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
                                    placeholder='Apartment'
                                    placeholderTextColor="#aaa"
                                    autoCapitalize="none"
                                    keyboardType="default"
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
                                        Toast.show('Enter Street ', Toast.LONG);
                                        return;
                                    }
                                    if (this.state.buildingnumber.trim() == '') {
                                        Toast.show('Enter Building Number', Toast.LONG);
                                        return;
                                    }
                                    if (this.state.apartment.trim() == '') {
                                        Toast.show('Enter Apartment', Toast.LONG);
                                        return;
                                    }
                                    this.props.onclick(this.state.street, this.state.buildingnumber, this.state.apartment);
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
        height: 360,
        width: '100%',
        bottom: 0,
        borderRadius: 35
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
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 22,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dcdcdc',
        fontSize: 20,
        padding: 15,
    },
});








