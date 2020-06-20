import React, { Component, useState, useContext, useEffect } from 'react';
import {
    Modal,
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

export default class HomeScreenAddresses extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.showAddressesModal}
                    onRequestClose={() => {
                        // alert('Modal has been closed.');
                        this.props.setShowAddressesModal(false);
                    }}
                >
                    <TouchableOpacity onPress={() => this.props.setShowAddressesModal(false)} style={styles.wrapper}>
                        <TouchableWithoutFeedback>

                            <View style={styles.container}>
                                <View style={{ justifyContent: 'flex-start', marginTop: 5, marginLeft: 15 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => {
                                            this.props.setShowAddressesModal(false);
                                        }}
                                        style={{
                                            backgroundColor: '#fff',
                                            width: 35,
                                            height: 35
                                        }}>
                                        <FontAwesome name="times" size={35} color="#7a7a7a" />
                                    </TouchableOpacity>
                                </View>
                                <View flexDirection='row'>
                                    <FontBold value={i18n.t('youraddresses')} mystyle={{ fontSize: 20, left: 15, top: 15, }} />
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={async () => {
                                            setRedirect('HomeNavigator');
                                            navigate('MapScreen');
                                            this.props.setShowAddressesModal(false);
                                        }}
                                        style={{
                                            position: 'absolute', right: 15,
                                        }}>
                                        <Entypo name="plus" size={45} color="#7a7a7a" />
                                    </TouchableOpacity>
                                </View>
                                <Spacer />
                                <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }} />
                                {
                                    // typeof this.props.authtoken != 'undefined'
                                    //     || this.props.authtoken != ''
                                    //     ?
                                    // this.props.addresses.length === 0 || this.props.addresses === undefined ?
                                    typeof this.props.addresses === 'undefined' || this.props.addresses.length === 0 ?
                                        // <Image style={styles.noaddresses} source={require('../../../assets/noappoitments.png')} />
                                        <FontBold value={i18n.t('noaddresses')} mystyle={{ marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }} />
                                        :
                                        <ScrollView vertical showsVerticalScrollIndicator={false} style={{ flexDirection: 'column', }}>
                                            {
                                                this.props.addresses.sort((a, b) => a.id > b.id ? -1 : 1).map((u, i) => {
                                                    return (
                                                        <TouchableOpacity key={i} onPress={() => { }}>
                                                            <Spacer>
                                                                <View flexDirection='row'>
                                                                    <View flexDirection='column' style={{ width: '10%' }}>
                                                                        <Entypo name="location" size={25} color="#d21404" />
                                                                    </View>
                                                                    <View flexDirection='column' style={{ width: '90%', left: 15, right: 15 }}>
                                                                        <View flexDirection='row' >
                                                                            <FontBold mystyle={{ fontSize: 18, }} value={u.address + ', '} />
                                                                        </View>
                                                                        <View flexDirection='row' >
                                                                            <FontBold mystyle={{ fontSize: 18, }} value={u.details} />
                                                                        </View>
                                                                        <View flexDirection='row'>
                                                                            <FontBold mystyle={{ fontSize: 14, color: "#888" }} value={u.street + ', '} />
                                                                        </View>
                                                                        <View flexDirection='row'>
                                                                            <FontBold mystyle={{ fontSize: 14, color: "#888" }} value={u.buildingNumber + ', '} />
                                                                        </View>
                                                                        <View flexDirection='row'>
                                                                            <FontBold mystyle={{ fontSize: 14, color: "#888" }} value={u.apartment} />
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
                        </TouchableWithoutFeedback>

                    </TouchableOpacity>
                </Modal>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: 450,
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
        backgroundColor: "#444444aa"
    },
    noaddresses: {
        width: "100%",
        marginTop: -100,
        zIndex: -1
    },
});








