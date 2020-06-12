import React, { Component, useState, useContext } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Context as HCContext } from '../context/HCContext';
import { Context as UserContext } from '../context/UserContext';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { withNamespaces } from 'react-i18next';

const ModalDetails = ({ children, t }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { state: hcstate, getprice0, getprice1, getprice2 } = useContext(HCContext);
    const { state } = useContext(UserContext);
    let modalfrequency = '';
    if (hcstate.frequency == 1) modalfrequency = t('onetime');
    else if (hcstate.frequency == 2) modalfrequency = t('biweekly');
    else if (hcstate.frequency == 3) modalfrequency = t('weekly');
    let materialprice = hcstate.selectedupcoming.serviceType == "HomeCleaning" ? hcstate.HC.materialPrice :
        hcstate.selectedupcoming.serviceType == "DisinfectionService" ? hcstate.DI.materialPrice :
            hcstate.selectedupcoming.serviceType == "DeepCleaning" ? hcstate.DE.materialPrice : 0;
    let modalmaterials = hcstate.frequency == 1 ? hcstate.hours * hcstate.materials * materialprice :
        hcstate.frequency == 2 ? hcstate.hours * hcstate.materials * materialprice * 2 :
            hcstate.frequency == 3 ? hcstate.hours * hcstate.materials * materialprice * 4 : 0;
    return (
        <View style={{ marginTop: 22 }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{ marginLeft: 15, marginTop: 5 }}>

                        <FontAwesome name="times" size={35} color="#7a7a7a" />
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 22 }}>
                    <ScrollView style={styles.container} >
                        <FontRegular mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('servicetype')}></FontRegular>
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t(hcstate.selectedupcoming.serviceType)}></FontBold>
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
                        {
                            hcstate.selectedupcoming.serviceType == "HomeCleaning" ||
                                hcstate.selectedupcoming.serviceType == "DisinfectionService" ||
                                hcstate.selectedupcoming.serviceType == "DeepCleaning" ?
                                <View style={styles.row}>
                                    <View style={styles.item}>
                                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('materials')}></FontBold>
                                    </View>
                                    <View style={styles.item}>
                                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={modalmaterials + ' UAH'}></FontBold>
                                    </View>
                                </View>
                                : null
                        }

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
                    </ScrollView>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }} style={styles.modalButtonStyle}>
                <View flexDirection='row'>

                    <View flexDirection='column'>
                        {/* <Text style={styles.total}>{t('total')} */}
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "column" }}>
                                <FontBold mystyle={styles.modalText} value={t('total') + ": "} />
                                <FontBold mystyle={styles.modalText} value={t('subtotal') + ": "} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <FontBold mystyle={styles.subtotal}
                                    value={hcstate.frequency == 1 ? "" : "UAH " + hcstate.total} />
                                <FontBold mystyle={styles.modalText}
                                    value={"UAH " + hcstate.subtotal} />
                            </View>

                        </View>

                        {/* </Text> */}
                    </View>
                    <View flexDirection='column' style={{ justifyContent: 'center', marginLeft: 25 }}>
                        <FontAwesome5 name="chevron-up" size={25} color="#f5c500" />

                    </View>
                </View>

            </TouchableOpacity>
        </View >
    );

};


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
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
        fontSize: 14,
        padding: 0,
    },
    modalButtonStyle: {
        position: 'absolute',
        left: 10,
        marginRight: 10,
        bottom: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        width: "95%",
        color: '#7a7a7a'
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







