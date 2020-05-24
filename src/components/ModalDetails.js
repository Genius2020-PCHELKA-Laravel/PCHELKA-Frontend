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
import { Context as HCContext } from '../screens/context/HCContext';
import Spacer from './Spacer';
import FontBold from './FontBold';
import FontLight from './FontLight';
import FontRegular from './FontRegular';

const ModalDetails = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { state, getprice0, getprice1, getprice2 } = useContext(HCContext);

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
                    <ScrollView style={styles.container}>
                        <FontRegular mystyle={{ color: 'gray', fontSize: 21 }} value='SERVICE TYPE'></FontRegular>
                        <Spacer />
                        <FontBold mystyle={{ color: 'black', fontSize: 21 }} value='Home Cleaning'></FontBold>
                        <View style={{ borderBottomColor: '#f1c40f', borderBottomWidth: 1, }} />
                        <Spacer />

                        <FontRegular mystyle={{ color: 'gray', fontSize: 21 }} value='Details'></FontRegular>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Frequency'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.frequency}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Duration'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.hours}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={'Number of Cleaners'}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.cleaners}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Material'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.materials}></FontBold>
                            </View>
                        </View>
                        <Spacer>
                            <View style={{ borderBottomColor: '#f1c40f', borderBottomWidth: 1, }} />
                        </Spacer>
                        <FontRegular mystyle={{ color: 'gray', fontSize: 21 }} value='Date & Time'></FontRegular>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Date'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.full_date}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Time'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.start}></FontBold>
                            </View>
                        </View>
                        <Spacer>
                            <View style={{ borderBottomColor: '#f1c40f', borderBottomWidth: 1, }} />
                        </Spacer>
                        <Spacer />
                        <FontRegular mystyle={{ color: 'gray', fontSize: 21 }} value='Address'></FontRegular>
                        <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.selected_address_name}></FontBold>
                        <Spacer>
                            <View style={{ borderBottomColor: '#f1c40f', borderBottomWidth: 1, }} />
                        </Spacer>
                        <FontRegular mystyle={{ color: 'gray', fontSize: 21 }} value='Price'></FontRegular>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Subtotal'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.subtotal}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='VAT'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.VAT}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Discount'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.discount}></FontBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value='Total'></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'gray', fontSize: 21 }} value={state.total}></FontBold>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }} style={styles.modalButtonStyle}>
                <Text style={styles.total}>Total
                <Text style={styles.subtotal}>
                        {state.frequency == 'One-time' ? "" : " UAH "}
                    </Text>
                    <Text style={styles.subtotal}>
                        {state.frequency == 'One-time' ? "" : state.total}
                    </Text>
                    {/* <Text style={styles.subtotal}>  UAH</Text>
                    <Text style={styles.subtotal}> {state.total} </Text> */}
                </Text>
                <Text style={styles.modalText}>
                    {state.subtotal} UAH {' '}
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
        // backgroundColor: '#f1c40f',
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
export default ModalDetails;








