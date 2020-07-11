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
// import Liqpay from '../Liqpay';
import { withNamespaces } from 'react-i18next';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const Payment = ({ children, t }) => {
    const { dispatch, state: hcstate } = useContext(HCContext);
    const [method, setMethod] = useState(hcstate.method);
    const [showCard, setShowCard] = useState(hcstate.method);
    const [cashPressed, setCashPressed] = useState(false);
    // const [valid, setValid] = useState(false);
    // const [cvc, setCVC] = useState('');
    // const [expiryMonth, setExpiryMonth] = useState('');
    // const [expiryYear, setExpiryYear] = useState('');
    // const [number, setNumber] = useState('');

    const _onChange = (form) => {
        let isCanceled = false;
        if (form.valid) {
            console.log(form);
            // setValid(form.valid);
            // setCVC(form.values.cvc);
            var parts = form.values.expiry.split("/");
            // setExpiryMonth(parts[0]);
            // setExpiryYear(parts[1]);
            // setNumber(form.values.number);
            if (!isCanceled)
                dispatch({ type: 'set_valid', payload: form.valid });
            if (!isCanceled)
                dispatch({ type: 'set_card', payload: form.values.number });
            if (!isCanceled)
                dispatch({ type: 'set_card_exp_month', payload: parts[0] });
            if (!isCanceled)
                dispatch({ type: 'set_card_exp_year', payload: parts[1] });
            if (!isCanceled)
                dispatch({ type: 'set_card_cvv', payload: form.values.cvc });

        }
        return () => {
            isCanceled = true;
        };
    }

    useEffect(() => {
        let isCanceled = false;
        if (hcstate.method == 0) {
            if (!isCanceled)
                setShowCard(true);
        }
        else {
            if (!isCanceled)
                setShowCard(false);
        }
        return () => {
            isCanceled = true;
        };
    }, []);
    useEffect(() => {
        let isCanceled = false;
        if (!isCanceled)
            dispatch({ type: 'set_method', payload: method, });
        var subtotal = (hcstate.CA.hourPrice * hcstate.squaremeters) + (hcstate.materials * hcstate.squaremeters * hcstate.CA.materialPrice);
        var total = (hcstate.CA.hourPrice * hcstate.squaremeters) + (hcstate.materials * hcstate.squaremeters * hcstate.CA.materialPrice);
        var discount = 0;
        // var subtotal = hcstate.subtotal;
        // var total = hcstate.total;
        if (method == -1)
            return;
        if (method == 0) {
            if (!isCanceled)
                setCashPressed(false);
            subtotal = (parseFloat(subtotal) + 0.0).toFixed(2);
            total = (parseFloat(total) + 0.0).toFixed(2);
            discount = (parseFloat(discount)).toFixed(2);
            if (!isCanceled)
                dispatch({ type: 'update_totals', payload: { subtotal, total, discount }, });
        }
        if (method == 1) {
            if (!isCanceled)
                setCashPressed(true);
            subtotal = (parseFloat(subtotal) + 5.0).toFixed(2);
            total = (parseFloat(total) + 5.0).toFixed(2);
            discount = (parseFloat(discount)).toFixed(2);
            if (!isCanceled)
                dispatch({ type: 'update_totals', payload: { subtotal, total, discount }, });
        }
        console.log(cashPressed)
        return () => {
            isCanceled = true;
        };
    }, [method]);
    return (
        <ScrollView>
            <TouchableOpacity onPress={() => { setShowCard(true); setMethod(0) }}>
                <Spacer>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                                <RadioButton onPress={() => { setShowCard(true); setMethod(0) }} value="0" status={hcstate.method == '0' ? 'checked' : 'unchecked'} />
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                                <FontBold value={t('paymentq1')} mystyle={{ fontSize: 20 }}></FontBold>
                            </View>
                        </View>
                        <FontLight value={t('paymentq1details')} mystyle={{ color: '#228B22', fontSize: 14, marginLeft: 35 }}></FontLight>
                    </View>
                </Spacer>
            </TouchableOpacity>
            {/* <Liqpay /> */}
            {/* <LiteCreditCardInput onChange={_onChange} autoFocus={false} cardScale={8} /> */}

            {showCard ? <LiteCreditCardInput onChange={_onChange} autoFocus={false} cardScale={4} /> : null}


            <TouchableOpacity onPress={() => { setShowCard(false); setMethod(1) }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                            <RadioButton onPress={() => { setShowCard(false); setMethod(1) }} value="1" status={hcstate.method == '1' ? 'checked' : 'unchecked'} />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                            <FontBold value={t('paymentq2')} mystyle={{ fontSize: 20 }}></FontBold>
                        </View>
                    </View>
                    <FontLight value={t('paymentq2details')} mystyle={{ color: 'gray', fontSize: 14, marginLeft: 35 }}></FontLight>
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
        backgroundColor: '#ff9800',
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

export default withNamespaces()(Payment);