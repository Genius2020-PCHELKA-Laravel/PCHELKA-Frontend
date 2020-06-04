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
        if (form.valid) {
            console.log(form);
            // setValid(form.valid);
            // setCVC(form.values.cvc);
            var parts = form.values.expiry.split("/");
            // setExpiryMonth(parts[0]);
            // setExpiryYear(parts[1]);
            // setNumber(form.values.number);

            dispatch({ type: 'set_valid', payload: form.valid });
            dispatch({ type: 'set_card', payload: form.values.number });
            dispatch({ type: 'set_card_exp_month', payload: parts[0] });
            dispatch({ type: 'set_card_exp_year', payload: parts[1] });
            dispatch({ type: 'set_card_cvv', payload: form.values.cvc });
        }

    }

    useEffect(() => {
        if (hcstate.method == 0)
            setShowCard(true);
        else
            setShowCard(false);
    }, []);
    useEffect(() => {
        dispatch({
            type: 'set_method',
            payload: method,
        });
        var subtotal = (hcstate.HC.hourPrice * hcstate.hours * hcstate.cleaners) + (hcstate.hours * hcstate.materials * hcstate.HC.materialPrice);
        var total = (hcstate.HC.hourPrice * hcstate.hours * hcstate.cleaners) + (hcstate.hours * hcstate.materials * hcstate.HC.materialPrice);
        var discount = hcstate.discount;

        // var subtotal = hcstate.subtotal;
        // var total = hcstate.total;
        if (method == -1)
            return;
        if (method == 0) {
            dispatch({
                type: 'update_totals',
                payload: { subtotal, total, discount },
            });
        }
        if (method == 1) {
            setCashPressed(true);
            subtotal = parseFloat(subtotal) + 5.0;
            total = parseFloat(total) + 5.0;
            var discount = hcstate.discount;
            dispatch({
                type: 'update_totals',
                payload: { subtotal, total, discount },
            });
        }
        console.log(cashPressed)

    }, [method]);
    return (
        <ScrollView>
            <TouchableOpacity onPress={() => { setShowCard(true); setMethod(0) }}>
                <Spacer>
                    <View>
                        <View style={{ flexDirection: 'row', fontSize: 24 }}>
                            <RadioButton value="0" status={hcstate.method == '0' ? 'checked' : 'unchecked'} />
                            <FontBold value={t('paymentq1')} mystyle={{ fontSize: 24 }}></FontBold>
                        </View>
                        <FontLight value={t('paymentq1details')} mystyle={{ color: 'green', fontSize: 11, marginLeft: 35 }}></FontLight>
                    </View>
                </Spacer>
            </TouchableOpacity>
            {/* <Liqpay /> */}
            {/* <LiteCreditCardInput onChange={_onChange} autoFocus={false} cardScale={8} /> */}

            {showCard ? <LiteCreditCardInput onChange={_onChange} autoFocus={false} cardScale={4} /> : null}


            <TouchableOpacity onPress={() => { setShowCard(false); setMethod(1) }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value="1" status={hcstate.method == '1' ? 'checked' : 'unchecked'} />
                        <FontBold value={t('paymentq2')} mystyle={{ fontSize: 24 }}></FontBold>
                    </View>
                    <FontLight value={t('paymentq2details')} mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
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