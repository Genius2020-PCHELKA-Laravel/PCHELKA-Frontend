import React, { Component, useEffect, useContext, useState } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity, Image, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Context as HCContext } from '../context/HCContext';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
import Spacer from '../../components/Spacer';
import { Card, ListItem, CheckBox, Icon, Badge, withBadge } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
// import Loader from '../../components/Loader';
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';
import { set } from 'react-native-reanimated';
import AlertDialog from '../../components/AlertDialog';
import { BackHandler, RefreshControl } from 'react-native';
import OfflineNotice from '../../components/OfflineNotice';
import UpcomingModalDetails from './UpcomingModalDetails';

const UpcomingScreen = ({ navigation, t }) => {
    const { state: hcstate, getUpcoming, getSelectedUpcoming, dispatch: hcdispatch } = useContext(HCContext);

    // const [isLoading, setIsLoading] = useState(false);
    const [changing, setChanging] = useState(false);
    const [selectedUpcomingModalDetails, setSelectedUpcomingModalDetails] = useState(false);
    // const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isListEnd, setIsListEnd] = useState(false);
    const [serverData, setServerData] = useState([]);
    const [fetching_from_server, set_fetching_from_server] = useState(false);
    const [offset, setOffset] = useState(1);


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
        setLoading(true);
        setIsListEnd(false);
        set_fetching_from_server(false);
        setOffset(2);
        setServerData([]);
        getUpcoming({ page: 1 }).then((response) => {
            setLoading(false);
            if (response.length > 0) {
                console.log("UpcomingScreen::onrefresh::getUpcoming::response:: ");
                console.log("######################1");
                console.log("######################" + JSON.stringify(response[0].id));
                setServerData([...response]);
                set_fetching_from_server(false);
            } else {
                set_fetching_from_server(false);
                setIsListEnd(true);
            }
        }).catch((error) => {
            console.log("Error::UpcomingScree::Onrefresh " + error);
            set_fetching_from_server(false);
            setIsListEnd(true);
            setLoading(false);
        });
    }, [hcstate.reloadAppointments]);
    // useEffect(() => {
    //     // if (!selectedUpcomingModalDetails)
    //     //     alert()
    // }, [selectedUpcomingModalDetails])
    // const _onRefresh = () => {
    //     set_fetching_from_server(false);
    //     setRefreshing(true);
    //     setOffset(2);
    //     setServerData([]);
    //     getUpcoming({ page: 1 }).then((response) => {
    //         if (response.length > 0) {
    //             console.log("UpcomingScreen::onrefresh::getUpcoming::response:: ");
    //             console.log("######################1");
    //             console.log("######################" + JSON.stringify(response[0].id));
    //             setServerData([...response]);
    //             set_fetching_from_server(false);
    //             setRefreshing(false);
    //         } else {
    //             set_fetching_from_server(false);
    //             setIsListEnd(true);
    //         }
    //     }).catch((error) => {
    //         setRefreshing(false);
    //         console.log("Error::UpcomingScree::Onrefresh " + error);
    //         set_fetching_from_server(false);
    //         setIsListEnd(true);
    //     });
    // }
    useEffect(() => {
        loadMoreData();
    }, []);

    const loadMoreData = () => {
        if (!fetching_from_server && !isListEnd) {
            set_fetching_from_server(true);
            getUpcoming({ page: offset }).then((response) => {
                setLoading(false);
                if (response.length > 0) {
                    console.log("UpcomingScreen::loadMoreData::getUpcoming::response:: ");
                    console.log("######################" + offset);
                    console.log("######################" + JSON.stringify(response[0].id));
                    let newoffset = offset + 1;
                    setOffset(newoffset);
                    //After the response increasing the offset for the next API call.
                    setServerData([...serverData, ...response])
                    //adding the new data with old one available
                    set_fetching_from_server(false);
                    //updating the loading state to false
                } else {
                    set_fetching_from_server(false);
                    setIsListEnd(true);
                }
            }).catch((error) => {
                console.log("Error::UpcomingScree:: " + error);
                set_fetching_from_server(false);
                setIsListEnd(true);
                setLoading(false);
            });
        }
    };
    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                {fetching_from_server ? (
                    <Image style={{ width: 65, height: 65 }} source={require('../../../assets/spin.gif')} />
                    // <ActivityIndicator color="#f5c500" style={{ margin: 15 }} />
                ) : null}
            </View>
        );
    }
    const emptyAppoitments = () => {
        return (
            <View style={{ flex: 1 }}>
                <FontBold value={t('noupcomingappoitment')} mystyle={{ marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }} />
            </View>);
    }
    return (
        <View style={{ flex: 1 }}>
            <AlertDialog changing={changing} setChanging={setChanging} />
            <OfflineNotice />
            <UpcomingModalDetails
                selectedUpcomingModalDetails={selectedUpcomingModalDetails}
                setSelectedUpcomingModalDetails={setSelectedUpcomingModalDetails} />
            <View style={styles.container}>
                {loading ? (
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Image style={{ width: 65, height: 65 }} source={require('../../../assets/spin.gif')} />
                    </View>
                ) : (
                        <FlatList
                            style={{ width: '100%', flex: 1 }}
                            keyExtractor={(item, index) => index.toString()}
                            data={serverData}
                            onEndReached={() => loadMoreData()}
                            onEndReachedThreshold={0.5}
                            ListEmptyComponent={emptyAppoitments}
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={refreshing}
                            //         onRefresh={_onRefresh}
                            //     />
                            // }
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        hcdispatch({ type: 'reset_selected_upcoming' });
                                        hcdispatch({ type: 'reset_selected_upcoming_provider_data' });
                                        getSelectedUpcoming({
                                            id: item.id,
                                        }).then((response) => {
                                            hcdispatch({ type: 'set_selected_upcoming_provider_data', payload: item.providerData });
                                            console.log("####SelectedUpcoming####" + JSON.stringify(response));
                                        });
                                        setSelectedUpcomingModalDetails(true);
                                    }}
                                    style={{
                                        backgroundColor: '#fff',
                                    }}>
                                    <Spacer >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <FontBold value={t(item.serviceType)} />
                                                <FontLight value={item.duoDate + ' ' + item.duoTime} />
                                                <View style={{ marginTop: 15, width: 200 }}>
                                                    {
                                                        item.providerData != null ?
                                                            <View style={{ borderWidth: 1, borderRadius: 14 }}>
                                                                <Image style={styles.image} source={{ uri: item.providerData.imageUrl }} />
                                                                <FontBold mystyle={{ position: 'absolute', marginLeft: 25 }} value={item.providerData.name} />
                                                            </View>
                                                            : <View style={{ borderWidth: 1, borderRadius: 14 }}>
                                                                <Image style={styles.image} source={require('../../../assets/Splash/SplashScreen1.png')} />
                                                                <FontBold mystyle={{ position: 'absolute', marginLeft: 25 }} value={'Auto-Assign'} />
                                                            </View>
                                                    }
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'column', position: 'absolute', right: 0 }}>
                                                <FontLight mystyle={{ top: 10, right: 10 }} value={t('refcode') + ': ' + item.refCode} />
                                                {
                                                    item.status == 'Completed' ?
                                                        <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#228B22", backgroundColor: "#228B22" }}>
                                                            <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('Completed')} />
                                                        </View>
                                                        : item.status == 'Confirmed' ?
                                                            <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#f5b100", backgroundColor: "#f5b100" }}>
                                                                <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 40, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('confirmed')} />
                                                            </View>
                                                            : item.status == 'Rescheduled' ?
                                                                <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#f58800", backgroundColor: "#f58800" }}>
                                                                    <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 30, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('rescheduled')} />
                                                                </View> :
                                                                item.status == 'Canceled' ?
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
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            ListFooterComponent={renderFooter}
                        //Adding Load More button as footer component
                        />
                    )}
            </View>






            {/* <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: '#fff' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onRefresh}
                    />
                }
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setPage(page + 1);
                        console.log(page)
                        getUpcoming({ page: page }).then((response) => {
                            // console.log("UpcomingScreen::onrefresh::getUpcoming::response:: ");
                            console.log("######################" + JSON.stringify(response[0].id));
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                }}
                scrollEventThrottle={400}
            >
                {
                    hcstate.upcoming.length === 0 || hcstate.upcoming === undefined ?
                        <FontBold value={t('noupcomingappoitment')} mystyle={{ marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }} />
                        :
                        hcstate.upcoming.sort((a, b) => a.id < b.id ? 1 : -1).map((booking, i) => {
                            return (
                                <TouchableOpacity
                                    key={booking.id}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        hcdispatch({ type: 'reset_selected_upcoming' });
                                        hcdispatch({ type: 'reset_selected_upcoming_provider_data' });
                                        getSelectedUpcoming({
                                            id: booking.id,
                                        }).then((response) => {
                                            hcdispatch({ type: 'set_selected_upcoming_provider_data', payload: booking.providerData });
                                            console.log("####SelectedUpcoming####" + JSON.stringify(response));
                                        });
                                        setSelectedUpcomingModalDetails(true);
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
                                                                <Image style={styles.image} source={require('../../../assets/Splash/SplashScreen1.png')} />
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
                                                            <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#f5b100", backgroundColor: "#f5b100" }}>
                                                                <FontBold mystyle={{ fontSize: 12, paddingVertical: 2, paddingHorizontal: 40, textAlign: "center", textAlignVertical: 'center', color: "#fff" }} value={t('confirmed')} />
                                                            </View>
                                                            : booking.status == 'Rescheduled' ?
                                                                <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 38, borderColor: "#f58800", backgroundColor: "#f58800" }}>
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
            </ScrollView> */}

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
        fontSize: 20,
        fontWeight: "500"
    },
    image: {
        width: 25,
        height: 25,
        borderRadius: 35,
        marginLeft: 0,
        marginRight: 10,
        borderWidth: 3,
        borderColor: "#fff",
        opacity: 1,

    },
    noappoitments: {
        width: "100%",
        marginTop: 0
    },
    separator: {
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
export default withNamespaces()(UpcomingScreen);