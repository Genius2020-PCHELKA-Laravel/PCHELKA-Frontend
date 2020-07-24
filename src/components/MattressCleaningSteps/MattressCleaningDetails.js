import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet, View, Switch, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import { Context as HCContext } from '../../screens/context/HCContext';
import { Slider, Input } from "react-native-elements";
import { withNamespaces } from 'react-i18next';
import { FontAwesome5, FontAwesome, Octicons } from '@expo/vector-icons';
import { Normalize, fontNormalize } from '../actuatedNormalize';

const MattressCleaningDetails = ({ children, t }) => {
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
        subtotal = (hcstate.MA.hourPrice * quantity) + (hcstate.materials * hcstate.quantity * hcstate.MA.materialPrice);
        total = (hcstate.MA.hourPrice * quantity) + (hcstate.materials * hcstate.quantity * hcstate.MA.materialPrice);

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
        subtotal = (hcstate.MA.hourPrice * hcstate.quantity) + (materials * hcstate.quantity * hcstate.MA.materialPrice);
        total = (hcstate.MA.hourPrice * hcstate.quantity) + (materials * hcstate.quantity * hcstate.MA.materialPrice);

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
            {/* <View style={styles.servicedesccontainer}>
                <View style={{ flexDirection: "row" }}>
                    <FontAwesome5 name="info-circle" size={Normalize(30)} color="#f5c500" style={{ marginRight: Normalize(15) }} />
                    <FontBold value={t('whatincluded')} mystyle={{ fontSize: fontNormalize(18) }} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={Normalize(20)} color="#000" style={{ right: Normalize(5), top: Normalize(8) }} />
                    <FontLight mystyle={{ fontSize: fontNormalize(16) }} value={t('mattressdesc1')} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={Normalize(20)} color="#000" style={{ right: Normalize(5), top: Normalize(8) }} />
                    <FontLight mystyle={{ fontSize: fontNormalize(16) }} value={t('mattressdesc2')} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Octicons name="primitive-dot" size={Normalize(20)} color="#000" style={{ right: Normalize(5), top: Normalize(8) }} />
                    <FontLight mystyle={{ fontSize: fontNormalize(16) }} value={t('mattressdesc3')} />
                </View>
            </View> */}
            <FontBold mystyle={styles.qText} value={t('mattresscleaningq1')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: Normalize(15), marginRight: Normalize(15) }}>
                <TouchableOpacity onPress={() => setQuantity(2)}><FontBold mystyle={quantity == 2 ? styles.thumbdown : styles.thumbup} value={2} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(3)}><FontBold mystyle={quantity == 3 ? styles.thumbdown : styles.thumbup} value={3} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(4)}><FontBold mystyle={quantity == 4 ? styles.thumbdown : styles.thumbup} value={4} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(5)}><FontBold mystyle={quantity == 5 ? styles.thumbdown : styles.thumbup} value={5} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(6)}><FontBold mystyle={quantity == 6 ? styles.thumbdown : styles.thumbup} value={6} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(7)}><FontBold mystyle={quantity == 7 ? styles.thumbdown : styles.thumbup} value={7} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(8)}><FontBold mystyle={quantity == 8 ? styles.thumbdown : styles.thumbup} value={8} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(9)}><FontBold mystyle={quantity == 9 ? styles.thumbdown : styles.thumbup} value={9} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(10)}><FontBold mystyle={quantity == 10 ? styles.thumbdown : styles.thumbup} value={10} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(11)}><FontBold mystyle={quantity == 11 ? styles.thumbdown : styles.thumbup} value={11} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(12)}><FontBold mystyle={quantity == 12 ? styles.thumbdown : styles.thumbup} value={12} /></TouchableOpacity>
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
            <Spacer />
            <Spacer />
            <Spacer />
        </ScrollView>);
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        marginLeft: Normalize(50),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '25%' // is 50% of container width
    },
    qText: {
        fontSize: fontNormalize(18),
        marginLeft: Normalize(15),
        marginRight: Normalize(15),
        marginBottom: Normalize(7),
    },
    aText: {
        fontSize: fontNormalize(12),
    },
    switch: {
        width: Normalize(30),
        height: Normalize(30),
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    },
    input: {
        marginLeft: Normalize(15),
        marginRight: Normalize(15),
        height: Normalize(100),
        borderColor: '#aaa',
        borderRadius: 7,
        borderWidth: 1,
        fontSize: fontNormalize(16),
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingLeft: Normalize(10),
        paddingRight: Normalize(10),
        paddingTop: Normalize(10)
    },

    thumbup: {
        fontSize: fontNormalize(20),
        width: Normalize(48),
        height: Normalize(48),
        borderRadius: Normalize(48) / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: Normalize(5)
    },
    thumbdown: {
        fontSize: fontNormalize(20),
        width: Normalize(48),
        height: Normalize(48),
        borderRadius: Normalize(48) / 2,
        backgroundColor: '#f5c500',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: Normalize(5)
    },
    servicedesccontainer: {
        marginHorizontal: Normalize(15),
        marginBottom: Normalize(15),
        padding: Normalize(15),
        borderColor: '#7a7a7a',
        borderWidth: 0,
        shadowColor: '#7a7a7a',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: Normalize(10),
            width: 0
        },
        elevation: 2,
        shadowRadius: Normalize(10),
    },
});

export default withNamespaces()(MattressCleaningDetails);