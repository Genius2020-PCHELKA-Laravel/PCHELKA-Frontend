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

const Frequency = ({ children }) => {
    const { dispatch, state } = useContext(HCContext);
    const [frequency, setFrequency] = useState(state.frequency);
    let subtotal = state.subtotal;
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
        console.log("FFFFFFFFFFF " + state.frequency)
        subtotal = (parseFloat(state.price) * parseFloat(state.hours) * parseFloat(state.cleaners)) + parseFloat(state.materials);
        total = (parseFloat(state.price) * parseFloat(state.hours) * parseFloat(state.cleaners)) + parseFloat(state.materials);
        // console.log("sub" + subtotal);
        // console.log("total" + total);
        if (frequency == 'Bi-weekly') {
            subtotal = subtotal * 2;
            total = subtotal - (subtotal * 0.05);
        }
        else if (frequency == 'Weekly') {
            subtotal = subtotal * 4;
            total = subtotal - (subtotal * 0.1);
        }
        total = total - state.VAT;
        // console.log("sub>>>>>" + subtotal);
        // console.log("total>>>>>>>>" + total);
        dispatch({
            type: 'update_totals',
            payload: { subtotal, total },
        });
    }, [frequency]);
    return (
        <View style={{ flex: 1 }}>
            {/* <Text>{frequency}</Text>
            <Text>Frequency:{state.frequency}</Text>
            <Text>Price:{state.price}</Text>
            <Text>Total::{state.total}</Text> */}
            <RadioButton.Group
                onValueChange={setFrequency}
                value={state.frequency}
            >
                <Spacer>
                    <View>
                        <View style={{ flexDirection: 'row', fontSize: 24 }}>
                            <RadioButton value="One-time" status={state.frequency == 'One-time' ? 'checked' : 'unchecked'} />
                            <FontBold value='One-time' mystyle={{ fontSize: 24 }}></FontBold>
                        </View>
                        <FontLight value='Book cleaning for one time only' mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                    </View>
                </Spacer>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value="Bi-weekly" status={state.frequency == 'Bi-weekly' ? 'checked' : 'unchecked'} />
                        <FontBold value='Bi-weekly' mystyle={{ fontSize: 24 }}></FontBold>
                    </View>
                    <FontLight value='Book a recurring cleaning with the same cleaner every two-weeks' mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                    <FontLight mystyle={styles.DiscountStyle} value="5% off"></FontLight>
                </Spacer>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value="Weekly" status={state.frequency == 'Weekly' ? 'checked' : 'unchecked'} />
                        <FontBold value='Weekly' mystyle={{ fontSize: 24 }}></FontBold>

                    </View>
                    <FontLight value='Book a recurring with the same cleaner every week' mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                    <FontLight mystyle={styles.DiscountStyle} value="10% off"></FontLight>
                </Spacer>
            </RadioButton.Group>


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
        left: 160,
        height: 30,
        width: 60,
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

export default Frequency;