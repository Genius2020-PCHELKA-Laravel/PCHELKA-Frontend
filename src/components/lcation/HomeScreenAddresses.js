import React, { Component, useState, useContext, useEffect } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
// import { Context as HCContext } from '../screens/context/HCContext';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import { withNamespaces } from 'react-i18next';
import Toast from 'react-native-simple-toast';
import { setRedirect, getRedirect, removeRedirect } from '../../api/redirect';
import { navigate } from '../../navigationRef';
export default class HomeScreenAddresses extends React.Component {
    //const [modalVisible, setModalVisible] = useState(false);
    // const { state, getprice0, getprice1, getprice2 } = useContext(HCContext);
    constructor(props) {
        super(props);
        // this.state = {
        //     spare: this.props.addresses,
        // };
    }

    render() {
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.showAddressesModal}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                    onShow={() => this.props.setIsLoading(false)}
                >

                    <View style={styles.wrapper}>
                        <View style={styles.container}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: 5 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.setReloadAddresses(!this.props.reloadAddresses);
                                        this.props.setShowAddressesModal(false);
                                    }}
                                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9800', borderRadius: 35, width: '25%' }}>
                                    <Entypo name="chevron-down" size={35} color="#f5f5f7" />
                                </TouchableOpacity>
                            </View>
                            <View flexDirection='row'>
                                <FontBold value="Your addresses" mystyle={{ fontSize: 20, left: 15, top: 15, }} />
                                <TouchableOpacity onPress={async () => { this.props.setReloadAddresses(!this.props.reloadAddresses); await setRedirect('HomeNavigator'); navigate('MapScreen'); this.props.setShowAddressesModal(false); }} style={{ position: 'absolute', right: 15 }}>

                                    <Entypo name="plus" size={45} color="#ff9800" />
                                </TouchableOpacity>
                            </View>
                            <Spacer />
                            <View style={{ borderBottomColor: '#ff9800', borderBottomWidth: 1, }} />
                            <ScrollView vertical showsVerticalScrollIndicator={false} style={{ flexDirection: 'column', }}>
                                {
                                    // typeof this.props.addresses == 'undefined' ?
                                    this.props.addresses.map((u, i) => {
                                        return (
                                            <TouchableOpacity key={i} onPress={() => { }}>
                                                <Spacer>
                                                    <View flexDirection='row'>
                                                        <View flexDirection='column'>
                                                            <Entypo name="location" size={25} color="#d21404" />
                                                        </View>
                                                        <View flexDirection='column' style={{ left: 15 }}>
                                                            <View flexDirection='row' >
                                                                <FontBold mystyle={{ fontSize: 18, }} value={u.address + ', '} />
                                                            </View>
                                                            <View flexDirection='row' >
                                                                <FontBold mystyle={{ fontSize: 18, }} value={u.details} />
                                                            </View>
                                                            <View flexDirection='row'>
                                                                <FontBold mystyle={{ fontSize: 14, color: "#888" }} value={u.street + ', '} />
                                                                <FontBold mystyle={{ fontSize: 14, color: "#888" }} value={u.buildingNumber + ', '} />
                                                                <FontBold mystyle={{ fontSize: 14, color: "#888" }} value={u.apartment} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Spacer>
                                            </TouchableOpacity>
                                        );
                                    })
                                    // :
                                    // <Spacer>
                                    //     <FontBold value="No addresses yet" mystyle={{ fontSize: 20, left: 15, top: 15, }} />
                                    // </Spacer>
                                }
                            </ScrollView>



                        </View>
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
        height: 500,
        width: '100%',
        bottom: 0,
        borderRadius: 35
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

});








