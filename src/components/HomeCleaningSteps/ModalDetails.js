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
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
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
    let modalfrequency = '';
    if (hcstate.frequency == 1) modalfrequency = 'One-time';
    else if (hcstate.frequency == 2) modalfrequency = 'Bi-weekly';
    else if (hcstate.frequency == 3) modalfrequency = 'Weekly';
    let modalmaterials = hcstate.hours * hcstate.materials * hcstate.HC.materialPrice;
    return (
        <View style={{ marginTop: 22 }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                <View style={{ marginTop: 22 }}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={{ left: 20 }}>

                            <FontAwesome5 name="times" size={50} color="#161924" />
                        </View>
                    </TouchableOpacity>
                    <ScrollView style={styles.container} >
                        <FontRegular mystyle={{ color: 'gray', fontSize: 18 }} value={t('servicetype')}></FontRegular>
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('homecleaning')}></FontBold>
                        <View style={{ borderBottomColor: '#ff9800', borderBottomWidth: 1, }} />
                        <FontRegular mystyle={{ color: 'gray', fontSize: 18 }} value={t('details')}></FontRegular>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('frequency')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={modalfrequency}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('duration')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={hcstate.hours + ' hours'}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('numberofcleaners')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={hcstate.cleaners + ' cleaners'}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('Materials')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={modalmaterials + ' UAH'}></FontBold>
                            </View>
                        </View>

                        <Spacer />
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('dateandtime')}></FontBold>
                        <View style={{ borderBottomColor: '#ff9800', borderBottomWidth: 1, }} />
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('date')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={hcstate.selectedday}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('time')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={hcstate.start}></FontBold>
                            </View>
                        </View>
                        <Spacer />
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('address')}></FontBold>
                        <View style={{ borderBottomColor: '#ff9800', borderBottomWidth: 1, }} />
                        <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={state.selected_address_name}></FontBold>
                        <Spacer />
                        <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t('price')}></FontBold>
                        <View style={{ borderBottomColor: '#ff9800', borderBottomWidth: 1, }} />
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('subtotal')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={hcstate.subtotal + ' UAH'}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('vat')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={hcstate.VAT + ' UAH'}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('discount')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={hcstate.discount + ' UAH'}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={t('total')}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 18 }} value={hcstate.total + ' UAH'}></FontBold>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }} style={styles.modalButtonStyle}>
                <Text style={styles.total}>{t('total')}
                    <Text style={styles.subtotal}>
                        {hcstate.frequency == 'One-time' ? "" : " UAH "}
                    </Text>
                    <Text style={styles.subtotal}>
                        {hcstate.frequency == 'One-time' ? "" : hcstate.total}
                    </Text>
                    {/* <Text style={styles.subtotal}>  UAH</Text>
                    <Text style={styles.subtotal}> {hcstate.total} </Text> */}
                </Text>
                <Text style={styles.modalText}>
                    {hcstate.subtotal} UAH {' '}
                    <FontAwesome5 name="chevron-up" size={15} color="#161924" />
                </Text>
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
        bottom: 10,
        paddingHorizontal: 10,
        // backgroundColor: '#ff9800',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DAA520',
        // fontFamily: 'Comfortaa-Bold',
    },
    total: {
        textAlign: 'left'
    },
    subtotal: {
        textAlign: 'right',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }
});
export default withNamespaces()(ModalDetails);








