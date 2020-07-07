import React, { Component, useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { navigate } from '../../navigationRef';
import FontBold from "../../components/FontBold";
import FontRegular from "../../components/FontRegular";
import FontLight from "../../components/FontLight";
import { withNamespaces } from 'react-i18next';
import { Context as HCContext } from '../context/HCContext';
import { Context as UserContext } from '../context/UserContext';
import Spacer from '../../components/Spacer';
import OfflineNotice from '../../components/OfflineNotice';
import Modal from 'react-native-modal';
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import AlertDialog from '../../components/AlertDialog';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EvaluationDialog from '../../components/EvaluationDialog';
const PastModalDetails = ({ navigation, t, selectedPastModalDetails, setSelectedPastModalDetails }) => {
    const { state: hcstate, getUpcoming, getSelectedPast, getProviders, dispatch: hcdispatch } = useContext(HCContext);
    const { state: ustate, dispatch: udispatch } = useContext(UserContext);
    const [changing, setChanging] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const paymentWaysStr = hcstate.selectedpast.paymentWays == 0 ? t('Liqpay') : t('cash');
    const cleanersStr = hcstate.selectedpast.serviceType == "HomeCleaning" || hcstate.selectedpast.serviceType == "DisinfectionService" || hcstate.selectedpast.serviceType == "DeepCleaning" ?
        hcstate.selectedpast.cleanerCount > 1 ? t('cleaners') : t('cleaner') :
        hcstate.selectedpast.serviceType == "BabysitterService" ?
            hcstate.selectedpast.cleanerCount > 1 ? t('babysitters') : t('babysitter') : null;

    const materialsStr = hcstate.selectedpast.serviceType == "HomeCleaning" || hcstate.selectedpast.serviceType == "DisinfectionService" || hcstate.selectedpast.serviceType == "DeepCleaning" || hcstate.selectedpast.serviceType == "SofaCleaning" || hcstate.selectedpast.serviceType == "MattressCleaning" || hcstate.selectedpast.serviceType == "CarpetCleaning" || hcstate.selectedpast.serviceType == "CurtainCleaning" ?
        hcstate.selectedpast.requireMaterial == 1 ? t('withmaterials') : t('withoutmaterials') :
        hcstate.selectedpast.serviceType == "BabysitterService" ?
            "" : "";

    let modalfrequency = '';
    if (hcstate.selectedpast.frequency == 1) modalfrequency = t('onetime');
    else if (hcstate.selectedpast.frequency == 2) modalfrequency = t('biweekly');
    else if (hcstate.selectedpast.frequency == 3) modalfrequency = t('weekly');
    let modalAmount = 0;
    if (typeof hcstate.selectedpast.totalAmount == 'undefined')
        modalAmount = 0;
    else
        modalAmount = hcstate.selectedpast.totalAmount;
    const bookagain = () => {

        hcdispatch({ type: 'set_providerid', payload: hcstate.selectedpastproviderdata.id });

        if (hcstate.selectedpast.serviceType === "HomeCleaning") {
            hcdispatch({ type: 'set_frequency', payload: hcstate.selectedpast.frequency });
            hcdispatch({ type: 'set_hours', payload: hcstate.selectedpast.hoursNeeded });
            hcdispatch({ type: 'set_cleaners', payload: hcstate.selectedpast.cleanerCount });
            hcdispatch({ type: 'set_materials', payload: hcstate.selectedpast.requireMaterial });
            udispatch({ type: 'set_selected_address', payload: hcstate.selectedpast.addressDetails.locationId });
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedpast.addressDetails.address });
            setSelectedPastModalDetails(false);
            navigate("HomeCleaningScreen");
        }
        else if (hcstate.selectedpast.serviceType === "DisinfectionService") {
            hcdispatch({ type: 'set_frequency', payload: hcstate.selectedpast.frequency });
            hcdispatch({ type: 'set_hours', payload: hcstate.selectedpast.hoursNeeded });
            hcdispatch({ type: 'set_cleaners', payload: hcstate.selectedpast.cleanerCount });
            hcdispatch({ type: 'set_materials', payload: hcstate.selectedpast.requireMaterial });
            udispatch({ type: 'set_selected_address', payload: hcstate.selectedpast.addressDetails.locationId });
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedpast.addressDetails.address });
            setSelectedPastModalDetails(false);
            navigate("DisinfectionScreen");
        }
        else if (hcstate.selectedpast.serviceType === "DeepCleaning") {
            hcdispatch({ type: 'set_frequency', payload: hcstate.selectedpast.frequency });
            hcdispatch({ type: 'set_hours', payload: hcstate.selectedpast.hoursNeeded });
            hcdispatch({ type: 'set_cleaners', payload: hcstate.selectedpast.cleanerCount });
            hcdispatch({ type: 'set_materials', payload: hcstate.selectedpast.requireMaterial });
            udispatch({ type: 'set_selected_address', payload: hcstate.selectedpast.addressDetails.locationId });
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedpast.addressDetails.address });
            setSelectedPastModalDetails(false);
            navigate("DeepCleaningScreen");
        }
        else if (hcstate.selectedpast.serviceType === "BabysitterService") {
            hcdispatch({ type: 'set_frequency', payload: hcstate.selectedpast.frequency });
            hcdispatch({ type: 'set_hours', payload: hcstate.selectedpast.hoursNeeded });
            hcdispatch({ type: 'set_cleaners', payload: hcstate.selectedpast.cleanerCount });
            udispatch({ type: 'set_selected_address', payload: hcstate.selectedpast.addressDetails.locationId });
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedpast.addressDetails.address });
            setSelectedPastModalDetails(false);
            navigate("BabySitterScreen");
        } else if (hcstate.selectedpast.serviceType === "CarpetCleaning") {
            hcdispatch({ type: 'set_quantity', payload: hcstate.selectedpast.quantity, });
            hcdispatch({ type: 'set_square_meters', payload: hcstate.selectedpast.squareMeters });
            hcdispatch({ type: 'set_materials', payload: hcstate.selectedpast.requireMaterial });
            udispatch({ type: 'set_selected_address', payload: hcstate.selectedpast.addressDetails.locationId });
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedpast.addressDetails.address });
            setSelectedPastModalDetails(false);
            navigate("CarpetCleaningScreen");
        } else if (hcstate.selectedpast.serviceType === "CurtainCleaning") {
            hcdispatch({ type: 'set_quantity', payload: hcstate.selectedpast.quantity, });
            hcdispatch({ type: 'set_square_meters', payload: hcstate.selectedpast.squareMeters });
            hcdispatch({ type: 'set_materials', payload: hcstate.selectedpast.requireMaterial });
            udispatch({ type: 'set_selected_address', payload: hcstate.selectedpast.addressDetails.locationId });
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedpast.addressDetails.address });
            setSelectedPastModalDetails(false);
            navigate("CurtainCleaningScreen");
        } else if (hcstate.selectedpast.serviceType === "MattressCleaning") {
            hcdispatch({ type: 'set_quantity', payload: hcstate.selectedpast.quantity, });
            hcdispatch({ type: 'set_materials', payload: hcstate.selectedpast.requireMaterial });
            udispatch({ type: 'set_selected_address', payload: hcstate.selectedpast.addressDetails.locationId });
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedpast.addressDetails.address });
            setSelectedPastModalDetails(false);
            navigate("MattressCleaningScreen");
        } else if (hcstate.selectedpast.serviceType === "SofaCleaning") {
            hcdispatch({ type: 'set_quantity', payload: hcstate.selectedpast.quantity, });
            hcdispatch({ type: 'set_materials', payload: hcstate.selectedpast.requireMaterial });
            udispatch({ type: 'set_selected_address', payload: hcstate.selectedpast.addressDetails.locationId });
            udispatch({ type: 'set_selected_address_name', payload: hcstate.selectedpast.addressDetails.address });
            setSelectedPastModalDetails(false);
            navigate("SofaCleaningScreen");
        }
    }
    return (
        <View style={{ marginTop: 0 }}>
            <AlertDialog changing={changing} setChanging={setChanging} />
            <OfflineNotice />
            {
                hcstate.selectedpastproviderdata != null ?
                    <EvaluationDialog
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        providerImageURL={hcstate.selectedpastproviderdata.imageUrl}
                        providerName={hcstate.selectedpastproviderdata.name}
                        bookingID={hcstate.selectedpast.id}
                        bookingRefCode={hcstate.selectedpast.refCode}
                        origin={""}
                        notificationId={""}
                    /> :
                    null
            }

            <Modal
                style={{ flex: 1, margin: 0 }}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={1200}
                animationOutTiming={200}
                avoidKeyboard={true}
                backdropColor='transparent'
                transparent={true}
                isVisible={selectedPastModalDetails}
                hideModalContentWhileAnimating={false}
                coverScreen={true}
                onBackButtonPress={() => setSelectedPastModalDetails(false)}
                onSwipeComplete={() => setSelectedPastModalDetails(false)}
                swipeThreshold={200}
                swipeDirection="down"
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
                    <TouchableOpacity
                        style={{ position: "absolute", right: 0, padding: 15 }}
                        onPress={() => {
                            setSelectedPastModalDetails(!selectedPastModalDetails);
                        }}>
                        <FontAwesome name="times" size={35} color="#7a7a7a" />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 15, marginTop: 60 }}>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('servicetype')} />
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t(hcstate.selectedpast.serviceType)} />
                            </View>
                        </View>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('refcode')} />
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#000', fontSize: 18, textAlign: "center" }} value={hcstate.selectedpast.refCode} />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('status')} />
                            </View>
                            <View style={styles.item}>
                                {
                                    hcstate.selectedpast.status == 'Completed' ?
                                        <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 5, borderColor: "#228B22", backgroundColor: "#228B22" }}>
                                            <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('Completed')} />
                                        </View>
                                        : hcstate.selectedpast.status == 'Confirmed' ?
                                            <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 5, borderColor: "#f5b100", backgroundColor: "#f5b100" }}>
                                                <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 40, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('confirmed')} />
                                            </View>
                                            : hcstate.selectedpast.status == 'Rescheduled' ?
                                                <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 5, borderColor: "#f58800", backgroundColor: "#f58800" }}>
                                                    <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('rescheduled')} />
                                                </View> :
                                                hcstate.selectedpast.status == 'Canceled' ?
                                                    <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 5, borderColor: "#b52424", backgroundColor: "#b52424" }}>
                                                        <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('canceled')} />
                                                    </View>
                                                    : null
                                }
                            </View>
                        </View>
                        {
                            hcstate.selectedpast.status == 'Completed' ?
                                <View>
                                    <View style={styles.row}>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('completedat')} />
                                        </View>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#000', fontSize: 18, textAlign: "center" }} value={hcstate.selectedpast.updatedAt} />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('evaluation')} />
                                        </View>
                                        <View style={styles.item}>
                                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                                {
                                                    hcstate.selectedpast.bookingEvaluation == 0 ?

                                                        <TouchableOpacity
                                                            style={{ flexDirection: "row" }}
                                                            onPress={() => { setModalVisible(true); setSelectedPastModalDetails(false); }}
                                                        >
                                                            <View style={{ flexDirection: "column", justifyContent: "center", marginTop: 5 }}>
                                                                <FontAwesome name="star-o" size={18} color="#ff9800" style={{}} />
                                                            </View>
                                                            <View style={{ flexDirection: "column", justifyContent: "center", marginTop: 5 }}>
                                                                <FontBold mystyle={styles.bookagainbuttonStyle} value={t('evaluate')} />
                                                            </View>
                                                            <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                                                <FontAwesome name="chevron-right" size={12} color="blue" style={{ marginTop: 10, marginLeft: 2, marginRight: 15 }} />
                                                            </View>
                                                        </TouchableOpacity>

                                                        :
                                                        hcstate.selectedpast.bookingEvaluation == 1 ?
                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                            :
                                                            hcstate.selectedpast.bookingEvaluation == 2 ?
                                                                <>
                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                </>
                                                                :
                                                                hcstate.selectedpast.bookingEvaluation == 3 ?
                                                                    <>
                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                    </>
                                                                    :
                                                                    hcstate.selectedpast.bookingEvaluation == 4 ?
                                                                        <>
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                        </>
                                                                        :
                                                                        hcstate.selectedpast.bookingEvaluation == 5 ?
                                                                            <>
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                            </>
                                                                            :
                                                                            hcstate.selectedpast.bookingEvaluation > 1 && hcstate.selectedpast.bookingEvaluation < 2 ?
                                                                                <>
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{}} />
                                                                                </>
                                                                                :
                                                                                hcstate.selectedpast.bookingEvaluation > 2 && hcstate.selectedpast.bookingEvaluation < 3 ?
                                                                                    <>
                                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                        <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{}} />
                                                                                    </>
                                                                                    :
                                                                                    hcstate.selectedpast.bookingEvaluation > 3 && hcstate.selectedpast.bookingEvaluation < 4 ?
                                                                                        <>
                                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                            <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{}} />
                                                                                        </>
                                                                                        :
                                                                                        hcstate.selectedpast.bookingEvaluation > 4 && hcstate.selectedpast.bookingEvaluation < 5 ?
                                                                                            <>
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{}} />
                                                                                            </>
                                                                                            :
                                                                                            <>
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                            </>
                                                }
                                                {
                                                    hcstate.selectedpast.bookingEvaluation != 0 ?
                                                        <FontLight mystyle={{ fontSize: 11, marginLeft: 5 }} value={hcstate.selectedpast.bookingEvaluation} />
                                                        : null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                hcstate.selectedpast.status == 'Canceled' ?
                                    <View>
                                        <View style={styles.row}>
                                            <View style={styles.item}>
                                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('canceledat')} />
                                            </View>
                                            <View style={styles.item}>
                                                <FontBold mystyle={{ color: '#000', fontSize: 18, textAlign: "center" }} value={hcstate.selectedpast.updatedAt} />
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.item}>
                                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('cancelreason')} />
                                            </View>
                                            <View style={styles.item}>
                                                <FontBold mystyle={{ color: '#000', fontSize: 18, textAlign: "center" }} value={hcstate.selectedpast.refCode} />
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                        }
                        <Spacer />
                        <FontRegular mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('details')}></FontRegular>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
                        <View flexDirection="column">
                            <FontBold mystyle={{ color: '#000', fontSize: 18 }}
                                value={
                                    hcstate.selectedpast.serviceType == "HomeCleaning" || hcstate.selectedpast.serviceType == "DisinfectionService" || hcstate.selectedpast.serviceType == "DeepCleaning" || hcstate.selectedpast.serviceType == "BabysitterService'" ?
                                        hcstate.selectedpast.hoursNeeded + " " + t('hours') + ", " +
                                        hcstate.selectedpast.cleanerCount + " " + cleanersStr + ", " +
                                        materialsStr
                                        :
                                        hcstate.selectedpast.serviceType == "SofaCleaning" ?
                                            hcstate.selectedpast.quantity + " " + t('seaters') + ", " +
                                            materialsStr
                                            :
                                            hcstate.selectedpast.serviceType == "MattressCleaning" ?
                                                hcstate.selectedpast.quantity + " " + t('mattresses') + ", " +
                                                materialsStr
                                                :
                                                hcstate.selectedpast.serviceType == "CarpetCleaning" ?
                                                    hcstate.selectedpast.quantity + " " + t('carpets') + ", " +
                                                    hcstate.selectedpast.squareMeters + " " + t('squaremeters') + ", " +
                                                    materialsStr
                                                    :
                                                    hcstate.selectedpast.serviceType == "CurtainCleaning" ?
                                                        hcstate.selectedpast.quantity + " " + t('curtains') + ", " +
                                                        hcstate.selectedpast.squareMeters + " " + t('squaremeters') + ", " +
                                                        materialsStr
                                                        : ""

                                }
                            />
                        </View>
                        <Spacer />
                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('dateandtime')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedpast.duoDate}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedpast.duoTime}></FontBold>
                            </View>
                        </View>

                        <Spacer />
                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('address')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
                        <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedpast.addressDetails.address}></FontBold>
                        <Spacer />
                        {/* <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('price')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} /> */}
                        <View flexDirection="row" style={{ justifyContent: "center" }}>
                            <FontBold mystyle={styles.totalAmount} value={
                                "UAH " + modalAmount + " (" +
                                paymentWaysStr
                                + ")"
                            } />
                            <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                {
                                    paymentWaysStr === "Cash" ?
                                        <MaterialCommunityIcons name="cash" size={45} color="#228B22" />
                                        :
                                        <Image style={styles.liqpayimage} source={require('../../../assets/liqpay.png')} />
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        {/* <View style={{ marginTop: 15, marginLeft: 15, width: 300, height: 200 }}> */}
                        {
                            hcstate.selectedpastproviderdata != null ?
                                <View style={styles.providerThumup}>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                            <Image style={styles.image} source={{ uri: hcstate.selectedpastproviderdata.imageUrl }} />
                                        </View>
                                        <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <FontBold value={hcstate.selectedpastproviderdata.name} />
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                                    {
                                                        hcstate.selectedpast.providerEvaluation == 0 ?
                                                            <FontAwesome name="star-o" size={18} color="#ff9800" style={{}} />
                                                            :
                                                            hcstate.selectedpast.providerEvaluation == 1 ?
                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                :
                                                                hcstate.selectedpast.providerEvaluation == 2 ?
                                                                    <>
                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                    </>
                                                                    :
                                                                    hcstate.selectedpast.providerEvaluation == 3 ?
                                                                        <>
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                        </>
                                                                        :
                                                                        hcstate.selectedpast.providerEvaluation == 4 ?
                                                                            <>
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                            </>
                                                                            :
                                                                            hcstate.selectedpast.providerEvaluation == 5 ?
                                                                                <>
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                </>
                                                                                :
                                                                                hcstate.selectedpast.providerEvaluation > 1 && hcstate.selectedpast.providerEvaluation < 2 ?
                                                                                    <>
                                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                        <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{}} />
                                                                                    </>
                                                                                    :
                                                                                    hcstate.selectedpast.providerEvaluation > 2 && hcstate.selectedpast.providerEvaluation < 3 ?
                                                                                        <>
                                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                            <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{}} />
                                                                                        </>
                                                                                        :
                                                                                        hcstate.selectedpast.providerEvaluation > 3 && hcstate.selectedpast.providerEvaluation < 4 ?
                                                                                            <>
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{}} />
                                                                                            </>
                                                                                            :
                                                                                            hcstate.selectedpast.providerEvaluation > 4 && hcstate.selectedpast.providerEvaluation < 5 ?
                                                                                                <>
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                    <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{}} />
                                                                                                </>
                                                                                                :
                                                                                                <>
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{}} />
                                                                                                </>
                                                    }
                                                    {
                                                        hcstate.selectedpast.providerEvaluation != 0 ?
                                                            <FontLight mystyle={{ fontSize: 12, marginLeft: 5, }} value={hcstate.selectedpast.providerEvaluation} />
                                                            :
                                                            <FontLight mystyle={{ fontSize: 12, marginLeft: 5 }} value={t('notevaluated')} />
                                                    }
                                                    <TouchableOpacity
                                                        style={{ flexDirection: "row", bottom: 3 }}
                                                        onPress={() => bookagain()}
                                                    >
                                                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                                            <FontBold mystyle={styles.bookagainbuttonStyle} value={t('bookagain')} />
                                                        </View>
                                                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                                            <FontAwesome name="chevron-right" size={12} color="blue" style={{ marginTop: 5, marginLeft: 2, marginRight: 15 }} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            {
                                                hcstate.selectedpastproviderdata.lastServiceDate != null ?
                                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                        <FontLight mystyle={{ color: "#000", fontSize: 12 }} value={t('lastservedat')} />
                                                        <FontLight mystyle={{ color: "#000", fontSize: 12 }} value={hcstate.selectedpastproviderdata.lastServiceDate} />
                                                    </View>
                                                    :
                                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                        {/* <FontLight mystyle={{ color: "#000", fontSize: 12 }} value={t('lastservedat')} /> */}
                                                        <FontLight mystyle={{ color: "#000", fontSize: 12, textAlign: "center" }} value={t('notcompleted')} />
                                                    </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{ backgroundColor: "#fff", bottom: 0, flexDirection: 'row', justifyContent: "center" }}>
                                    <Image style={{ width: 65, height: 65 }} source={require('../../../assets/spin.gif')} />
                                    {/* <ActivityIndicator size={35} color="#f5c500" animating={true} /> */}
                                </View>
                        }
                    </View>
                </ScrollView>
                {/* {
                    modalAmount == 0 ?
                        <View style={{ backgroundColor: "#fff", bottom: 0, flexDirection: 'row', justifyContent: "center" }}>
                            <ActivityIndicator size={35} color="#f5c500" animating={true} />
                        </View>
                        :
                        <TouchableOpacity
                            style={styles.reschedulebuttonStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                if (hcstate.selectedpast.status == 'Rescheduled') {
                                    setChanging(true);
                                    return;
                                }
                                setSelectedPastModalDetails(false);
                                setTimeout(() => {
                                    navigate('HCReschedule');
                                }, 100);
                            }}>
                            <FontBold mystyle={styles.buttonTextStyle} value={t('bookagain')} />
                        </TouchableOpacity>
                } */}

            </Modal>

        </View>
    );
};








