// import React, { useState, useEffect, useContext } from 'react';
// import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
// import { Container, Footer, FooterTab, Button, } from 'native-base';
// import { CheckBox, Icon } from 'react-native-elements'
// import { RadioButton, Text } from 'react-native-paper';
// import Spacer from '../../components/Spacer';
// import FontBold from '../../components/FontBold';
// import FontLight from '../../components/FontLight';
// import FontRegular from '../../components/FontRegular';
// import { Context as HCContext } from '../../screens/context/HCContext';
// import { ScrollView } from 'react-native-gesture-handler';
// // import Liqpay from '../Liqpay';
// import { withNamespaces } from 'react-i18next';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
// import { navigate } from '../../navigationRef';

// const RescheduledScreen = ({ children, t }) => {
//     const { dispatch, state: hcstate } = useContext(HCContext);

//     return (
//         <View style={styles.container}>
//             <Spacer>
//                 <FontBold value={t('thankyou')} mystyle={{ textAlign: "center", fontSize: 20 }} />
//             </Spacer>
//             <Spacer>
//                 <FontLight value={t('rescheduled')} mystyle={{ textAlign: "center", color: 'gray', fontSize: 20 }} />
//             </Spacer>
//             <View style={styles.imagecontainer} >
//                 <Image style={styles.image} source={require('../../../assets/correct.png')} />
//             </View>
//             <TouchableOpacity onPress={() => { navigate('Upcoming') }}>
//                 <Spacer>
//                     <FontBold value={t('appoitments')} mystyle={{ textAlign: "center", fontSize: 12, color: 'blue' }}></FontBold>
//                 </Spacer>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff"
//     },
//     imagecontainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center'
//     },
//     image: {
//         width: 75,
//         height: 75,
//         borderColor: "#fff",
//         opacity: 1,
//     },
// });

// export default withNamespaces()(RescheduledScreen);










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
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import Toast from 'react-native-simple-toast';
import { setRedirect } from '../../api/redirect';
import { navigate } from '../../navigationRef';
import { withNamespaces } from 'react-i18next';
import i18n from '../../locales/i18n';
import Modal from 'react-native-modal';
import { Normalize, fontNormalize } from '../../components/actuatedNormalize';

export default class RescheduledScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View >
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    animationIn="bounceInDown"
                    animationOut="bounceOutDown"
                    animationInTiming={1200}
                    animationOutTiming={600}
                    avoidKeyboard={true}
                    backdropColor='transparent'
                    transparent={true}
                    isVisible={this.props.showBookedModal}
                    hideModalContentWhileAnimating={false}
                    coverScreen={true}
                    // onBackdropPress={() => this.props.setShowBookedModal(false)}
                    // onBackButtonPress={() => this.props.setShowBookedModal(false)}
                    // onSwipeComplete={() => this.props.setShowBookedModal(false)}
                    // swipeThreshold={200}
                    // swipeDirection="down"
                    onRequestClose={() => {
                        // alert('Modal has been closed.');
                    }}>
                    <TouchableOpacity activeOpacity={1.0} style={styles.wrapper}>

                        <TouchableWithoutFeedback>
                            <View style={styles.container}>
                                <View style={{
                                    flexDirection: 'row', backgroundColor: "#f5c500", justifyContent: "center", borderTopLeftRadius: 14, borderTopRightRadius: 14,
                                }}>
                                    <View style={{ flexDirection: 'column', height: Normalize(75), justifyContent: "center" }}>
                                        <FontBold value={"\"" + this.props.refCode + "\" " + i18n.t('rescheduled')} mystyle={{ fontSize: fontNormalize(18), color: "#fff" }}></FontBold>
                                    </View>
                                </View>
                                <Spacer>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <FontAwesome name="calendar-check-o" size={Normalize(30)} color="#228B22" />
                                        <FontBold value={i18n.t('thankyou')} mystyle={{ textAlign: "center", fontSize: fontNormalize(18), marginLeft: Normalize(10) }} />
                                    </View>
                                </Spacer>

                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async () => {
                                        await this.props.setShowBookedModal(false);
                                        navigate('Upcoming');
                                    }}>
                                        <Spacer>
                                            <FontBold
                                                value={i18n.t('appoitments')}
                                                mystyle={styles.btn} />
                                        </Spacer>
                                    </TouchableOpacity>
                                </View>
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
        height: Normalize(200),
        width: '90%',
        bottom: "40%",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        // borderWidth: 1,
        // borderColor: "#2Ac062",
        shadowColor: '#7a7a7a',
        shadowOpacity: 1.0,
        shadowOffset: {
            height: Normalize(10),
            width: Normalize(10)
        },
        shadowRadius: 10,
        elevation: 10
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#f5c500',
        borderRadius: 7,
        borderColor: "#7a7a7a",
        borderWidth: 1,
        color: '#7a7a7a',
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: Normalize(10),
        backgroundColor: "#fff",
        paddingHorizontal: Normalize(15),
        paddingVertical: Normalize(5),
        textAlign: "center",
    }
});








