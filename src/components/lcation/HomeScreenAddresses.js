import React, { Component, useState, useContext, useEffect } from 'react';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    Image
} from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
// import { Context as HCContext } from '../screens/context/HCContext';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import Toast from 'react-native-simple-toast';
import { setRedirect } from '../../api/redirect';
import { navigate } from '../../navigationRef';
import { withNamespaces } from 'react-i18next';
import i18n from '../../locales/i18n';
import Modal from 'react-native-modal';
import { Normalize, fontNormalize } from '../../components/actuatedNormalize';

export default class HomeScreenAddresses extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View >
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={1200}
                    animationOutTiming={200}
                    avoidKeyboard={true}
                    backdropColor='transparent'
                    transparent={true}
                    isVisible={this.props.showAddressesModal}
                    hideModalContentWhileAnimating={false}
                    coverScreen={true}
                    onBackdropPress={() => this.props.setShowAddressesModal(false)}
                    onBackButtonPress={() => this.props.setShowAddressesModal(false)}
                    onSwipeComplete={() => this.props.setShowAddressesModal(false)}
                    swipeThreshold={200}
                    swipeDirection="down"
                    onRequestClose={() => {
                        this.props.setShowAddressesModal(false);
                        // alert('Modal has been closed.');
                    }}>
                    {/* <TouchableOpacity style={styles.wrapper}> */}

                    <View style={styles.container}>
                        <View style={{ justifyContent: 'flex-start', marginTop: Normalize(5), marginLeft: Normalize(15) }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    this.props.setShowAddressesModal(false);
                                }}
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    backgroundColor: '#fff',
                                    width: Normalize(35),
                                    height: Normalize(35),
                                    right: Normalize(15),
                                    top: Normalize(5)
                                }}>
                                <FontAwesome name="times" size={Normalize(35)} color="#7a7a7a" />
                            </TouchableOpacity>
                        </View>
                        <View flexDirection='row'>
                            <FontBold value={i18n.t('youraddresses')} mystyle={{ fontSize: fontNormalize(20), left: Normalize(15), top: Normalize(15), }} />

                        </View>
                        <Spacer />
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginLeft: Normalize(15), marginRight: Normalize(15) }} />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={async () => {
                                setRedirect('HomeNavigator');
                                navigate('MapScreen');
                                this.props.setShowAddressesModal(false);
                            }}
                            style={{
                                top: 15,
                                left: 15,
                                marginBottom: 15
                            }}>
                            <View style={{ flexDirection: "row", marginBottom: Normalize(10) }}>
                                <MaterialIcons name="my-location" size={30} color="#7a7a7a" />
                                <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                    <FontBold value={"  " + i18n.t('addnewaddress')} mystyle={{ fontSize: fontNormalize(18) }} />
                                </View>
                            </View>

                        </TouchableOpacity>
                        {
                            // typeof this.props.authtoken != 'undefined'
                            //     || this.props.authtoken != ''
                            //     ?
                            // this.props.addresses.length === 0 || this.props.addresses === undefined ?
                            typeof this.props.addresses === 'undefined' || this.props.addresses.length === 0 ?
                                // <Image style={styles.noaddresses} source={require('../../../assets/noappoitments.png')} />
                                <FontBold value={i18n.t('noaddresses')} mystyle={{ marginTop: Normalize(15), marginLeft: Normalize(15), marginRight: Normalize(15), fontSize: fontNormalize(18) }} />
                                :
                                <ScrollView vertical showsVerticalScrollIndicator={false} style={{ flexDirection: 'column', }}>
                                    {
                                        this.props.addresses.sort((a, b) => a.id > b.id ? -1 : 1).map((u, i) => {
                                            return (
                                                <TouchableOpacity key={i} onPress={() => {
                                                    this.props.setShowAddressesModal(false);
                                                    setRedirect('HomeNavigator');
                                                    navigate('MapScreenShowAddress', {
                                                        uid: u.id,
                                                        ustreet: u.street,
                                                        ubuildingnumber: u.buildingNumber,
                                                        uapartment: u.apartment,
                                                        ulatitude: u.lat,
                                                        ulongitude: u.lon
                                                    });
                                                }}>
                                                    <Spacer>
                                                        <View flexDirection='row'>
                                                            <View flexDirection='column' style={{ width: '10%', left: Normalize(10) }}>
                                                                <Entypo name="location" size={Normalize(25)} color="#d21404" />
                                                            </View>
                                                            <View flexDirection='column' style={{ width: '90%', left: Normalize(15), right: Normalize(15) }}>
                                                                <View flexDirection='row' >
                                                                    <FontBold mystyle={{ fontSize: fontNormalize(18), }} value={u.address + ', '} />
                                                                </View>
                                                                <View flexDirection='row' >
                                                                    <FontBold mystyle={{ fontSize: fontNormalize(18), }} value={u.details} />
                                                                </View>
                                                                <View flexDirection='row'>
                                                                    <FontBold mystyle={{ fontSize: fontNormalize(14), color: "#888" }} value={u.street + ', '} />
                                                                </View>
                                                                <View flexDirection='row'>
                                                                    <FontBold mystyle={{ fontSize: fontNormalize(14), color: "#888" }} value={u.buildingNumber + ', '} />
                                                                </View>
                                                                <View flexDirection='row'>
                                                                    <FontBold mystyle={{ fontSize: fontNormalize(14), color: "#888" }} value={u.apartment} />
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </Spacer>
                                                </TouchableOpacity>
                                            );
                                        })
                                    }
                                </ScrollView>
                        }
                    </View>

                </Modal>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: Normalize(450),
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "#444444aa"
    },
    noaddresses: {
        width: "100%",
        marginTop: -Normalize(100),
        zIndex: -1
    },
});








