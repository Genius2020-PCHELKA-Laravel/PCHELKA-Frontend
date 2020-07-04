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

const UpcomingModalDetails = ({ navigation, t, selectedUpcomingModalDetails, setSelectedUpcomingModalDetails }) => {
    const { state: hcstate, getUpcoming, getSelectedUpcoming, getProviders, dispatch: hcdispatch } = useContext(HCContext);
    const { state } = useContext(UserContext);
    const [changing, setChanging] = useState(false);
    const paymentWaysStr = hcstate.selectedupcoming.paymentWays == 0 ? t('Liqpay') : t('cash');
    const cleanersStr = hcstate.selectedupcoming.serviceType == "HomeCleaning" || hcstate.selectedupcoming.serviceType == "DisinfectionService" || hcstate.selectedupcoming.serviceType == "DeepCleaning" ?
        hcstate.selectedupcoming.cleanerCount > 1 ? t('cleaners') : t('cleaner') :
        hcstate.selectedupcoming.serviceType == "BabysitterService" ?
            hcstate.selectedupcoming.cleanerCount > 1 ? t('babysitters') : t('babysitter') : null;

    const materialsStr = hcstate.selectedupcoming.serviceType == "HomeCleaning" || hcstate.selectedupcoming.serviceType == "DisinfectionService" || hcstate.selectedupcoming.serviceType == "DeepCleaning" || hcstate.selectedupcoming.serviceType == "SofaCleaning" || hcstate.selectedupcoming.serviceType == "MattressCleaning" || hcstate.selectedupcoming.serviceType == "CarpetCleaning" || hcstate.selectedupcoming.serviceType == "CurtainCleaning" ?
        hcstate.selectedupcoming.requireMaterial == 1 ? t('withmaterials') : t('withoutmaterials') :
        hcstate.selectedupcoming.serviceType == "BabysitterService" ?
            "" : "";

    let modalfrequency = '';
    if (hcstate.selectedupcoming.frequency == 1) modalfrequency = t('onetime');
    else if (hcstate.selectedupcoming.frequency == 2) modalfrequency = t('biweekly');
    else if (hcstate.selectedupcoming.frequency == 3) modalfrequency = t('weekly');
    let modalAmount = 0;
    if (typeof hcstate.selectedupcoming.totalAmount == 'undefined')
        modalAmount = 0;
    else
        modalAmount = hcstate.selectedupcoming.totalAmount;
    return (
        <View style={{ marginTop: 0 }}>
            <AlertDialog changing={changing} setChanging={setChanging} />
            <OfflineNotice />
            <Modal
                style={{ flex: 1, margin: 0 }}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={1200}
                animationOutTiming={600}
                avoidKeyboard={true}
                backdropColor='transparent'
                transparent={true}
                isVisible={selectedUpcomingModalDetails}
                hideModalContentWhileAnimating={false}
                coverScreen={true}
                onBackButtonPress={() => setSelectedUpcomingModalDetails(false)}
                onSwipeComplete={() => setSelectedUpcomingModalDetails(false)}
                swipeThreshold={200}
                swipeDirection="down"
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
                    <TouchableOpacity
                        style={{ position: "absolute", right: 0, padding: 15 }}
                        onPress={() => {
                            setSelectedUpcomingModalDetails(!selectedUpcomingModalDetails);
                        }}>
                        <FontAwesome name="times" size={35} color="#7a7a7a" />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 15, marginTop: 60 }}>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('servicetype')} />
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: 'black', fontSize: 18 }} value={t(hcstate.selectedupcoming.serviceType)} />
                            </View>
                        </View>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('refcode')} />
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#000', fontSize: 18, textAlign: "center" }} value={hcstate.selectedupcoming.refCode} />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('status')} />
                            </View>
                            <View style={styles.item}>
                                {
                                    hcstate.selectedupcoming.status == 'Completed' ?
                                        <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 5, borderColor: "#228B22", backgroundColor: "#228B22" }}>
                                            <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('Completed')} />
                                        </View>
                                        : hcstate.selectedupcoming.status == 'Confirmed' ?
                                            <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 5, borderColor: "#f5b100", backgroundColor: "#f5b100" }}>
                                                <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 40, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('confirmed')} />
                                            </View>
                                            : hcstate.selectedupcoming.status == 'Rescheduled' ?
                                                <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 5, borderColor: "#f58800", backgroundColor: "#f58800" }}>
                                                    <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('rescheduled')} />
                                                </View> :
                                                hcstate.selectedupcoming.status == 'Canceled' ?
                                                    <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 5, borderColor: "#b52424", backgroundColor: "#b52424" }}>
                                                        <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('canceled')} />
                                                    </View>
                                                    : null
                                }
                            </View>
                        </View>
                        {
                            hcstate.selectedupcoming.status == 'Confirmed' ?
                                <View style={styles.row}>
                                    <View style={styles.item}>
                                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('confirmedat')} />
                                    </View>
                                    <View style={styles.item}>
                                        <FontBold mystyle={{ color: '#000', fontSize: 18, textAlign: "center" }} value={hcstate.selectedupcoming.updatedAt} />
                                    </View>
                                </View>
                                :
                                hcstate.selectedupcoming.status == 'Rescheduled' ?
                                    <View style={styles.row}>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('rescheduledat')} />
                                        </View>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#000', fontSize: 18, textAlign: "center" }} value={hcstate.selectedupcoming.updatedAt} />
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
                        {/* {
                            hcstate.selectedupcoming.serviceType == "HomeCleaning" ||
                                hcstate.selectedupcoming.serviceType == "DisinfectionService" ||
                                hcstate.selectedupcoming.serviceType == "DeepCleaning" ||
                                hcstate.selectedupcoming.serviceType == "BabysitterService" ?
                                <View>
                                    <View style={styles.row}>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('frequency')}></FontBold>
                                        </View>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={modalfrequency}></FontBold>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('duration')}></FontBold>
                                        </View>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.hoursNeeded + ' ' + t('hours')}></FontBold>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('numberofcleaners')}></FontBold>
                                        </View>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.cleanerCount + ' ' + t('cleaners')}></FontBold>
                                        </View>
                                    </View>
                                </View> :
                                hcstate.selectedupcoming.serviceType == "SofaCleaning" ?
                                    <View style={styles.row}>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('quantity')}></FontBold>
                                        </View>
                                        <View style={styles.item}>
                                            <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.quantity + ' ' + t('seaters')}></FontBold>
                                        </View>
                                    </View>
                                    :
                                    hcstate.selectedupcoming.serviceType == "MattressCleaning" ?
                                        <View style={styles.row}>
                                            <View style={styles.item}>
                                                <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('quantity')}></FontBold>
                                            </View>
                                            <View style={styles.item}>
                                                <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.quantity + ' ' + t('mattresses')}></FontBold>
                                            </View>
                                        </View>
                                        :
                                        hcstate.selectedupcoming.serviceType == "CarpetCleaning" ?
                                            <View>
                                                <View style={styles.row}>
                                                    <View style={styles.item}>
                                                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('quantity')}></FontBold>
                                                    </View>
                                                    <View style={styles.item}>
                                                        <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.quantity + ' ' + t('carpets')}></FontBold>
                                                    </View>
                                                </View>
                                                <View style={styles.row}>
                                                    <View style={styles.item}>
                                                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('squaremeters')}></FontBold>
                                                    </View>
                                                    <View style={styles.item}>
                                                        <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.squareMeters + ' ' + t('squaremeters')}></FontBold>
                                                    </View>
                                                </View>
                                            </View>
                                            :
                                            hcstate.selectedupcoming.serviceType == "CurtainCleaning" ?
                                                <View>
                                                    <View style={styles.row}>
                                                        <View style={styles.item}>
                                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('quantity')}></FontBold>
                                                        </View>
                                                        <View style={styles.item}>
                                                            <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.quantity + ' ' + t('curtains')}></FontBold>
                                                        </View>
                                                    </View>
                                                    <View style={styles.row}>
                                                        <View style={styles.item}>
                                                            <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('squaremeters')}></FontBold>
                                                        </View>
                                                        <View style={styles.item}>
                                                            <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.squareMeters + ' ' + t('squaremeters')}></FontBold>
                                                        </View>
                                                    </View>
                                                </View>
                                                : null
                        }

                        {
                            hcstate.selectedupcoming.serviceType == "HomeCleaning" ||
                                hcstate.selectedupcoming.serviceType == "DisinfectionService" ||
                                hcstate.selectedupcoming.serviceType == "DeepCleaning" ||
                                hcstate.selectedupcoming.serviceType == "SofaCleaning" ||
                                hcstate.selectedupcoming.serviceType == "MattressCleaning" ||
                                hcstate.selectedupcoming.serviceType == "CarpetCleaning" ||
                                hcstate.selectedupcoming.serviceType == "CurtainCleaning" ?
                                <View style={styles.row}>
                                    <View style={styles.item}>
                                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('materials')}></FontBold>
                                    </View>
                                    <View style={styles.item}>
                                        <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.materialPrice + ' UAH'}></FontBold>
                                    </View>
                                </View>
                                : null
                        }

                        <Spacer /> */}
                        <Spacer />
                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('dateandtime')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.duoDate}></FontBold>
                            </View>
                            <View style={styles.item}>
                                <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.duoTime}></FontBold>
                            </View>
                        </View>
                        <Spacer />
                        <FontBold mystyle={{ color: '#7a7a7a', fontSize: 18 }} value={t('address')}></FontBold>
                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
                        <FontBold mystyle={{ color: '#000', fontSize: 18 }} value={hcstate.selectedupcoming.addressDetails.address}></FontBold>
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
                            hcstate.selectedupcomingproviderdata != null ?
                                <View style={styles.providerThumup}>
                                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                            <Image style={styles.image} source={{ uri: hcstate.selectedupcomingproviderdata.imageUrl }} />
                                        </View>
                                        <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <FontBold value={hcstate.selectedupcomingproviderdata.name} />
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                                    {
                                                        hcstate.selectedupcoming.providerEvaluation == 0 ?
                                                            <FontAwesome name="star-o" size={18} color="#ff9800" style={{ top: 3 }} />
                                                            :
                                                            hcstate.selectedupcoming.providerEvaluation == 1 ?
                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                :
                                                                hcstate.selectedupcoming.providerEvaluation == 2 ?
                                                                    <>
                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                    </>
                                                                    :
                                                                    hcstate.selectedupcoming.providerEvaluation == 3 ?
                                                                        <>
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                        </>
                                                                        :
                                                                        hcstate.selectedupcoming.providerEvaluation == 4 ?
                                                                            <>
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                            </>
                                                                            :
                                                                            hcstate.selectedupcoming.providerEvaluation == 5 ?
                                                                                <>
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                </>
                                                                                :
                                                                                hcstate.selectedupcoming.providerEvaluation > 1 && hcstate.selectedupcoming.providerEvaluation < 2 ?
                                                                                    <>
                                                                                        <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                        <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                    </>
                                                                                    :
                                                                                    hcstate.selectedupcoming.providerEvaluation > 2 && hcstate.selectedupcoming.providerEvaluation < 3 ?
                                                                                        <>
                                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                            <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                            <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                        </>
                                                                                        :
                                                                                        hcstate.selectedupcoming.providerEvaluation > 3 && hcstate.selectedupcoming.providerEvaluation < 4 ?
                                                                                            <>
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                            </>
                                                                                            :
                                                                                            hcstate.selectedupcoming.providerEvaluation > 4 && hcstate.selectedupcoming.providerEvaluation < 5 ?
                                                                                                <>
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                    <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                </>
                                                                                                :
                                                                                                <>
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                    <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                                                                </>
                                                    }
                                                </View>
                                                <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                                    <FontBold mystyle={{ fontSize: 12, marginLeft: 5 }} value={hcstate.selectedupcoming.providerEvaluation} />
                                                </View>
                                                {/* <TouchableOpacity style={{ flexDirection: "row" }}>
                                                    <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                                        <FontBold mystyle={styles.bookagainbuttonStyle} value={t('bookagain')} />
                                                    </View>
                                                    <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                                        <FontAwesome name="chevron-right" size={12} color="blue" style={{ marginTop: 5, marginLeft: 2, marginRight: 15 }} />
                                                    </View>
                                                </TouchableOpacity> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{ backgroundColor: "#fff", bottom: 0, flexDirection: 'row', justifyContent: "center" }}>
                                    <ActivityIndicator size={35} color="#f5c500" animating={true} />
                                </View>
                        }
                    </View>
                </ScrollView>
                {
                    modalAmount == 0 ?
                        <View style={{ backgroundColor: "#fff", bottom: 0, flexDirection: 'row', justifyContent: "center" }}>
                            <ActivityIndicator size={35} color="#f5c500" animating={true} />
                        </View>
                        :
                        <TouchableOpacity
                            style={styles.reschedulebuttonStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                if (hcstate.selectedupcoming.status == 'Rescheduled') {
                                    setChanging(true);
                                    return;
                                }
                                setSelectedUpcomingModalDetails(false);
                                // setTimeout(() => {
                                navigate('HCReschedule');
                                // }, 100);
                            }}>
                            <FontBold mystyle={styles.buttonTextStyle} value={t('reschedule')} />
                        </TouchableOpacity>
                }

            </Modal>

        </View>
    );
};








{/* <View flexDirection="column">
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
</View> */}
// <View flexDirection="row" style={{ justifyContent: "center" }}>
//     <FontBold mystyle={styles.totalAmount} value={
//         "UAH " + hcstate.selectedupcoming.totalAmount + " (" +
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
    // bookagainbuttonStyle: {
    //     alignItems: 'center',
    //     textAlign: 'center',
    //     textAlignVertical: "center",
    //     justifyContent: 'center',
    //     color: 'blue',
    //     fontSize: 14,
    //     marginLeft: 15,
    // },
    reschedulebuttonStyle: {
        position: 'absolute',
        bottom: 15,
        left: 10,
        right: 10,
        backgroundColor: '#f5c500',
        borderWidth: 1,
        borderColor: '#f5c500',
        alignItems: 'center',
        borderRadius: 7,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: '#fff',
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
        backgroundColor: '#fff',
        width: 250,
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
export default withNamespaces()(UpcomingModalDetails);