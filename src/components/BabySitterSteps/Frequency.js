import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as HCContext } from '../../screens/context/HCContext';
import { withNamespaces } from 'react-i18next';
import { FontAwesome5, FontAwesome, Octicons } from '@expo/vector-icons';

const Frequency = ({ children, t }) => {
    const { dispatch, state: hcstate } = useContext(HCContext);
    const [frequency, setFrequency] = useState(hcstate.frequency);
    let subtotal = hcstate.subtotal;
    let discount = hcstate.discount;
    let total = hcstate.total;

    useEffect(() => {
        console.log("FFFFFFFFFFF " + hcstate.frequency)
        console.log("Frequency hcstate hour price:: ");
        console.log(hcstate.BS.hourPrice);
    }, [])

    useEffect(() => {
        dispatch({
            type: 'set_frequency',
            payload: frequency,
        });

        subtotal = (hcstate.BS.hourPrice * hcstate.hours * hcstate.cleaners);
        total = (hcstate.BS.hourPrice * hcstate.hours * hcstate.cleaners);
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
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.servicedesccontainer}>
                <FontAwesome5 name="info-circle" size={30} color="#f5c500" style={{ left: 5, top: 5 }} />
                <Spacer >
                    <FontBold value={t('whatincluded')} mystyle={{ fontSize: 18 }} />
                </Spacer>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                    <FontLight mystyle={{ fontSize: 16 }} value={t('babydesc1')} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                    <FontLight mystyle={{ fontSize: 16 }} value={t('babydesc2')} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                    <FontLight mystyle={{ fontSize: 16 }} value={t('babydesc3')} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                    <FontLight mystyle={{ fontSize: 16 }} value={t('babydesc4')} />
                </View>
                {/* <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.policybuttonStyle}
                        activeOpacity={0.5}
                        onPress={() => {
                            // navigate('whatsincluded');
                        }}>
                        <Spacer />
                        <FontLight mystyle={{
                            textDecorationLine: 'underline',
                            textDecorationStyle: "solid",
                            textDecorationColor: "blue",
                            textAlign: "center",
                            color: "blue"
                        }}
                            value={t('viewmore')}
                        />
                    </TouchableOpacity>
                </View> */}
            </View>
            <TouchableOpacity onPress={() => { setFrequency(1) }}>
                <Spacer>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="1" status={hcstate.frequency == 1 ? 'checked' : 'unchecked'} />
                            <FontBold value={t('onetime')} mystyle={{ fontSize: 20 }}></FontBold>
                        </View>
                        <FontLight value={t('babyontimedetails')} mystyle={{ color: 'gray', fontSize: 14, marginLeft: 35 }}></FontLight>
                    </View>
                </Spacer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFrequency(2) }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value='2' status={hcstate.frequency == 2 ? 'checked' : 'unchecked'} />
                        <FontBold value={t('biweekly')} mystyle={{ fontSize: 20 }}></FontBold>
                    </View>
                    <FontLight value={t('babybiweeklydetails')} mystyle={{ color: 'gray', fontSize: 14, marginLeft: 35 }}></FontLight>
                    <FontLight mystyle={styles.DiscountStyle} value={t('5off')}></FontLight>
                </Spacer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFrequency(3) }}>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value='3' status={hcstate.frequency == 3 ? 'checked' : 'unchecked'} />
                        <FontBold value={t('weekly')} mystyle={{ fontSize: 20 }}></FontBold>

                    </View>
                    <FontLight value={t('babyweeklydetails')} mystyle={{ color: 'gray', fontSize: 14, marginLeft: 35 }}></FontLight>
                    <FontLight mystyle={styles.DiscountStyle} value={t('10off')}></FontLight>
                </Spacer>
            </TouchableOpacity>

        </ScrollView>);
};

const styles = StyleSheet.create({
    DiscountStyle: {
        textAlignVertical: "center",
        margin: 5,
        position: "absolute",
        top: 0,
        left: 265,
        height: 30,
        width: 75,
        backgroundColor: '#f5c500',
        borderRadius: 14,
        borderWidth: 0,
        borderColor: '#7a7a7a',
        color: '#7a7a7a',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 11,
        // fontFamily: 'Comfortaa-Bold',
        shadowColor: '#7a7a7a',
        fontWeight: 'bold',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 10
        },
        elevation: 2,
        shadowRadius: 25,
    },
    servicedesccontainer: {
        margin: 18,
        padding: 15,
        borderColor: '#7a7a7a',
        borderWidth: 0,
        shadowColor: '#7a7a7a',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        elevation: 2,
        shadowRadius: 10,
    },
});

export default withNamespaces()(Frequency);