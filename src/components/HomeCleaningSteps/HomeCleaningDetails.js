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
    const { dispatch, state } = useContext(HCContext);
    const [hours, setHours] = useState(state.hours);
    const [cleaners, setCleaners] = useState(state.cleaners);
    const [materials, setMaterials] = useState(state.materials);
    const [requirematerials, setRequireMaterials] = useState(state.requirematerials);
    const [isEnabled, setIsEnabled] = state.materials == 0 ? useState(false) : useState(true);
    const [desc, setDesc] = useState(state.desc);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    let subtotal = state.subtotal;
    let discount = state.discount;
    let total = state.total;
    useEffect(() => {
        console.log("Frequency in Home Cleaning Details: " + state.frequency);
    }, []);
    useEffect(() => {
        if (isEnabled == true) {
            setMaterials(1);
            setRequireMaterials('Yes');
        }
        else if (isEnabled == false) {
            setMaterials(0);
            setRequireMaterials('No');
        }
    }, [isEnabled]);

    useEffect(() => {
        console.log("HHHHHHHHHH " + hours)
        subtotal = (state.price * hours * cleaners) + materials;
        total = (state.price * hours * cleaners) + materials;
        if (state.frequency == 'Bi-weekly') {
            total = total * 2;
            discount = total * 0.05;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        else if (state.frequency == 'Weekly') {
            total = total * 4;
            discount = total * 0.1;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        subtotal = subtotal - state.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        dispatch({
            type: 'set_hours',
            payload: hours,
        });
        dispatch({
            type: 'update_totals',
            payload: { subtotal, total, discount },
        });
        console.log("Discount: " + discount)
    }, [hours]);

    useEffect(() => {
        console.log("CCCCCCCCC " + cleaners)
        subtotal = (state.price * hours * cleaners) + materials;
        total = (state.price * hours * cleaners) + materials;
        if (state.frequency == 'Bi-weekly') {
            total = total * 2;
            discount = total * 0.05;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        else if (state.frequency == 'Weekly') {
            total = total * 4;
            discount = total * 0.1;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        subtotal = subtotal - state.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        dispatch({
            type: 'set_cleaners',
            payload: cleaners,
        });
        dispatch({
            type: 'update_totals',
            payload: { subtotal, total, discount },
        });
        console.log("Discount: " + discount)
    }, [cleaners]);
    useEffect(() => {
        console.log("MMMMMMMM " + materials)
        // console.log(state.materials)
        subtotal = (state.price * hours * cleaners) + materials;
        total = (state.price * hours * cleaners) + materials;
        if (state.frequency == 'Bi-weekly') {
            total = total * 2;
            discount = total * 0.05;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        else if (state.frequency == 'Weekly') {
            total = total * 4;
            discount = total * 0.1;
            discount = parseFloat(discount).toFixed(2);
            subtotal = total - discount;
        }
        subtotal = subtotal - state.VAT;
        total = parseFloat(total).toFixed(2);
        subtotal = parseFloat(subtotal).toFixed(2);
        dispatch({
            type: 'set_materials',
            payload: materials,
        });
        dispatch({
            type: 'update_totals',
            payload: { subtotal, total, discount },
        });
        console.log("Discount: " + discount)
    }, [materials]);
    useEffect(() => {
        dispatch({
            type: 'set_desc',
            payload: desc,
        });
    }, [desc]);
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <FontBold mystyle={styles.qText} value={t('cleaningq1')} />
            {/* <FontRegular mystyle={styles.aText} value={hours + ' Hours'} />
            <Slider
                value={hours}
                onValueChange={setHours}
                minimumValue={2}
                maximumValue={8}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                minimumTrackTintColor='#f1c40f'
            /> */}
            <Spacer />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setHours(2)}><Text style={hours == 2 ? styles.thumbdown : styles.thumbup}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(3)}><Text style={hours == 3 ? styles.thumbdown : styles.thumbup}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(4)}><Text style={hours == 4 ? styles.thumbdown : styles.thumbup}>4</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(5)}><Text style={hours == 5 ? styles.thumbdown : styles.thumbup}>5</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(6)}><Text style={hours == 6 ? styles.thumbdown : styles.thumbup}>6</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setHours(7)}><Text style={hours == 7 ? styles.thumbdown : styles.thumbup}>7</Text></TouchableOpacity>
                {/* <TouchableOpacity onPress={() => setHours(8)}><Text style={hours == 8 ? styles.thumbdown : styles.thumbup}>8</Text></TouchableOpacity> */}
            </View>
            <Spacer />
            <Spacer>
                <FontBold mystyle={styles.qText} value={t('cleaningq2')} />
            </Spacer>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setCleaners(1)}><Text style={cleaners == 1 ? styles.thumbdown : styles.thumbup}>1</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCleaners(2)}><Text style={cleaners == 2 ? styles.thumbdown : styles.thumbup}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCleaners(3)}><Text style={cleaners == 3 ? styles.thumbdown : styles.thumbup}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCleaners(4)}><Text style={cleaners == 4 ? styles.thumbdown : styles.thumbup}>4</Text></TouchableOpacity>
            </View>
            <Spacer />
            {/* <FontRegular mystyle={styles.aText} value={cleaners + ' Cleaners'} />
            <Slider
                value={cleaners}
                onValueChange={setCleaners}
                minimumValue={1}
                maximumValue={4}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                minimumTrackTintColor='#f1c40f'
            /> */}
            <Spacer>
                <FontBold mystyle={styles.qText} value={t('cleaningq3')} />
            </Spacer>
            <View style={styles.row}>
                <View style={styles.item}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#f1c40f" }}
                        thumbColor={isEnabled ? "#f1c40f" : "#f4f3f4"}
                        style={styles.switch}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.item}>
                    <FontRegular mystyle={styles.aText} value={requirematerials} />
                </View>
            </View>
            <View>

            </View>
            <Spacer>
                <FontBold mystyle={styles.qText} value={t('cleaningq4')} />
            </Spacer>
            <TextInput
                value={desc}
                onChangeText={setDesc}
                style={styles.input}
                placeholder={t('cleaningdes')}
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
    },
    aText: {
        fontSize: 14,
        textAlign: 'center',
    },
    switch: {
        width: 30,
        height: 30,
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    },
    input: {
        margin: 10,
        height: 60,
        borderColor: '#f1c40f',
        borderRadius: 15,
        borderWidth: 2,
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 10,
        paddingRight: 10,
    },
    track: {
        height: 4,
        borderRadius: 2,
        backgroundColor: '#d0d0d0',
    },
    thumbup: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'white',
        borderColor: '#f1c40f',
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
        backgroundColor: '#f1c40f',
        borderColor: 'white',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    }
    // track: {
    //     height: 10,
    //     borderRadius: 4,
    //     backgroundColor: 'white',
    //     shadowColor: 'black',
    //     shadowOffset: { width: 0, height: 1 },
    //     shadowRadius: 1,
    //     shadowOpacity: 0.15,
    // },
    // thumb: {
    //     width: 20,
    //     height: 20,
    //     backgroundColor: '#f8a1d6',
    //     borderColor: '#a4126e',
    //     borderWidth: 5,
    //     borderRadius: 10,
    //     shadowColor: 'black',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowRadius: 2,
    //     shadowOpacity: 0.35,
    // }
});

export default withNamespaces()(HomeCleaningDetails);