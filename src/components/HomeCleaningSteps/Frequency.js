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
import { withNamespaces } from 'react-i18next';
import { Normalize, fontNormalize } from '../actuatedNormalize';

const Frequency = ({ children, t }) => {
    const { dispatch, state: hcstate } = useContext(HCContext);
    const [frequency, setFrequency] = useState(hcstate.frequency);
    let subtotal = hcstate.subtotal;
    let discount = hcstate.discount;
    let total = hcstate.total;

    useEffect(() => {
        console.log("FFFFFFFFFFF " + hcstate.frequency)
        console.log("Frequency hcstate hour price:: ");
        console.log(hcstate.HC.hourPrice);
        console.log("Frequency hcstate hour material price:: ");
        console.log(hcstate.HC.materialPrice);
    }, [])

    useEffect(() => {
        dispatch({
            type: 'set_frequency',
            payload: frequency,
        });

        subtotal = (hcstate.HC.hourPrice * hcstate.hours * hcstate.cleaners) + (hcstate.hours * hcstate.materials * hcstate.HC.materialPrice);
        total = (hcstate.HC.hourPrice * hcstate.hours * hcstate.cleaners) + (hcstate.hours * hcstate.materials * hcstate.HC.materialPrice);
        if (frequency == 2) {
            total = total * 2;
            discount = total * 0.05;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        else if (frequency == 3) {
            total = total * 4;
            discount = total * 0.1;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        subtotal = subtotal - hcstate.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        console.log("sub>>>>>" + subtotal);
        console.log("total>>>>>>>>" + total);
        dispatch({
            type: 'update_totals',
            payload: { subtotal, total, discount },
        });
        console.log("Discount: " + discount)
    }, [frequency]);
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* <Text>{frequency}</Text>
            <Text>Frequency:{hcstate.frequency}</Text>
            <Text>Price:{hcstate.price}</Text>
            <Text>Total::{hcstate.total}</Text> */}
            {/* <RadioButton.Group
                onValueChange={setFrequency}
                value={hcstate.frequency}
            > */}
            <TouchableOpacity onPress={() => { setFrequency(1) }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                            <RadioButton onPress={() => { setFrequency(1) }} value="1" status={hcstate.frequency == 1 ? 'checked' : 'unchecked'} />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                            <FontBold value={t('onetime')} mystyle={{ fontSize: fontNormalize(18) }}></FontBold>
                        </View>
                    </View>
                    <FontLight value={t('ontimedetails')} mystyle={{ color: '#7a7a7a', fontSize: fontNormalize(14), marginLeft: Normalize(35) }}></FontLight>
                </Spacer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFrequency(2) }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                            <RadioButton onPress={() => { setFrequency(2) }} value='2' status={hcstate.frequency == 2 ? 'checked' : 'unchecked'} />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                            <FontBold value={t('biweekly')} mystyle={{ fontSize: fontNormalize(18) }}></FontBold>
                        </View>
                    </View>
                    <FontLight value={t('biweeklydetails')} mystyle={{ color: '#7a7a7a', fontSize: fontNormalize(14), marginLeft: Normalize(35) }}></FontLight>
                    <FontLight mystyle={styles.DiscountStyle} value={t('5off')}></FontLight>
                </Spacer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFrequency(3) }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                            <RadioButton onPress={() => { setFrequency(3) }} value='3' status={hcstate.frequency == 3 ? 'checked' : 'unchecked'} />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                            <FontBold value={t('weekly')} mystyle={{ fontSize: fontNormalize(18) }}></FontBold>
                        </View>
                    </View>
                    <FontLight value={t('weeklydetails')} mystyle={{ color: '#7a7a7a', fontSize: fontNormalize(14), marginLeft: Normalize(35) }}></FontLight>
                    <FontLight mystyle={styles.DiscountStyle} value={t('10off')}></FontLight>
                </Spacer>
            </TouchableOpacity>
        </View>);
};

const styles = StyleSheet.create({
    DiscountStyle: {
        margin: Normalize(5),
        position: "absolute",
        top: 0,
        left: Normalize(265),
        height: Normalize(30),
        width: Normalize(75),
        backgroundColor: '#f5c500',
        borderRadius: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        borderColor: '#7a7a7a',
        color: '#fff',
        textAlignVertical: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: fontNormalize(11),
        // fontFamily: 'Comfortaa-Bold',
        padding: Normalize(5),
        shadowColor: '#2AC062',
        fontWeight: 'bold',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: Normalize(10),
            width: 0
        },
        elevation: 3,
        shadowRadius: 25,
    },
});

export default withNamespaces()(Frequency);