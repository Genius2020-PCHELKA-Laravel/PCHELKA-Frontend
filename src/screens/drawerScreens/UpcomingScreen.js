import React, { Component, useEffect, useContext, useState } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
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
    const [refreshing, setRefreshing] = useState(false);


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
    const _onRefresh = () => {
        setRefreshing(true);
        getUpcoming().then((response) => {
            console.log("UpcomingScreen::onrefresh::getUpcoming::response:: ");
            console.log("######################" + JSON.stringify(response));
            setRefreshing(false);
        }).catch((error) => {
            setRefreshing(false);
            console.log(error);
        });
    }
    return (
        <View style={{ flex: 1 }}>
            <AlertDialog changing={changing} setChanging={setChanging} />
            <UpcomingModalDetails
                selectedUpcomingModalDetails={selectedUpcomingModalDetails}
                setSelectedUpcomingModalDetails={setSelectedUpcomingModalDetails} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: '#fff' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onRefresh}
                    />
                }
            >
                {/* <Loader loading={isLoading} /> */}
                {/* <Text style={{ left: 30, fontSize: 35 }}>{JSON.stringify(hcstate.upcoming)}</Text> */}
                {
                    hcstate.upcoming.length === 0 || hcstate.upcoming === undefined ?
                        // <Image style={styles.noappoitments} source={require('../../../assets/noappoitments.png')} />
                        <FontBold value={t('noupcomingappoitment')} mystyle={{ marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }} />
                        :
                        hcstate.upcoming.sort((a, b) => a.id < b.id ? 1 : -1).map((booking, i) => {
                            return (
                                <TouchableOpacity
                                    key={booking.id}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        // if (booking.status == 'Rescheduled') {
                                        //     setChanging(true);
                                        //     return;
                                        // }
                                        hcdispatch({ type: 'resetset_selected_upcoming' });
                                        hcdispatch({ type: 'set_selected_upcoming_provider_data', payload: booking.providerData });
                                        getSelectedUpcoming({
                                            id: booking.id,
                                            // providerData: booking.providerData
                                        }).then((response) => {
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
                                                {/* <Image source={{ uri: booking.providerData.imageUrl }} /> */}
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
            </ScrollView>
            {/* <TouchableOpacity style={{ backgroundColor: "#fff" }} onPress={() => { navigate('HomeNavigator') }}>
                <Spacer>
                    <FontBold
                        value={t('homepage')}
                        mystyle={{
                            textDecorationLine: 'underline',
                            textDecorationStyle: "solid",
                            textDecorationColor: "blue",
                            textAlign: "center",
                            fontSize: 12,
                            color: 'blue'
                        }} />
                </Spacer>
            </TouchableOpacity> */}
            <OfflineNotice />

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
});
export default withNamespaces()(UpcomingScreen);