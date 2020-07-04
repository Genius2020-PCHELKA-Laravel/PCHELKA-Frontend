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
    Image,
    ActivityIndicator
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

export default class BookedScreen extends React.Component {
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
                                    <View style={{ flexDirection: 'column', height: 75, justifyContent: "center" }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            {
                                                this.props.refCode === '' ?
                                                    <ActivityIndicator color='#fff' animating={true} />
                                                    :
                                                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                                        <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                                                            <FontBold value={this.props.refCode} mystyle={{ fontSize: 18, color: "#fff" }}></FontBold>
                                                        </View>
                                                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                                            <FontBold value={i18n.t('booked')} mystyle={{ marginLeft: 10, fontSize: 18, color: "#fff" }} />
                                                        </View>
                                                    </View>
                                            }
                                        </View>

                                    </View>
                                </View>
                                <Spacer>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <FontAwesome name="calendar-check-o" size={30} color="#228B22" />
                                        <FontBold value={i18n.t('thankyouforyourorder')} mystyle={{ textAlign: "center", fontSize: 20, marginLeft: 10 }} />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <FontLight value={i18n.t('youcanseeyourupcomingappoitmentsunderappoitments')} mystyle={{ textAlign: "center", fontSize: 16, marginLeft: 10 }} />
                                    </View>
                                </Spacer>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async () => {
                                        await this.props.setShowBookedModal(false);
                                        navigate('HomeNavigator');
                                    }}>
                                        <Spacer>
                                            <FontBold
                                                value={i18n.t('homepage')}
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
        height: 250,
        width: '90%',
        bottom: "40%",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        // borderWidth: 1,
        // borderColor: "#2Ac062",
        shadowColor: '#7a7a7a',
        shadowOpacity: 1.0,
        shadowOffset: {
            height: 10,
            width: 10
        },
        shadowRadius: 10,
        elevation: 10
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "#ffffffaa"
    },
    btn: {
        backgroundColor: '#f5c500',
        borderRadius: 7,
        borderColor: "#7a7a7a",
        borderWidth: 1,
        color: '#7a7a7a',
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 5,
        textAlign: "center",
    }
});








