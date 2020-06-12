import React, { Component, useEffect, useContext, useState } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Context as HCContext } from '../context/HCContext';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
import Spacer from '../../components/Spacer';
import { Card, ListItem, CheckBox, Icon, Badge, withBadge } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';
import { set } from 'react-native-reanimated';

const UpcomingScreen = ({ navigation, t }) => {
    const { state: hcstate, getUpcoming, getSelectedUpcoming, dispatch: hcdispatch } = useContext(HCContext);
    const [isLoading, setIsLoading] = useState(false);


    // useEffect(() => {
    //     let isCancelled1 = false;
    //     if (!isCancelled1)
    //         setIsLoading(true);
    //     getUpcoming().then((response) => {
    //         //console.log("Upcoming::useffect::getUpcoming::response:: ");
    //         //console.log("######################" + JSON.stringify(response));
    //         if (!isCancelled1)
    //             setIsLoading(false);
    //     }).catch((error) => {
    //         console.log(error);
    //         if (!isCancelled1)
    //             setIsLoading(false);
    //     });
    //     return () => {
    //         isCancelled1 = true;
    //     };
    // }, []);
    // useEffect(() => {
    //     getUpcoming().then((response) => {
    //         console.log("Upcoming::useffect::getUpcoming::response:: ");
    //         console.log("######################" + JSON.stringify(response));
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }, [hcstate.reloadAppointments]);


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
            <Loader loading={isLoading} />
            {/* <Text style={{ left: 30, fontSize: 35 }}>{JSON.stringify(hcstate.upcoming)}</Text> */}
            {
                hcstate.upcoming.length === 0 || hcstate.upcoming === undefined ?
                    // <Image style={styles.noappoitments} source={require('../../../assets/noappoitments.png')} />
                    <FontBold value={t('noupcomingappoitment')} mystyle={{ marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }} />
                    :
                    hcstate.upcoming.sort((a, b) => a.duoDate > b.duoDate ? 1 : -1).map((booking, i) => {
                        return (
                            <TouchableOpacity
                                key={booking.id}
                                activeOpacity={0.5}
                                onPress={async () => {
                                    hcdispatch({ type: 'set_selected_upcoming_provider_data', payload: booking.providerData });
                                    setIsLoading(true);
                                    await getSelectedUpcoming({
                                        id: booking.id,
                                        providerData: booking.providerData
                                    }).then((response) => {
                                        console.log("####SelectedUpcoming####" + JSON.stringify(response));
                                    });
                                    setIsLoading(false);
                                    navigate('HCUpcomingDetails')
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
                                                    <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 40, borderColor: "#7a7a7a", backgroundColor: "lightgreen" }}>
                                                        <FontBold mystyle={{ marginLeft: 25, color: "#7a7a7a" }} value={t('completed')} />
                                                    </View>
                                                    : booking.status == 'Confirmed' ?
                                                        // <Badge
                                                        //     status="warning"
                                                        //     value={t('confirmed')}
                                                        //     badgeStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}
                                                        //     containerStyle={{ position: 'absolute', top: 60, right: 0, paddingHorizontal: 15 }}
                                                        // /> 
                                                        <View style={{ borderWidth: 1, borderRadius: 14, marginTop: 40, borderColor: "#7a7a7a", backgroundColor: "#f5c500" }}>
                                                            <FontBold mystyle={{ marginLeft: 25, color: "#7a7a7a" }} value={t('confirmed')} />
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