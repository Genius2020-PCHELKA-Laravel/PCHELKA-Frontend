import React, { Component, useState, useContext } from 'react';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Context as HCContext } from '../../screens/context/HCContext';
import { Context as UserContext } from '../../screens/context/UserContext';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import { withNamespaces } from 'react-i18next';
import Modal from 'react-native-modal';

const ModalDetails = ({ children, t }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { state: hcstate, getprice0, getprice1, getprice2 } = useContext(HCContext);
    const { state } = useContext(UserContext);
    let modalfrequency = '';
    if (hcstate.frequency == 1) modalfrequency = t('onetime');
    else if (hcstate.frequency == 2) modalfrequency = t('biweekly');
    else if (hcstate.frequency == 3) modalfrequency = t('weekly');
    // let modalmaterials = hcstate.hours * hcstate.materials * hcstate.DI.materialPrice;
    let modalmaterials = hcstate.frequency == 1 ? hcstate.hours * hcstate.materials * hcstate.DI.materialPrice :
        hcstate.frequency == 2 ? hcstate.hours * hcstate.materials * hcstate.DI.materialPrice * 2 :
            hcstate.frequency == 3 ? hcstate.hours * hcstate.materials * hcstate.DI.materialPrice * 4 : 0;
    return (
        <View style={{ marginTop: 22 }}>
            <Modal
                style={{ flex: 1, margin: 0 }}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={1200}
                animationOutTiming={1200}
                avoidKeyboard={true}
                backdropColor='transparent'
                transparent={true}
                isVisible={modalVisible}
                hideModalContentWhileAnimating={false}
                coverScreen={true}
                onBackButtonPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeThreshold={200}
                swipeDirection="down"
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
                    <TouchableOpacity
                        style={{ position: "absolute", right: 0, padding: 15 }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <FontAwesome name="times" size={35} color="#7a7a7a" />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 15, marginTop: 60 }}>
                        <FontRegular mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('servicetype')}></FontRegular>
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('disinfection')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5 }} />
                        <FontRegular mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('details')}></FontRegular>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('frequency')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={modalfrequency}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('duration')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.hours + ' ' + t('hours')}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('numberofcleaners')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.cleaners + ' ' + t('cleaners')}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('materials')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={modalmaterials + ' UAH'}></FontBold>
                            </View>
                        </View>

                        <Spacer />
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('dateandtime')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5 }} />
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('date')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.selectedday}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('time')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.start}></FontBold>
                            </View>
                        </View>
                        <Spacer />
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('address')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5 }} />
                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={state.selected_address_name}></FontBold>
                        <Spacer />
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('price')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5 }} />
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('subtotals')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.subtotal + ' UAH'}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('vat')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.VAT + ' UAH'}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('discount')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.discount + ' UAH'}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('total')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.total + ' UAH'}></FontBold>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true);
                    }} style={styles.modalButtonStyle}>
                    <View flexDirection='row'>
                        <View flexDirection='column'>
                            {/* <Text style={styles.total}>{t('total')} */}
                            <View style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <FontBold mystyle={styles.modalText} value={t('total') + ": "} />
                                    <FontBold mystyle={styles.subtotal}
                                        value={hcstate.frequency == 1 ? "" : "UAH " + hcstate.total} />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <FontBold mystyle={styles.modalText}
                                        value={"UAH " + hcstate.subtotal} />
                                </View>
                            </View>
                        </View>

                        {/* </Text> */}
                        <View flexDirection='column' style={{ justifyContent: 'center' }}>
                            <FontAwesome5 name="chevron-up" size={15} color="#f5c500" />
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        </View >
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%' // is 50% of container width
    },
    modalText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12,
        padding: 0,
    },
    modalButtonStyle: {
        flex: 0.4,
        bottom: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0,
        borderColor: '#7a7a7a',
        color: '#7a7a7a',
        height: 35,
        // fontFamily: 'Comfortaa-Bold',
    },
    total: {
        textAlign: 'left'
    },
    subtotal: {
        fontWeight: 'bold',
        textAlign: 'right',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: 14
    }
});
export default withNamespaces()(ModalDetails);








