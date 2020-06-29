import React, { Component, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { navigate } from '../../navigationRef';
import FontBold from "../../components/FontBold";
import FontRegular from "../../components/FontRegular";
import FontLight from "../../components/FontLight";
import { withNamespaces } from 'react-i18next';
import { Context as HCContext } from '../context/HCContext';
import Spacer from '../../components/Spacer';
import OfflineNotice from '../../components/OfflineNotice';

const UpcomingDetailsScreen = ({ navigation, t }) => {
    const { state: hcstate, getUpcoming, getSelectedUpcoming, getProviders, dispatch: hcdispatch } = useContext(HCContext);
    const paymentWaysStr = hcstate.selectedupcoming.paymentWays == 0 ? t('Liqpay') : t('cash');
    const cleanersStr = hcstate.selectedupcoming.serviceType == "HomeCleaning" || hcstate.selectedupcoming.serviceType == "DisinfectionService" || hcstate.selectedupcoming.serviceType == "DeepCleaning" ?
        hcstate.selectedupcoming.cleanerCount > 1 ? t('cleaners') : t('cleaner') :
        hcstate.selectedupcoming.serviceType == "BabysitterService" ?
            hcstate.selectedupcoming.cleanerCount > 1 ? t('babysitters') : t('babysitter') : null;

    const materialsStr = hcstate.selectedupcoming.serviceType == "HomeCleaning" || hcstate.selectedupcoming.serviceType == "DisinfectionService" || hcstate.selectedupcoming.serviceType == "DeepCleaning" || hcstate.selectedupcoming.serviceType == "SofaCleaning" || hcstate.selectedupcoming.serviceType == "MattressCleaning" || hcstate.selectedupcoming.serviceType == "CarpetCleaning" || hcstate.selectedupcoming.serviceType == "CurtainCleaning" ?
        hcstate.selectedupcoming.requireMaterial == 1 ? t('withmaterials') : t('withoutmaterials') :
        hcstate.selectedupcoming.serviceType == "BabysitterService" ?
            "" : "";



    return (
        <View style={styles.container}>
            <OfflineNotice />

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
                        hcstate.selectedupcoming.serviceType == "HomeCleaning" || hcstate.selectedupcoming.serviceType == "DisinfectionService" || hcstate.selectedupcoming.serviceType == "DeepCleaning" ?
                            hcstate.selectedupcoming.hoursNeeded + " " + t('hours') + ", " +
                            hcstate.selectedupcoming.cleanerCount + " " + cleanersStr + ", " +
                            materialsStr
                            :
                            hcstate.selectedupcoming.serviceType == "SofaCleaning" ?
                                hcstate.selectedupcoming.quantity + " " + t('seaters') + ", " +
                                materialsStr
                                :
                                hcstate.selectedupcoming.serviceType == "MattressCleaning" ?
                                    hcstate.selectedupcoming.quantity + " " + t('mattresses') + ", " +
                                    materialsStr
                                    :
                                    hcstate.selectedupcoming.serviceType == "CarpetCleaning" ?
                                        hcstate.selectedupcoming.quantity + " " + t('carpets') + ", " +
                                        hcstate.selectedupcoming.squareMeters + " " + t('squaremeters') + ", " +
                                        materialsStr
                                        :
                                        hcstate.selectedupcoming.serviceType == "CurtainCleaning" ?
                                            hcstate.selectedupcoming.quantity + " " + t('curtains') + ", " +
                                            hcstate.selectedupcoming.squareMeters + " " + t('squaremeters') + ", " +
                                            materialsStr
                                            : ""

                    }
                />
            </View>
            <View flexDirection="row" style={{ justifyContent: "center" }}>
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
                <FontBold mystyle={styles.buttonTextStyle} value={t('next')} />
            </TouchableOpacity>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: { marginLeft: 15, marginTop: 15, marginRight: 10, fontSize: 18 },
    subtitle: { marginLeft: 15, marginTop: 0, fontSize: 20, marginBottom: 5, marginRight: 10 },
    totalAmount: { color: '#ff9800', marginTop: 50, fontSize: 24 },
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