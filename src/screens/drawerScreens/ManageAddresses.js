import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as HCContext } from '../context/HCContext';
import { Context as UserContext } from '../context/UserContext';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';
const ManageAddresses = ({ children, t }) => {
    const { dispatch, state } = useContext(HCContext);
    const { getUserAddresses } = useContext(UserContext);
    const [selectedAddress, setSelectedAddress] = useState(state.selected_address);
    const [selectedAddressName, setSelectedAddressName] = useState(state.selected_address_name);
    useEffect(() => {
        console.log("GetAddresses");
        getUserAddresses();
    }, []);
    const items = []

    for (const add of state.addresses) {
        items.push(
            <TouchableOpacity key={add.id} onPress={() => { setSelectedAddress(add.id); setSelectedAddressName(add.address); dispatch({ type: 'set_selected_address_name', payload: add.address, }); }}>
                <View flexDirection='row' style={{ marginBottom: 5 }}>
                    <View flexDirection='column'>
                        <RadioButton value={add.id} name={add.address} status={selectedAddress == add.id ? 'checked' : 'unchecked'} />
                    </View>
                    <View flexDirection='column'>
                        <View flexDirection='row'>
                            <FontBold value={add.address} mystyle={{ fontSize: 24 }}></FontBold>
                        </View>
                        <View flexDirection='row'>
                            <FontLight value={add.details} mystyle={{ color: 'gray', fontSize: 18 }}></FontLight>
                        </View>
                        <View flexDirection='row'>
                            <FontLight value={add.street} mystyle={{ color: 'gray', fontSize: 18 }}></FontLight>
                            <FontLight value={add.buildingNumber} mystyle={{ color: 'gray', fontSize: 18, marginLeft: 15 }}></FontLight>
                            <FontLight value={add.apartment} mystyle={{ color: 'gray', fontSize: 18, marginLeft: 15 }}></FontLight>
                        </View>
                    </View>
                    {/* <View style={styles.editcolumn}>
                            <View style={styles.editrow}>
                                <TouchableOpacity onPress={() => alert("Edit: " + add.id)}>
                                    <FontBold mystyle={styles.editButton} value={t('edit')} ></FontBold>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                </View>



            </TouchableOpacity>
        );
    }
    useEffect(() => {
        dispatch({
            type: 'set_selected_address',
            payload: selectedAddress,
        });
    }, [selectedAddress]);

    useEffect(() => {

    }, [selectedAddressName]);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Loader loading={state.loading} />
                <Spacer>
                    <View style={styles.containerrow}>
                        <View style={styles.containeritem1}>
                            <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={t('addressq1')}></FontBold>
                        </View>
                        <View style={styles.containeritem2}>
                            <TouchableOpacity onPress={async () => {
                                // dispatch({ type: 'set_redirect', payload: "HomeScreen", });
                                navigate('MapScreen');
                            }}>
                                <FontLight mystyle={styles.textAddressStyle} value={t('addnew')}></FontLight>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {items.reverse()}
                </Spacer>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerrow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    containeritem1: {
        width: '70%' // is 50% of container width
    },
    containeritem2: {
        paddingHorizontal: 10,
        width: '30%' // is 50% of container width
    },
    addresscolumn: {
        flex: 5,
        flexDirection: 'column',
    },
    editcolumn: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        bottom: 0,
    },
    editrow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    addressrow: {
        flex: 1,
        flexDirection: 'row'
    },
    text: {
        fontSize: 30
    },
    textAddressStyle: {
        margin: 5,
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
    editButton: {
        fontSize: 16,
        color: '#aaa',
        padding: 10,
    },
});

export default withNamespaces()(ManageAddresses);