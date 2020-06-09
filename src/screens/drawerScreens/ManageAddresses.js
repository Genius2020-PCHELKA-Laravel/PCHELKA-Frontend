import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as UserContext } from '../context/UserContext';
import { Context as HCContext } from '../context/HCContext';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';
import { getRedirect, setRedirect, removeRedirect } from '../../api/redirect';

const ManageAddresses = ({ children, t }) => {
    const { state, getUserAddresses, dispatch } = useContext(UserContext);
    const { state: hcstate } = useContext(HCContext);
    const [selectedAddress, setSelectedAddress] = useState(state.selected_address);
    const [selectedAddressName, setSelectedAddressName] = useState(state.selected_address_name);

    useEffect(() => {
        dispatch({
            type: 'set_selected_address',
            payload: selectedAddress,
        });
    }, [selectedAddress]);


    return (
        <View style={styles.container}>
            {/* <Text>{state.selected_address}</Text>
            <Text>{state.selected_address_name}</Text> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <Loader loading={state.loading} /> */}
                <Spacer>
                    <View style={styles.containerrow}>
                        <View style={styles.containeritem1}>
                            <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('addressq1')}></FontBold>
                        </View>
                        <View style={styles.containeritem2}>
                            <TouchableOpacity onPress={async () => {
                                setRedirect('ManageAddresses');
                                navigate('MapScreen');
                            }}>
                                <FontLight mystyle={styles.textAddressStyle} value={t('addnew')}></FontLight>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        state.addresses.sort((a, b) => a.id > b.id ? -1 : 1).map((add, i) => {
                            return (
                                <TouchableOpacity
                                    key={add.id}
                                    onPress={() => {
                                        setSelectedAddress(add.id);
                                        setSelectedAddressName(add.address);
                                        dispatch({ type: 'set_selected_address', payload: add.id, });
                                        dispatch({ type: 'set_selected_address_name', payload: add.address, });
                                    }}>
                                    <View flexDirection='row' style={{ marginBottom: 5 }}>
                                        <View flexDirection='column'>
                                            <RadioButton value={add.id} name={add.address} status={selectedAddress == add.id ? 'checked' : 'unchecked'} />
                                        </View>
                                        <View flexDirection='column'>
                                            {/* <Text>{add.id}</Text> */}
                                            <View flexDirection='row'>
                                                <FontBold value={add.address} mystyle={{ fontSize: 18 }}></FontBold>
                                            </View>
                                            <View flexDirection='row'>
                                                <FontLight value={add.details} mystyle={{ color: 'gray', fontSize: 16 }}></FontLight>
                                            </View>
                                            <View flexDirection='row'>
                                                <FontLight value={add.street} mystyle={{ color: 'gray', fontSize: 16 }}></FontLight>
                                            </View>
                                            <View flexDirection='row'>
                                                <FontLight value={add.buildingNumber} mystyle={{ color: 'gray', fontSize: 16 }}></FontLight>
                                            </View>
                                            <View flexDirection='row'>
                                                <FontLight value={add.apartment} mystyle={{ color: 'gray', fontSize: 16 }}></FontLight>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
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