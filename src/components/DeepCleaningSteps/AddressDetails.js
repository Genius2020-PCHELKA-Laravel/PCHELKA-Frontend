import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, RefreshControl } from 'react-native';
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
import Loader from '../../components/Loader';
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';
import { getRedirect, setRedirect, removeRedirect } from '../../api/redirect';
import i18n from '../../locales/i18n';

const AddressDetails = ({ children, t }) => {
    const { state, getUserAddresses, dispatch } = useContext(UserContext);
    const { state: hcstate } = useContext(HCContext);
    const [selectedAddress, setSelectedAddress] = useState(state.selected_address);
    const [selectedAddressName, setSelectedAddressName] = useState(state.selected_address_name);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'set_selected_address',
            payload: selectedAddress,
        });
    }, [selectedAddress]);
    const _onRefresh = () => {
        setRefreshing(true);
        getUserAddresses().then((res) => {
            console.log("ManageAddresses::onrefresh::getUserAddresses::response:: ");
            console.log(res);
            dispatch({ type: 'set_user_addresses_loaded', payload: true });
            dispatch({ type: 'set_user_addresses', payload: res });
            setRefreshing(false);
        }).catch((error) => {
            console.log("HomeScreen::onrefresh::getUserAddresses::error:: ");
            setRefreshing(false);
        });
    }

    return (
        <View style={styles.container}>
            {/* <Text>{state.selected_address}</Text>
            <Text>{state.selected_address_name}</Text> */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onRefresh}
                    />
                }
            >
                {/* <Loader loading={state.loading} /> */}
                <Spacer>
                    <View style={styles.containerrow}>
                        <View style={styles.containeritem1}>
                            <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('addressq1')}></FontBold>
                        </View>
                        <TouchableOpacity style={styles.containeritem2} activeOpacity={0.5} onPress={() => {
                            setRedirect('DeepCleaningScreen');
                            navigate('MapScreen');
                        }}>
                            <FontBold mystyle={styles.btnAddressStyle} value={t('addnew')} />
                        </TouchableOpacity>
                    </View>
                    <Spacer />

                    {
                        state.addresses.sort((a, b) => a.id > b.id ? -1 : 1).map((u, i) => {
                            return (
                                <View key={u.id}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedAddress(u.id);
                                            setSelectedAddressName(u.address);
                                            dispatch({ type: 'set_selected_address', payload: u.id, });
                                            dispatch({ type: 'set_selected_address_name', payload: u.address, });
                                        }}>
                                        <View flexDirection='row' style={{ marginBottom: 5 }}>
                                            <View flexDirection='column'>
                                                <RadioButton
                                                    onPress={() => {
                                                        setSelectedAddress(u.id);
                                                        setSelectedAddressName(u.address);
                                                        dispatch({ type: 'set_selected_address', payload: u.id, });
                                                        dispatch({ type: 'set_selected_address_name', payload: u.address, });
                                                    }}
                                                    value={u.id} name={u.address} status={selectedAddress == u.id ? 'checked' : 'unchecked'} />
                                            </View>
                                            <View flexDirection='column' style={{ paddingRight: 50, flexWrap: "wrap" }}>
                                                {/* <Text>{u.id}</Text> */}
                                                <View style={{ flexDirection: "row" }}>
                                                    <FontBold value={u.address} mystyle={{ fontSize: 18 }}></FontBold>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <FontLight value={u.details} mystyle={{ color: 'gray', fontSize: 16 }}></FontLight>
                                                </View>
                                                <View flexDirection='row' >
                                                    <FontBold value={i18n.t('street') + ': '} mystyle={{ color: 'gray', fontSize: 16 }} />
                                                    <FontLight value={u.street} mystyle={{ color: 'gray', fontSize: 16 }}></FontLight>
                                                </View>
                                                <View flexDirection='row' >
                                                    <FontBold value={i18n.t('buildingnumber') + ': '} mystyle={{ color: 'gray', fontSize: 16 }} />
                                                    <FontLight value={u.buildingNumber} mystyle={{ color: 'gray', fontSize: 16 }}></FontLight>
                                                </View>
                                                <View flexDirection='row' >
                                                    <FontBold value={i18n.t('apartment') + ': '} mystyle={{ color: 'gray', fontSize: 16 }} />
                                                    <FontLight value={u.apartment} mystyle={{ color: 'gray', fontSize: 16 }}></FontLight>
                                                </View>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            activeOpacity={0.5}
                                            onPress={() => {
                                                setRedirect('DeepCleaningScreen');
                                                navigate('MapScreenShowAddress', {
                                                    uid: u.id,
                                                    ustreet: u.street,
                                                    ubuildingnumber: u.buildingNumber,
                                                    uapartment: u.apartment,
                                                    ulatitude: u.lat,
                                                    ulongitude: u.lon
                                                });
                                            }}>
                                            <FontBold value={t('edit')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
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
        backgroundColor: "#fff",
    },
    containerrow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    containeritem1: {
        left: 10,
        width: '60%' // is 50% of container width
    },
    containeritem2: {
        height: "100%",
        width: '40%' // is 50% of container width
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
    btnAddressStyle: {
        marginTop: 5,
        backgroundColor: '#fff',
        color: "#000",
        borderColor: "#7a7a7a",
        borderWidth: 1,
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        paddingHorizontal: 5,
        paddingVertical: 3,
        textAlignVertical: "center",
        zIndex: 17,
        paddingHorizontal: 10
    },
    editButton: {
        marginTop: 5,
        backgroundColor: '#fff',
        color: "#000",
        borderColor: "#7a7a7a",
        borderWidth: 1,
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        paddingHorizontal: 5,
        paddingVertical: 3,
        textAlignVertical: "center",
        zIndex: 17,
        paddingHorizontal: 10
    },
});

export default withNamespaces()(AddressDetails);