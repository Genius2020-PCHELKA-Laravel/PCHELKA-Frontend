import React, { Component, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { navigate } from '../../navigationRef';
import FontBold from "../../components/FontBold";
import FontRegular from "../../components/FontRegular";
import FontLight from "../../components/FontLight";
import { withNamespaces } from 'react-i18next';
import { Context as HCContext } from '../context/HCContext';
import Spacer from '../../components/Spacer';

const UpcomingDetailsScreen = ({ navigation, t }) => {
    const { state: hcstate, getUpcoming, getSelectedUpcoming, getProviders, dispatch: hcdispatch } = useContext(HCContext);
    const paymentWaysStr = hcstate.selectedupcoming.paymentWays == 0 ? t('Liqpay') : t('cash');
    const cleanersStr = hcstate.selectedupcoming.cleanerCount > 1 ? t('cleaners') : t('cleaner');
    const materialsStr = hcstate.selectedupcoming.requireMaterial == 1 ? t('withmaterials') : t('withoutmaterials');


    return (
        <View style={styles.container}>
            <View flexDirection="column">
                <FontLight mystyle={styles.title} value={t('status')} />
                <FontBold mystyle={styles.subtitle} value={t(hcstate.selectedupcoming.status)} />
            </View>
            <View flexDirection="row">
                <View flexDirection="column" style={{ width: "50%" }}>
                    <FontLight mystyle={styles.title} value={t('servicetype')} />
                    <FontBold mystyle={styles.subtitle} value={t(hcstate.selectedupcoming.serviceType)} />
                </View>
                <View flexDirection="column" style={{ width: "50%" }}>
                    <FontLight mystyle={styles.title} value={t('refcode')} />
                    <FontBold mystyle={styles.subtitle} value={t(hcstate.selectedupcoming.refCode)} />
                </View>
            </View>
            <View flexDirection="column">
                <FontLight mystyle={styles.title} value={t('address')} />
                <FontBold mystyle={styles.subtitle}
                    value={hcstate.selectedupcoming.addressDetails.address + "; " +
                        hcstate.selectedupcoming.addressDetails.street + "; " +
                        hcstate.selectedupcoming.addressDetails.buildingNumber + "; " +
                        hcstate.selectedupcoming.addressDetails.apartment
                    } />
            </View>
            <View flexDirection="column">
                <FontLight mystyle={styles.title} value={t('schedule')} />
                <FontBold mystyle={styles.subtitle} value={hcstate.selectedupcoming.duoDate + "   " + hcstate.selectedupcoming.duoTime} />
            </View>
            <View flexDirection="column">
                <FontLight mystyle={styles.title} value={t('details')} />
                <FontBold mystyle={styles.subtitle}
                    value={
                        hcstate.selectedupcoming.hoursNeeded + " " + t('hours') + ", " +
                        hcstate.selectedupcoming.cleanerCount + " " + cleanersStr + ", " +
                        materialsStr
                    }
                />
            </View>
            <View flexDirection="column">
                <FontBold mystyle={styles.totalAmount} value={
                    "UAH " + hcstate.selectedupcoming.totalAmount + " (" +
                    paymentWaysStr
                    + ")"
                } />
            </View>

            {/* <TouchableOpacity
                style={styles.cancelbuttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                    navigate('HCReschedule');
                }}>
                <FontBold mystyle={styles.buttonTextStyle} value={t('cancel')} />
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.reschedulebuttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                    navigate('HCReschedule');
                }}>
                <FontBold mystyle={styles.buttonTextStyle} value={t('reschedule')} />
            </TouchableOpacity>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: { marginLeft: 15, marginTop: 15 },
    subtitle: { marginLeft: 15, marginTop: 0, fontSize: 18, marginBottom: 5, },
    totalAmount: { color: '#f5c500ff', marginLeft: 15, marginTop: 50, fontSize: 18, },
    // reschedulebuttonStyle: {
    //     position: 'absolute',
    //     bottom: 15,
    //     right: 10,
    //     backgroundColor: '#404d21',
    //     borderWidth: 1,
    //     borderColor: '#fff',
    //     alignItems: 'center',
    //     borderRadius: 7,
    //     marginTop: 20,
    //     marginBottom: 20,
    //     height: 50,
    //     textAlign: 'center',
    //     justifyContent: 'center',
    //     width: "40%"
    // },
    // cancelbuttonStyle: {
    //     position: 'absolute',
    //     bottom: 15,
    //     left: 10,
    //     backgroundColor: '#d21404',
    //     borderWidth: 1,
    //     borderColor: '#fff',
    //     alignItems: 'center',
    //     borderRadius: 7,
    //     marginTop: 20,
    //     marginBottom: 20,
    //     height: 50,
    //     textAlign: 'center',
    //     justifyContent: 'center',
    //     width: "40%"
    // },
    reschedulebuttonStyle: {
        position: 'absolute',
        bottom: 15,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: '#7a7a7a',
        paddingVertical: 10,
        fontSize: 22,
    },
});
export default withNamespaces()(UpcomingDetailsScreen);