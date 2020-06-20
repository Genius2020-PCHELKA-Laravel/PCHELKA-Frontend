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
import { Context as HCContext } from '../../screens/context/HCContext';
import { Context as UserContext } from '../../screens/context/UserContext';
import Spacer from '../Spacer';
import FontBold from '../FontBold';
import FontLight from '../FontLight';
import FontRegular from '../FontRegular';
import { withNamespaces } from 'react-i18next';

const ModalDetails = ({ children, t }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { state: hcstate, getprice0, getprice1, getprice2 } = useContext(HCContext);
    const { state } = useContext(UserContext);

    // let modalmaterials = hcstate.hours * hcstate.materials * hcstate.HC.materialPrice;
    let modalmaterials = hcstate.squaremeters * hcstate.materials * hcstate.CA.materialPrice;
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
                    style={{ position: "absolute", right: 0, padding: 15 }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <FontAwesome name="times" size={35} color="#7a7a7a" />
                </TouchableOpacity>
                <View style={{ marginTop: 60 }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
                        <FontRegular mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('servicetype')}></FontRegular>
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('CarpetCleaning')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5 }} />
                        <FontRegular mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('details')}></FontRegular>

                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('quantity')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.quantity + ' ' + t('carpets')}></FontBold>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('squaremeters')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={hcstate.squaremeters + ' ' + t('meters')}></FontBold>
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
                    </ScrollView>
                </View>
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
        fontSize: 12,
        padding: 0,
    },
    modalButtonStyle: {
        bottom: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 0,
        borderColor: '#7a7a7a',
        width: "40%",
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
        fontSize: 12
    }
});
export default withNamespaces()(ModalDetails);







