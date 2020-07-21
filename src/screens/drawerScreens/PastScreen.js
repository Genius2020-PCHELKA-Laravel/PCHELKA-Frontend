import React, { Component, useEffect, useContext, useState } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { Context as HCContext } from '../context/HCContext';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
import Spacer from '../../components/Spacer';
import { Card, ListItem, CheckBox, Icon, Badge, withBadge, normalize } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
// import Loader from '../../components/Loader';
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';
import { set } from 'react-native-reanimated';
import { BackHandler, RefreshControl } from 'react-native';
import OfflineNotice from '../../components/OfflineNotice';
import PastModalDetails from './PastModalDetails';
import { Normalize, fontNormalize } from '../../components/actuatedNormalize';

const PastScreen = ({ navigation, t }) => {
    const { state: hcstate, getPast, dispatch: hcdispatch, getSelectedPast, } = useContext(HCContext);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPastModalDetails, setSelectedPastModalDetails] = useState(false);
    // const [prefreshing, psetRefreshing] = useState(false);
    const [ploading, psetLoading] = useState(true);
    const [pisListEnd, psetIsListEnd] = useState(false);
    const [pserverData, psetServerData] = useState([]);
    const [pfetching_from_server, pset_fetching_from_server] = useState(false);
    const [poffset, psetOffset] = useState(1);

    const unsubscribe = navigation.addListener('didFocus', () => {
        BackHandler.addEventListener('hardwareBackPress', () => { return true; });
    });
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => { return true; });
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => { return true; });
            // navigation.removeListener('didFocus', () => { })
        };
    }, []);
    useEffect(() => {
        psetLoading(true);
        psetIsListEnd(false);
        pset_fetching_from_server(false);
        psetOffset(2);
        psetServerData([]);
        getPast({ page: 1 }).then((response) => {
            psetLoading(false);
            if (response.length > 0) {
                console.log("PastScreen::onrefresh::getUpcoming::response:: ");
                console.log("######################1");
                console.log("######################" + JSON.stringify(response[0].id));
                psetServerData([...response]);
                pset_fetching_from_server(false);
            } else {
                pset_fetching_from_server(false);
                psetIsListEnd(true);
            }
        }).catch((error) => {
            console.log("Error::UpcomingScree::Onrefresh " + error);
            pset_fetching_from_server(false);
            psetIsListEnd(true);
            psetLoading(false);
        });
    }, [hcstate.reloadAppointments]);

    // const p_onRefresh = () => {
    //     pset_fetching_from_server(false);
    //     psetRefreshing(true);
    //     psetOffset(2);
    //     psetServerData([]);
    //     getPast({ page: 1 }).then((presponse) => {
    //         if (presponse.length > 0) {
    //             console.log("PastScreen::onrefresh::getPast::response:: ");
    //             console.log("######################1");
    //             if (typeof presponse[0].id != 'undefined')
    //                 console.log("######################" + JSON.stringify(presponse[0].id));

    //             psetServerData([...presponse]);
    //             pset_fetching_from_server(false);
    //             psetRefreshing(false);
    //         } else {
    //             pset_fetching_from_server(false);
    //             psetIsListEnd(true);
    //         }
    //     }).catch((error) => {
    //         psetRefreshing(false);
    //         console.log("Error::PatScreen::Onrefresh " + error);
    //         pset_fetching_from_server(false);
    //         psetIsListEnd(true);
    //     });
    // }
    useEffect(() => {
        ploadMoreData();
    }, []);

    const ploadMoreData = () => {
        if (!pfetching_from_server && !pisListEnd) {
            pset_fetching_from_server(true);
            getPast({ page: poffset }).then((presponse) => {
                psetLoading(false);
                if (presponse.length > 0) {
                    console.log("PastScreen::loadMoreData::getPast::presponse:: ");
                    console.log("######################" + poffset);
                    if (typeof presponse[0].id != 'undefined')
                        console.log("######################" + JSON.stringify(presponse[0].id));
                    let pnewoffset = poffset + 1;
                    psetOffset(pnewoffset);
                    //After the response increasing the offset for the next API call.
                    psetServerData([...pserverData, ...presponse])
                    //adding the new data with old one available
                    pset_fetching_from_server(false);
                    //updating the loading state to false
                } else {
                    pset_fetching_from_server(false);
                    psetIsListEnd(true);
                }
            }).catch((error) => {
                console.log("Error::PastScreen:: " + error);
                pset_fetching_from_server(false);
                psetIsListEnd(true);
                psetLoading(false);
            });
        }
    };
    const prenderFooter = () => {
        return (
            <View style={styles.footer}>
                {pfetching_from_server ? (
                    <Image style={{ width: Normalize(65), height: Normalize(65) }} source={require('../../../assets/spin.gif')} />
                    // <ActivityIndicator color="#f5c500" style={{ margin: 15 }} />
                ) : null}
            </View>
        );
    }
    const pemptyAppoitments = () => {
        return (
            <View style={{ flex: 1 }}>
                <FontBold value={t('nopastappoitments')} mystyle={{ marginTop: Normalize(15), marginLeft: Normalize(15), marginRight: Normalize(15), fontSize: fontNormalize(18) }} />
            </View>);
    }
    return (
        <View style={{ flex: 1 }}>
            <OfflineNotice />
            <PastModalDetails
                selectedPastModalDetails={selectedPastModalDetails}
                setSelectedPastModalDetails={setSelectedPastModalDetails} />

            <View style={styles.container}>
                {ploading ? (
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Image style={{ width: Normalize(65), height: Normalize(65) }} source={require('../../../assets/spin.gif')} />
                    </View>
                ) : (
                        <FlatList
                            style={{ width: '100%', flex: 1 }}
                            keyExtractor={(item, index) => index.toString()}
                            data={pserverData}
                            onEndReached={() => ploadMoreData()}
                            onEndReachedThreshold={0.5}
                            ListEmptyComponent={pemptyAppoitments}
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={prefreshing}
                            //         onRefresh={p_onRefresh}
                            //     />
                            // }
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        hcdispatch({ type: 'reset_selected_past' });
                                        hcdispatch({ type: 'reset_selected_past_provider_data' });
                                        getSelectedPast({
                                            id: item.id,
                                        }).then((response) => {
                                            hcdispatch({ type: 'set_selected_past_provider_data', payload: item.providerData });
                                            console.log("####SelectedPast####" + JSON.stringify(response));
                                        });
                                        setSelectedPastModalDetails(true);
                                    }}
                                    style={{
                                        backgroundColor: '#fff'
                                    }}>
                                    <Spacer >
                                        <View style={{ flexDirection: 'row' }}>
                                            <FontBold mystyle={{ fontSize: fontNormalize(14), }} value={t(item.serviceType)} />
                                            <FontLight mystyle={{ fontSize: fontNormalize(14), position: "absolute", right: Normalize(10) }} value={t('refcode') + ': ' + item.refCode} />
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <FontLight value={item.duoDate + ' ' + item.duoTime} />
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>

                                            <View style={{ marginTop: Normalize(15), width: Normalize(200) }}>
                                                {
                                                    item.providerData != null ?
                                                        <View style={{ borderWidth: 1, borderRadius: 20 }}>
                                                            <Image style={styles.image} source={{ uri: item.providerData.imageUrl }} />
                                                            <FontBold mystyle={{ fontSize: fontNormalize(12), position: 'absolute', marginLeft: Normalize(35) }} value={item.providerData.name} />
                                                        </View>
                                                        : <View style={{ borderWidth: 1, borderRadius: 20 }}>
                                                            <Image style={styles.image} source={require('../../../assets/Splash/FinalSplash.png')} />
                                                            <FontBold mystyle={{ fontSize: fontNormalize(12), position: 'absolute', marginLeft: Normalize(25) }} value={'Auto-Assign'} />
                                                        </View>
                                                }
                                            </View>
                                            <View style={{ flexDirection: 'column', marginRight: Normalize(15), marginTop: Normalize(15), marginLeft: Normalize(15), }}>
                                                {
                                                    item.status == 'Completed' ?
                                                        <View style={{ borderWidth: 1, borderRadius: 14, borderColor: "#228B22", backgroundColor: "#228B22" }}>
                                                            <FontBold mystyle={{ fontSize: fontNormalize(12), paddingVertical: 2, paddingHorizontal: Normalize(30), textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('Completed')} />
                                                        </View>
                                                        : item.status == 'Confirmed' ?
                                                            <View style={{ borderWidth: 1, borderRadius: 14, borderColor: "#f5c500", backgroundColor: "#f5c500" }}>
                                                                <FontBold mystyle={{ fontSize: fontNormalize(12), paddingVertical: 2, paddingHorizontal: Normalize(30), textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('confirmed')} />
                                                            </View>
                                                            : item.status == 'Rescheduled' ?
                                                                <View style={{ borderWidth: 1, borderRadius: 14, borderColor: "#ff9800", backgroundColor: "#ff9800" }}>
                                                                    <FontBold mystyle={{ fontSize: fontNormalize(12), paddingVertical: 2, paddingHorizontal: Normalize(30), textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('rescheduled')} />
                                                                </View> :
                                                                item.status == 'Canceled' ?
                                                                    <View style={{ borderWidth: 1, borderRadius: 14, borderColor: "#b52424", backgroundColor: "#b52424" }}>
                                                                        <FontBold mystyle={{ fontSize: fontNormalize(12), paddingVertical: 2, paddingHorizontal: Normalize(30), textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('canceled')} />
                                                                    </View>
                                                                    : null
                                                }
                                            </View>


                                        </View>
                                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: Normalize(10) }} />
                                    </Spacer>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            ListFooterComponent={prenderFooter}
                        //Adding Load More button as footer component
                        />
                    )}
            </View>
            {/* <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onRefresh}
                    />
                }
            >
                {
                    hcstate.past.length === 0 || hcstate.past === undefined ?
                        <FontBold value={t('nopastappoitments')} mystyle={{ marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 20 }} />
                        :
                        hcstate.past.sort((a, b) => a.id < b.id ? 1 : -1).map((booking, i) => {
                            return (
                                <TouchableOpacity
                                    key={booking.id}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        hcdispatch({ type: 'reset_selected_past' });
                                        hcdispatch({ type: 'reset_selected_past_provider_data' });
                                        getSelectedPast({
                                            id: booking.id,
                                        }).then((response) => {
                                            hcdispatch({ type: 'set_selected_past_provider_data', payload: booking.providerData });
                                            console.log("####SelectedPast####" + JSON.stringify(response));
                                        });
                                        setSelectedPastModalDetails(true);
                                    }}
                                    style={{
                                        backgroundColor: '#fff'
                                    }}>
                                    <Spacer >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <FontBold value={t(booking.serviceType)} />
                                                <FontLight value={booking.duoDate + ' ' + booking.duoTime} />
                                                <View style={{ marginTop: 15, width: 200 }}>
                                                    {
                                                        booking.providerData != null ?
                                                            <View style={{ borderWidth: 1, borderRadius: 14 }}>
                                                                <Image style={styles.image} source={{ uri: booking.providerData.imageUrl }} />
                                                                <FontBold mystyle={{ position: 'absolute', marginLeft: 25 }} value={booking.providerData.name} />
                                                            </View>
                                                            : <View style={{ borderWidth: 1, borderRadius: 14 }}>
                                                                <Image style={styles.image} source={require('../../../assets/Splash/FinalSplash.png')} />
                                                                <FontBold mystyle={{ position: 'absolute', marginLeft: 25 }} value={'Auto-Assign'} />
                                                            </View>
                                                    }
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'column', position: 'absolute', right: 0 }}>
                                                <FontLight mystyle={{ top: 10, right: 10 }} value={t('refcode') + ': ' + booking.refCode} />
                                                {
                                                    booking.status == 'Completed' ?
                                                        <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#228B22", backgroundColor: "#228B22" }}>
                                                            <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('Completed')} />
                                                        </View>
                                                        : booking.status == 'Confirmed' ?
                                                            <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#f5c500", backgroundColor: "#f5c500" }}>
                                                                <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('confirmed')} />
                                                            </View>
                                                            : booking.status == 'Rescheduled' ?
                                                                <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#ff9800", backgroundColor: "#ff9800" }}>
                                                                    <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('rescheduled')} />
                                                                </View> :
                                                                booking.status == 'Canceled' ?
                                                                    <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#b52424", backgroundColor: "#b52424" }}>
                                                                        <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('canceled')} />
                                                                    </View>
                                                                    : null
                                                }
                                            </View>

                                        </View>
                                        <View style={{ borderBottomColor: '#f5c500', borderBottomWidth: 1, marginTop: 10 }} />
                                    </Spacer>
                                </TouchableOpacity>
                            );
                        })
                }
            </ScrollView > */}

        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Text: {
        color: "#161924",
        fontSize: fontNormalize(20),
        fontWeight: "500"
    },
    image: {
        width: Normalize(25),
        height: Normalize(25),
        borderRadius: 35,
        marginLeft: 0,
        marginRight: Normalize(10),
        borderWidth: 3,
        borderColor: "#fff",
        opacity: 1,

    },
    noappoitments: {
        width: "100%",
        marginTop: 0
    },
    footer: {
        padding: Normalize(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
export default withNamespaces()(PastScreen);