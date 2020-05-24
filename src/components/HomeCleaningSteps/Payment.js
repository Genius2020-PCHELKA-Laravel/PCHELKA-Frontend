import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as HCContext } from '../../screens/context/HCContext';
import { ScrollView } from 'react-native-gesture-handler';
// import { LiqpayCheckout } from 'react-native-liqpay';
// import LiqpayComponent from '../LiqpayComponent';

const Payment = ({ children }) => {
    const { dispatch, state } = useContext(HCContext);
    const [method, setMethod] = useState(state.method);

    useEffect(() => {
        dispatch({
            type: 'set_method',
            payload: method,
        });
    }, [method]);
    return (
        <ScrollView>
            <TouchableOpacity onPress={() => { setMethod(0) }}>
                <Spacer>
                    <View>
                        <View style={{ flexDirection: 'row', fontSize: 24 }}>
                            <RadioButton value="0" status={state.method == '0' ? 'checked' : 'unchecked'} />
                            <FontBold value='Pay by credit/debit card' mystyle={{ fontSize: 24 }}></FontBold>
                        </View>
                        <FontLight value='insurance when you pay onine UAH 1000 Learn More' mystyle={{ color: 'green', fontSize: 11, marginLeft: 35 }}></FontLight>
                    </View>
                </Spacer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMethod(1) }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value="1" status={state.method == '1' ? 'checked' : 'unchecked'} />
                        <FontBold value='Pay With Cache' mystyle={{ fontSize: 24 }}></FontBold>
                    </View>
                    <FontLight value='Pay with cache (+5 UAH)' mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                </Spacer>
            </TouchableOpacity>
        </ScrollView>);
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item1: {
        width: '70%' // is 50% of container width
    },
    item2: {
        paddingHorizontal: 10,
        width: '30%' // is 50% of container width
    },
    text: {
        fontSize: 30
    },
    textAddressStyle: {
        margin: 5,
        position: "absolute",
        backgroundColor: '#ddd',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: "500",
        // fontFamily: 'Comfortaa-Bold',
        padding: 5,
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    btnAddressStyle: {
        margin: 5,
        position: "absolute",
        height: 30,
        backgroundColor: '#f1c40f',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DAA520',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "500",
        // fontFamily: 'Comfortaa-Bold',
        padding: 5,
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
});

export default Payment;