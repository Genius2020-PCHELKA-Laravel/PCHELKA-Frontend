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

const Frequency = ({ children, t }) => {
    const { dispatch, state } = useContext(HCContext);
    const [frequency, setFrequency] = useState(state.frequency);
    let subtotal = state.subtotal;
    let discount = state.discount;
    let total = state.total;
    // console.log(">>>>>>>>>><<<<<<<<<<<<<<<<<" + state.materials);

    // useEffect(() => {
    // }, []);
    // useEffect(() => {
    //     dispatch({
    //         type: 'set_frequency',
    //         payload: state.frequency,
    //     });
    // }, []);
    useEffect(() => {
        dispatch({
            type: 'set_frequency',
            payload: frequency,
        });
        console.log("FFFFFFFFFFF " + frequency)
        subtotal = (state.price * state.hours * state.cleaners) + state.materials;
        total = (state.price * state.hours * state.cleaners) + state.materials;
        // console.log("sub" + subtotal);
        // console.log("total" + total);
        if (frequency == 'Bi-weekly') {
            total = total * 2;
            discount = total * 0.05;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        else if (frequency == 'Weekly') {
            total = total * 4;
            discount = total * 0.1;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        subtotal = subtotal - state.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        // console.log("sub>>>>>" + subtotal);
        // console.log("total>>>>>>>>" + total);
        dispatch({
            type: 'update_totals',
            payload: { subtotal, total, discount },
        });
        console.log("Discount: " + discount)
    }, [frequency]);
    return (
        <View style={{ flex: 1 }}>
            {/* <Text>{frequency}</Text>
            <Text>Frequency:{state.frequency}</Text>
            <Text>Price:{state.price}</Text>
            <Text>Total::{state.total}</Text> */}
            {/* <RadioButton.Group
                onValueChange={setFrequency}
                value={state.frequency}
            > */}
            <TouchableOpacity onPress={() => { setFrequency('One-time') }}>
                <Spacer>
                    <View>
                        <View style={{ flexDirection: 'row', fontSize: 24 }}>
                            <RadioButton value="One-time" status={state.frequency == 'One-time' ? 'checked' : 'unchecked'} />
                            <FontBold value={t('onetime')} mystyle={{ fontSize: 24 }}></FontBold>
                        </View>
                        <FontLight value={t('ontimedetails')} mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                    </View>
                </Spacer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFrequency('Bi-weekly') }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value='Bi-weekly' status={state.frequency == 'Bi-weekly' ? 'checked' : 'unchecked'} />
                        <FontBold value={t('biweekly')} mystyle={{ fontSize: 24 }}></FontBold>
                    </View>
                    <FontLight value={t('biweeklydetails')} mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                    <FontLight mystyle={styles.DiscountStyle} value={t('5off')}></FontLight>
                </Spacer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFrequency('Weekly') }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value='Weekly' status={state.frequency == 'Weekly' ? 'checked' : 'unchecked'} />
                        <FontBold value={t('weekly')} mystyle={{ fontSize: 24 }}></FontBold>

                    </View>
                    <FontLight value={t('weeklydetails')} mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                    <FontLight mystyle={styles.DiscountStyle} value={t('10off')}></FontLight>
                </Spacer>
            </TouchableOpacity>
            {/* </RadioButton.Group> */}


            {/* <Footer>
                <FooterTab>
                    <Icon
                        raised
                        name='heartbeat'
                        type='font-awesome'
                        color='#f50'
                        style={{
                            marginBottom: 40
                        }}
                        onPress={() => { navigation.navigate('cleanindetailsscreen') }} />

                    <Text>Total $:</Text>

                </FooterTab>
            </Footer> */}
        </View>);
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    DiscountStyle: {
        margin: 5,
        position: "absolute",
        top: 0,
        left: 265,
        height: 30,
        width: 75,
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

export default withNamespaces()(Frequency);