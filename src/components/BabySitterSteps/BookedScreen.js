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
                                <Spacer>
                                    <FontBold value={i18n.t('thankyouforyourorder')} mystyle={{ textAlign: "center", fontSize: 20 }} />
                                </Spacer>
                                {/* <Spacer>
                                    <FontLight value={i18n.t('booked')} mystyle={{ textAlign: "center", color: 'gray', fontSize: 20 }} />
                                </Spacer> */}
                                <View style={styles.imagecontainer} >
                                    <Image style={styles.image} source={require('../../../assets/correct.png')} />
                                </View>
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
        height: 150,
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

    },
    imagecontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: 45,
        height: 45,
        borderColor: "#fff",
        opacity: 1,
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








