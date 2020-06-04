import React, { Component, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Context as HCContext } from '../context/HCContext';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
import Spacer from '../../components/Spacer';
import { Card, ListItem, CheckBox, Icon, Badge, withBadge } from 'react-native-elements'


const UpcomingScreen = ({ navigation }) => {
    const { state: hcstate, getUpcoming } = useContext(HCContext);



    return (
        <View style={styles.container}>
            {
                hcstate.upcoming.sort((a, b) => a.duoDate > b.duoDate ? 1 : -1).map((booking, i) => {
                    return (
                        <TouchableOpacity key={booking.id} activeOpacity={0.5} onPress={() => { }}>
                            <Spacer >
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <FontBold value={booking.serviceType} />
                                        <FontLight value={booking.duoDate + ' ' + booking.duoTime} />
                                        {/* <Image source={{ uri: booking.providerData.imageUrl }} /> */}
                                        <View style={{ marginTop: 15 }}>
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
                                        <FontLight mystyle={{ top: 10 }} value={'Ref. Code:' + booking.refCode} />
                                        {
                                            booking.status == 'Pending' ?
                                                <Badge
                                                    status="warning"
                                                    value={booking.status}
                                                    badgeStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
                                                    containerStyle={{ position: 'absolute', top: 65, right: 22, paddingHorizontal: 15 }}
                                                /> : booking.status == 'Canceled' ?
                                                    <Badge
                                                        status="error"
                                                        value={booking.status}
                                                        badgeStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
                                                        containerStyle={{ position: 'absolute', top: 65, right: 22, paddingHorizontal: 15 }}
                                                    /> : booking.status == 'Completed' ?
                                                        <Badge
                                                            status="succes"
                                                            value={booking.status}
                                                            badgeStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
                                                            containerStyle={{ position: 'absolute', top: 65, right: 22, paddingHorizontal: 15 }}
                                                        /> : null
                                        }
                                    </View>

                                </View>
                                <Spacer />
                                <View style={{ borderBottomColor: '#ff9800', borderBottomWidth: 1, }} />
                            </Spacer>
                        </TouchableOpacity>
                    );
                })
            }
        </View >
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
});
export default UpcomingScreen;