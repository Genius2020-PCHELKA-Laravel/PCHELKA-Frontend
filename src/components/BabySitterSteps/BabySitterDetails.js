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

const HomeCleaningDetails = ({ children, t }) => {
    const { dispatch, state: hcstate } = useContext(HCContext);
    const [hours, setHours] = useState(hcstate.hours);
    const [cleaners, setCleaners] = useState(hcstate.cleaners);
    const [desc, setDesc] = useState(hcstate.desc);
    const toggleSwitch = () => setIsEnabled(previoushcstate => !previoushcstate);
    let subtotal = hcstate.subtotal;
    let discount = hcstate.discount;
    let total = hcstate.total;
    useEffect(() => {
        console.log("Frequency in Home Cleaning Details: " + hcstate.frequency);
    }, []);

    useEffect(() => {
        let isCanceled = false;
        console.log("HHHHHHHHHH " + hours);
        subtotal = (hcstate.BS.hourPrice * hours * hcstate.cleaners);
        total = (hcstate.BS.hourPrice * hours * hcstate.cleaners);
        if (hcstate.frequency == 2) {
            total = total * 2;
            discount = total * 0.05;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        else if (hcstate.frequency == 3) {
            total = total * 4;
            discount = total * 0.1;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        subtotal = subtotal - hcstate.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        if (!isCanceled)
            dispatch({ type: 'set_hours', payload: hours, });
        if (!isCanceled)
            dispatch({ type: 'update_totals', payload: { subtotal, total, discount }, });
        console.log("Discount: " + discount)
        return () => {
            isCanceled = true;
        };
    }, [hours]);

    useEffect(() => {
        let isCanceled = false;
        console.log("CCCCCCCCC " + cleaners)
        subtotal = (hcstate.BS.hourPrice * hcstate.hours * cleaners);
        total = (hcstate.BS.hourPrice * hcstate.hours * cleaners);
        if (hcstate.frequency == 2) {
            total = total * 2;
            discount = total * 0.05;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        else if (hcstate.frequency == 3) {
            total = total * 4;
            discount = total * 0.1;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        subtotal = subtotal - hcstate.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        if (!isCanceled)
            dispatch({ type: 'set_cleaners', payload: cleaners, });
        if (!isCanceled)
            dispatch({ type: 'update_totals', payload: { subtotal, total, discount }, });
        console.log("Discount: " + discount);
        return () => {
            isCanceled = true;
        };
    }, [cleaners]);

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
            <FontBold mystyle={styles.qText} value={t('babycleaningq1')} />
            <View style={{ flexDirection: 'row', left: 15 }}>
                <TouchableOpacity onPress={() => setHours(2)}><Text style={hours == 2 ? styles.thumbdown : styles.thumbup}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(3)}><Text style={hours == 3 ? styles.thumbdown : styles.thumbup}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(4)}><Text style={hours == 4 ? styles.thumbdown : styles.thumbup}>4</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(5)}><Text style={hours == 5 ? styles.thumbdown : styles.thumbup}>5</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(6)}><Text style={hours == 6 ? styles.thumbdown : styles.thumbup}>6</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(7)}><Text style={hours == 7 ? styles.thumbdown : styles.thumbup}>7</Text></TouchableOpacity>
                {/* <TouchableOpacity onPress={() => setHours(8)}><Text style={hours == 8 ? styles.thumbdown : styles.thumbup}>8</Text></TouchableOpacity> */}
            </View>
            <Spacer />
            <FontBold mystyle={styles.qText} value={t('babycleaningq2')} />
            <View style={{ flexDirection: 'row', left: 15 }}>
                <TouchableOpacity onPress={() => setCleaners(1)}><Text style={cleaners == 1 ? styles.thumbdown : styles.thumbup}>1</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCleaners(2)}><Text style={cleaners == 2 ? styles.thumbdown : styles.thumbup}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCleaners(3)}><Text style={cleaners == 3 ? styles.thumbdown : styles.thumbup}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCleaners(4)}><Text style={cleaners == 4 ? styles.thumbdown : styles.thumbup}>4</Text></TouchableOpacity>
            </View>

            <Spacer />
            <FontBold mystyle={styles.qText} value={t('babycleaningq4')} />
            <TextInput
                value={desc}
                onChangeText={setDesc}
                style={styles.input}
                placeholder={t('babycleaningdes')}
                multiline={true}
                numberOfLines={2}
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
        height: 60,
        borderColor: '#f5c500',
        borderRadius: 7,
        borderWidth: 2,
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 10,
        paddingRight: 10,
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
        borderColor: 'white',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    }
});

export default withNamespaces()(HomeCleaningDetails);