{/* <View flexDirection="column">
    <FontLight mystyle={styles.title} value={t('details')} />
    <FontBold mystyle={styles.subtitle}
        value={
            hcstate.selectedpast.serviceType == "HomeCleaning" || hcstate.selectedpast.serviceType == "DisinfectionService" || hcstate.selectedpast.serviceType == "DeepCleaning" ?
                hcstate.selectedpast.hoursNeeded + " " + t('hours') + ", " +
                hcstate.selectedpast.cleanerCount + " " + cleanersStr + ", " +
                materialsStr
                :
                hcstate.selectedpast.serviceType == "SofaCleaning" ?
                    hcstate.selectedpast.quantity + " " + t('seaters') + ", " +
                    materialsStr
                    :
                    hcstate.selectedpast.serviceType == "MattressCleaning" ?
                        hcstate.selectedpast.quantity + " " + t('mattresses') + ", " +
                        materialsStr
                        :
                        hcstate.selectedpast.serviceType == "CarpetCleaning" ?
                            hcstate.selectedpast.quantity + " " + t('carpets') + ", " +
                            hcstate.selectedpast.squareMeters + " " + t('squaremeters') + ", " +
                            materialsStr
                            :
                            hcstate.selectedpast.serviceType == "CurtainCleaning" ?
                                hcstate.selectedpast.quantity + " " + t('curtains') + ", " +
                                hcstate.selectedpast.squareMeters + " " + t('squaremeters') + ", " +
                                materialsStr
                                : ""

        }
    />
</View> */}
// <View flexDirection="row" style={{ justifyContent: "center" }}>
//     <FontBold mystyle={styles.totalAmount} value={
//         "UAH " + hcstate.selectedpast.totalAmount + " (" +
//         paymentWaysStr
//         + ")"
//     } />
// </View>






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

    title: { marginLeft: 15, marginTop: 15, marginRight: 10, fontSize: 18 },
    subtitle: { marginLeft: 15, marginTop: 0, fontSize: 20, marginBottom: 5, marginRight: 10 },
    totalAmount: { color: '#000', marginTop: 0, fontSize: 24 },
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
    bookagainbuttonStyle: {
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: "center",
        justifyContent: 'center',
        color: 'blue',
        fontSize: 14,
        marginLeft: 15,
    },
    buttonTextStyle: {
        color: 'blue',
        paddingVertical: 10,
        fontSize: 22,
    },
    liqpayimage: {
        marginLeft: 15,
        marginTop: 5,
        width: 75,
        height: 40,
        opacity: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 45,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 2,
        borderColor: "#fff",
    },
    providerThumup: {
        paddingRight: 15,
        backgroundColor: '#fff',
        height: 90,
        borderRadius: 2,
        borderWidth: 0,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        shadowColor: '#7a7a7a',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 10
        },
        elevation: 3,
        shadowRadius: 10,
    },
});
export default withNamespaces()(PastModalDetails);