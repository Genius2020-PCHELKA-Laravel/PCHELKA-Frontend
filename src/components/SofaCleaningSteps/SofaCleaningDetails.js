import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet, View, Switch, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as HCContext } from '../../screens/context/HCContext';
import { Slider, Input } from "react-native-elements";
import { withNamespaces } from 'react-i18next';
import { FontAwesome5, FontAwesome, Octicons } from '@expo/vector-icons';

const SofaCleaningDetails = ({ children, t }) => {
    const { dispatch, state: hcstate } = useContext(HCContext);
    const [quantity, setQuantity] = useState(hcstate.quantity);
    const [materials, setMaterials] = useState(hcstate.materials);
    const [requirematerials, setRequireMaterials] = useState(hcstate.requirematerials);
    const [isEnabled, setIsEnabled] = hcstate.materials == 0 ? useState(false) : useState(true);
    const [desc, setDesc] = useState(hcstate.desc);
    const toggleSwitch = () => setIsEnabled(previoushcstate => !previoushcstate);
    let subtotal = hcstate.subtotal;
    let total = hcstate.total;
    let discount = 0;

    useEffect(() => {
        let isCanceled = false;
        if (isEnabled == true) {
            if (!isCanceled) setMaterials(1);
            if (!isCanceled) setRequireMaterials('Yes');
        }
        else if (isEnabled == false) {
            if (!isCanceled) setMaterials(0);
            if (!isCanceled) setRequireMaterials('No');
        }
        return () => {
            isCanceled = true;
        };
    }, [isEnabled]);

    useEffect(() => {
        let isCanceled = false;
        console.log("qqqqqq " + quantity);
        subtotal = (hcstate.SF.hourPrice * quantity) + (hcstate.materials * hcstate.quantity * hcstate.SF.materialPrice);
        total = (hcstate.SF.hourPrice * quantity) + (hcstate.materials * hcstate.quantity * hcstate.SF.materialPrice);

        subtotal = subtotal - hcstate.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        if (!isCanceled)
            dispatch({ type: 'set_quantity', payload: quantity, });
        if (!isCanceled)
            dispatch({ type: 'update_totals', payload: { subtotal, total, discount }, });
        return () => {
            isCanceled = true;
        };
    }, [quantity]);

    useEffect(() => {
        let isCanceled = false;
        console.log("MMMMMMMM " + materials)
        // console.log(hcstate.materials)
        subtotal = (hcstate.SF.hourPrice * hcstate.quantity) + (materials * hcstate.quantity * hcstate.SF.materialPrice);
        total = (hcstate.SF.hourPrice * hcstate.quantity) + (materials * hcstate.quantity * hcstate.SF.materialPrice);

        subtotal = subtotal - hcstate.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        if (!isCanceled)
            dispatch({ type: 'set_materials', payload: materials, });
        if (!isCanceled)
            dispatch({ type: 'update_totals', payload: { subtotal, total, discount }, });
        return () => {
            isCanceled = true;
        };
    }, [materials]);

    useEffect(() => {
        let isCanceled = false;
        if (!isCanceled)
            dispatch({ type: 'set_desc', payload: desc, });
        return () => {
            isCanceled = true;
        };
    }, [desc]);
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.servicedesccontainer}>
                <View style={{ flexDirection: "row" }}>
                    <FontAwesome5 name="info-circle" size={30} color="#f5c500" style={{ marginRight: 15 }} />
                    <FontBold value={t('whatincluded')} mystyle={{ fontSize: 18 }} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                    <FontLight mystyle={{ fontSize: 16 }} value={t('sofadesc1')} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                    <FontLight mystyle={{ fontSize: 16 }} value={t('sofadesc2')} />
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
            <FontBold mystyle={styles.qText} value={t('sofacleaningq1')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: 15, marginRight: 15 }}>
                <TouchableOpacity onPress={() => setQuantity(2)}><Text style={quantity == 2 ? styles.thumbdown : styles.thumbup}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(3)}><Text style={quantity == 3 ? styles.thumbdown : styles.thumbup}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(4)}><Text style={quantity == 4 ? styles.thumbdown : styles.thumbup}>4</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(5)}><Text style={quantity == 5 ? styles.thumbdown : styles.thumbup}>5</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(6)}><Text style={quantity == 6 ? styles.thumbdown : styles.thumbup}>6</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(7)}><Text style={quantity == 7 ? styles.thumbdown : styles.thumbup}>7</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(8)}><Text style={quantity == 8 ? styles.thumbdown : styles.thumbup}>8</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(9)}><Text style={quantity == 9 ? styles.thumbdown : styles.thumbup}>9</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(10)}><Text style={quantity == 10 ? styles.thumbdown : styles.thumbup}>10</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(11)}><Text style={quantity == 11 ? styles.thumbdown : styles.thumbup}>11</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(12)}><Text style={quantity == 12 ? styles.thumbdown : styles.thumbup}>12</Text></TouchableOpacity>
                {/* <TouchableOpacity onPress={() => setHours(8)}><Text style={quantity == 8 ? styles.thumbdown : styles.thumbup}>8</Text></TouchableOpacity> */}
            </ScrollView>
            <Spacer />

            <FontBold mystyle={styles.qText} value={t('cleaningq3')} />
            <View style={styles.row}>
                <View style={styles.item}>
                    <Switch
                        trackColor={{ false: "#7a7a7a", true: "#f5c500" }}
                        thumbColor={isEnabled ? "#f5c500" : "#f4f3f4"}
                        style={styles.switch}
                        ios_backgroundColor="#7a7a7a"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.item}>
                    <FontRegular mystyle={styles.aText} value={requirematerials} />
                </View>
            </View>

            <Spacer />
            <FontBold mystyle={styles.qText} value={t('cleaningq4')} />
            <TextInput
                value={desc}
                onChangeText={setDesc}
                style={styles.input}
                placeholder={t('cleaningdes')}
                multiline={true}
                numberOfLines={4}
            />

        </ScrollView>);
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        marginLeft: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '25%' // is 50% of container width
    },
    qText: {
        fontSize: 20,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 7,
    },
    aText: {
        fontSize: 14,
    },
    switch: {
        width: 30,
        height: 30,
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    },
    input: {
        marginLeft: 15,
        marginRight: 15,
        height: 100,
        borderColor: '#aaa',
        borderRadius: 7,
        borderWidth: 1,
        fontSize: 18,
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },

    thumbup: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    thumbdown: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#f5c500',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    servicedesccontainer: {
        marginHorizontal: 15,
        marginBottom: 15,
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

export default withNamespaces()(SofaCleaningDetails);