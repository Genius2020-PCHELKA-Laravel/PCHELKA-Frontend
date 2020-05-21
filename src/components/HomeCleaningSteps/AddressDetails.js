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

const Frequency = ({ children }) => {
    const [selectedAddress, setSelectedAddress] = useState(0);
    const { state, getprice0, getprice1, getprice2, getAddresses } = useContext(HCContext);
    useEffect(() => {

    }, []);
    useEffect(() => {

    }, [selectedAddress]);
    return (
        <ScrollView>
            <Text>{selectedAddress}</Text>
            <View style={styles.row}>
                <View style={styles.item1}>
                    <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Your saved Addresses'></FontBold>
                </View>
                <View style={styles.item2}>
                    <FontLight mystyle={styles.textAddressStyle} value="Add new >"></FontLight>
                </View>
            </View>
            <RadioButton.Group
                onValueChange={setSelectedAddress}
                value={selectedAddress}
            >
                <Spacer>
                    <View>
                        <View style={{ flexDirection: 'row', fontSize: 24 }}>
                            <RadioButton value="0" status='checked' />
                            <FontBold value='Address1' mystyle={{ fontSize: 24 }}></FontBold>
                        </View>
                        <FontLight value='Book cleaning for one time only' mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                    </View>
                </Spacer>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value="1" />
                        <FontBold value='Address2' mystyle={{ fontSize: 24 }}></FontBold>
                    </View>
                    <FontLight value='Book a recurring cleaning with the same cleaner every two-weeks' mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                </Spacer>
                <Spacer>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton value="2" />
                        <FontBold value='Address3' mystyle={{ fontSize: 24 }}></FontBold>

                    </View>
                    <FontLight value='Book a recurring with the same cleaner every week' mystyle={{ color: 'gray', fontSize: 18, marginLeft: 35 }}></FontLight>
                </Spacer>
            </RadioButton.Group>

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