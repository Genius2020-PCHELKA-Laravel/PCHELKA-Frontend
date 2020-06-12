import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import { Context as UserContext } from '../../screens/context/UserContext';
import { Context as HCContext } from '../../screens/context/HCContext';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../Loader';
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';
import { getRedirect, setRedirect, removeRedirect } from '../../api/redirect';

const AddressDetails = ({ children, t }) => {
    const { state: ustate, getUserAddresses, dispatch: udispatch } = useContext(UserContext);
    const { state: hcstate } = useContext(HCContext);
    const [selectedAddress, setSelectedAddress] = useState(ustate.selected_address);
    const [selectedAddressName, setSelectedAddressName] = useState(ustate.selected_address_name);
    useEffect(() => {
        let isCanceled = false;
        if (!isCanceled) {
            udispatch({ type: 'set_selected_address', payload: selectedAddress, });
            udispatch({ type: 'set_selected_addressName', payload: selectedAddressName, });
        }
        return () => {
            isCanceled = true;
        };
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
                            <FontBold mystyle={{ color: '#000', fontSize: 20, marginLeft: 7 }} value={t('addressq1')}></FontBold>
                        </View>
                        <View style={styles.containeritem2}>
                            <TouchableOpacity onPress={async () => {
                                setRedirect('DeepCleaningScreen');
                                navigate('MapScreen');
                            }}>
                                <FontLight mystyle={styles.textAddressStyle} value={t('addnew')}></FontLight>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        ustate.addresses.sort((a, b) => a.id > b.id ? -1 : 1).map((add, i) => {
                            return (
                                <TouchableOpacity
                                    key={add.id}
                                    onPress={() => {
                                        setSelectedAddress(add.id);
                                        setSelectedAddressName(add.address);
                                        udispatch({ type: 'set_selected_address', payload: add.id, });
                                        udispatch({ type: 'set_selected_address_name', payload: add.address, });
                                    }}>
                                    <View flexDirection='row' style={{}}>
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
    textAddressStyle: {
        marginTop: 5,
        marginRight: 5,
        backgroundColor: '#f5c500',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        color: '#000',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: "500",
        paddingHorizontal: 15,
        paddingVertical: 5
    },

});

export default withNamespaces()(AddressDetails);