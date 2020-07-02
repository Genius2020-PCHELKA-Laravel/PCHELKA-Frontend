import React, { Component, useState, useContext } from 'react';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome, Octicons } from '@expo/vector-icons';
import { Context as HCContext } from '../../screens/context/HCContext';
import { Context as UserContext } from '../../screens/context/UserContext';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import { withNamespaces } from 'react-i18next';
import i18n from '../../locales/i18n';
import Accordian from './Accordian';
import Modal from 'react-native-modal';

export default class ModalDisinfectionDesc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {
                    title: i18n.t('howdoesitwork'),
                    data: i18n.t('accordian1'),
                },
                {
                    title: i18n.t('howlongdoesdisinfectiontake'),
                    data: i18n.t('accordian2')
                },
                {
                    title: i18n.t('whatchemicalisusedandisitharmful'),
                    data: i18n.t('accordian3')
                },

            ]
        }
    }
    renderAccordians = () => {
        const items = [];
        for (var item of this.state.menu) {
            items.push(
                <Accordian
                    key={item.title}
                    title={item.title}
                    data={item.data}
                />
            );
        }
        return items;
    }

    render() {
        return (
            <View style={{ marginTop: 0 }}>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={1200}
                    animationOutTiming={1200}
                    avoidKeyboard={true}
                    backdropColor='transparent'
                    transparent={true}
                    isVisible={this.props.showDisinfectionModal}
                    hideModalContentWhileAnimating={false}
                    coverScreen={true}
                    // onBackButtonPress={() => this.props.setShowDisinfectionModal(false)}
                    // onSwipeComplete={() => this.props.setShowDisinfectionModal(false)}
                    // swipeThreshold={200}
                    // swipeDirection="down"
                    onRequestClose={() => {
                        // alert('Modal has been closed.');
                    }}>
                    <View style={styles.container} >
                        <TouchableOpacity
                            style={{ position: "absolute", right: 0, padding: 15 }}
                            onPress={() => {
                                this.props.setShowDisinfectionModal(false);
                            }}>
                            <FontAwesome name="times" size={35} color="#7a7a7a" />
                        </TouchableOpacity>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 15, marginTop: 60 }}>
                            <View style={styles.servicedesccontainer}>
                                <FontAwesome5 name="info-circle" size={30} color="#f5c500" style={{ left: 5, top: 5, marginBottom: 15 }} />
                                <View style={{ flexDirection: "row" }}>
                                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                                    <FontLight mystyle={{ fontSize: 16 }} value={i18n.t('disinfectiondesc1')} />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                                    <FontLight mystyle={{ fontSize: 16 }} value={i18n.t('disinfectiondesc2')} />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                                    <FontLight mystyle={{ fontSize: 16 }} value={i18n.t('disinfectiondesc3')} />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Octicons name="primitive-dot" size={20} color="#000" style={{ right: 5, top: 5 }} />
                                    <FontLight mystyle={{ fontSize: 16 }} value={i18n.t('disinfectiondesc4')} />
                                </View>
                            </View>
                            <FontBold value={i18n.t('whatincluded')} mystyle={{ fontSize: 18, marginBottom: 15 }} />
                            <View >
                                {this.renderAccordians()}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View >
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    servicedesccontainer: {
        marginBottom: 15,
        padding: 15,
        borderColor: '#7a7a7a',
        borderWidth: 0,
        shadowColor: '#7a7a7a',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        elevation: 2,
        shadowRadius: 10,
    },
});








