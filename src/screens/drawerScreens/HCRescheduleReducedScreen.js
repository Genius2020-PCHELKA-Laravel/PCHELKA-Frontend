import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, TextInput, StyleSheet, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { Container, Footer, FooterTab, Button } from 'native-base';
import Toast from 'react-native-simple-toast';
import { Card, ListItem, CheckBox, Icon, Badge, withBadge } from 'react-native-elements'
import { RadioButton, Avatar } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as HCContext } from '../../screens/context/HCContext';
import { Slider, Input } from "react-native-elements";
import { withNamespaces } from 'react-i18next';
import Loader from '../../components/Loader';
import { navigate } from '../../navigationRef';
const HCRescheduleScreen = ({ children, t }) => {
    const { dispatch, state: hcstate, getSchedules } = useContext(HCContext);
    //const [day, setDay] = useState(hcstate.selectedday);
    const [selectedDay, setSelectedDay] = useState(hcstate.selectedupcoming.duoDate);
    const [start, setStart] = useState(hcstate.selectedupcoming.duoTime);
    const [providerid, setProviderid] = useState(hcstate.providerid);
    const [autoassign, setAutoassign] = useState(hcstate.autoassign);
    const [isloading, setIsLoading] = useState(false);
    console.log(hcstate.providers)

    let days_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const isInArray = (array, value) => {
        return (array.find(item => { return item == value }) || []).length > 0;
    }

    useEffect(() => {
        dispatch({
            type: 'set_providerid',
            payload: providerid,
        });
    }, [providerid]);
    useEffect(() => {
        dispatch({
            type: 'set_autoassign',
            payload: autoassign,
        });
    }, [autoassign]);
    useEffect(() => {
        console.log('Day::hcstate.selectedday' + hcstate.selectedday);
        console.log('Day::hcstate.start' + hcstate.start);
        console.log('Day::selectedDay' + selectedDay);
        console.log('Day::start' + start);
    }, [selectedDay]);
    useEffect(() => {
        console.log('start::hcstate.selectedday' + hcstate.selectedday);
        console.log('start::hcstate.start' + hcstate.start);
        console.log('start::selectedDay' + selectedDay);
        console.log('start::start' + start);
    }, [start]);
    useEffect(() => {
        getSchedules().then((response) => {
            console.log("HomeCleaniningScreen::schedules");
            //console.log(response);
            //console.log(response.filter((e) => e.serviceProviderId == 1 && e.availableDate == "2020-05-31"))
        }).catch((error) => {
            console.log("Error::HomeCleaniningScreen::schedules");
            console.log(error);
        });
    }, []);
    useEffect(() => {
        getSchedules().then((response) => {
            console.log("HomeCleaniningScreen::schedules");
            setIsLoading(false);
            console.log(response);
            //console.log(response.filter((e) => e.serviceProviderId == 1 && e.availableDate == "2020-05-31"))
        }).catch((error) => {
            console.log("Error::HomeCleaniningScreen::schedules");
            console.log(error);
            setIsLoading(false);
        });
    }, [providerid]);
    // const isInArray = (providerid,schedules , value) => {
    //     _.filter(schedules, { serviceProviderId:providerid, availableDate:value })
    //     return (array.find(item => { return item == value }) || []).length > 0;
    // }    
    // const providers = [
    //     {
    //         providerid: 1,
    //         name: 'Mailyn',
    //         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //         evaluation: '4.6',
    //         desc: '13 Apr',
    //         count: 2
    //     },
    //     {
    //         providerid: 2,
    //         name: 'Majd',
    //         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //         evaluation: '3.6',
    //         desc: '13 Apr',
    //         count: 0
    //     }, {
    //         providerid: 3,
    //         name: 'Haya',
    //         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //         evaluation: '2.0',
    //         desc: '13 Apr',
    //         count: 3
    //     }, {
    //         providerid: 4,
    //         name: 'Mailyn',
    //         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //         evaluation: '4.6',
    //         desc: '13 Apr',
    //         count: 0
    //     }, {
    //         providerid: 5,
    //         name: 'Samer',
    //         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //         evaluation: '4.6',
    //         desc: '13 Apr',
    //         count: 1
    //     },
    // ];
    /////////////////////
    //dayes
    ///////////////////
    var days = [];
    const date = new Date();
    for (let i = 1; i < 15; i++) {
        const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
        // (d.getDate() < 10 ? '0' : '') + d.getDate
        let fdate = newDate.getFullYear().toString() +
            '-' + ((newDate.getMonth() + 1 < 10 ? '0' : '') + (newDate.getMonth() + 1)).toString() +
            '-' + ((newDate.getDate() < 10 ? '0' : '') + (newDate.getDate())).toString();
        var controlstyles = false;

        if (hcstate.providerid != '') {
            const availabledates = [];
            hcstate.schedules.filter((e) => e.serviceProviderId == hcstate.providerid).map((u, i) => {
                availabledates[i] = u.availableDate;
            });
            const uniqueNDates = Array.from(new Set(availabledates));
            var controlstyles = isInArray(uniqueNDates, fdate) ? false : true;
        }
        days.push(
            <TouchableOpacity key={fdate} onPress={() => {
                setSelectedDay(fdate);
                setStart('');
                dispatch({
                    type: 'set_selectedday',
                    payload: fdate,
                });
                dispatch({
                    type: 'set_start',
                    payload: '',
                });
            }}
                disabled={controlstyles}>
                <View style={styles.cloumn}>
                    <View style={styles.item1}>
                        <FontRegular mystyle={{}} value={days_names[(newDate.getDay()) % 7]} />
                    </View>
                    <View style={styles.item2}>
                        <Text style={controlstyles ? styles.notactive : selectedDay == fdate ? styles.thumbdown : styles.thumbup}>{newDate.getDate()}</Text>
                        <View style={controlstyles ? styles.diagonaline : null}></View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    /////////////////////
    //starts
    ///////////////////
    var starts = [];
    //const date = new Date();
    for (let i = 0; i < 21; i++) {
        const newDateStart = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
        let fdate = newDateStart.getFullYear().toString() +
            '-' + ((newDateStart.getMonth() + 1 < 10 ? '0' : '') + (newDateStart.getMonth() + 1)).toString() +
            '-' + ((newDateStart.getDate() < 10 ? '0' : '') + (newDateStart.getDate())).toString();
        let fhour = i == 0 || i == 1 ? "08" : i == 2 || i == 3 ? "09" : i == 4 || i == 5 ? "10" :
            i == 6 || i == 7 ? "11" : i == 8 || i == 9 ? "12" : i == 10 || i == 11 ? "13" :
                i == 12 || i == 13 ? "14" : i == 14 || i == 15 ? "15" : i == 16 || i == 17 ? "16" :
                    i == 18 || i == 19 ? "17" : i == 20 || i == 21 ? "18" : "";
        let fminute = i % 2 == 0 ? "00" : "30";
        let fstart = fhour + ":" + fminute + ":00";
        var timecontrolstyles = false;

        const timeStarts = [];
        if (hcstate.providerid != '') {
            hcstate.schedules.filter((e) => { return (e.serviceProviderId == hcstate.providerid && e.availableDate == hcstate.selectedday) }).map((u, i) => {
                timeStarts[i] = u.timeStart;
            });
            console.log(timeStarts);
            //const uniqueNStarts = Array.from(new Set(timeStarts));

            var timecontrolstyles = isInArray(timeStarts, fstart) ? false : true;
            // for (var j = 0; j < parseInt(hcstate.hours); j++) {
            //     timecontrolstyles = isInArray(timeStarts, fstart) ? false : true;
            // }
        }
        starts.push(
            <TouchableOpacity key={fstart} onPress={() => {
                if (providerid != '') {
                    var selectedhour = fstart.split(':')[0];
                    var selectedminute = fstart.split(':')[1];
                    var limithour = parseInt(selectedhour) + parseInt(hcstate.hours);
                    for (var j = parseInt(selectedhour); j <= limithour; j++) {
                        var limit = '';
                        if (j < 10)
                            limit = '0' + j + ':' + selectedminute + ':' + '00';
                        else
                            limit = j + ':' + selectedminute + ':' + '00';
                        console.log(j + " limit: " + limit);
                        if (isInArray(timeStarts, limit) ? false : true) {
                            Toast.show('You selected ' + hcstate.hours + ' hours' + '\n select Another time please', Toast.LONG);
                            return;
                        }
                    }
                }


                dispatch({ type: 'set_start', payload: fstart });
                setStart(fstart);
            }}
                disabled={timecontrolstyles}>
                <View>
                    <Text style={timecontrolstyles ? styles.timenotactive : start == fstart ? styles.timethumbdown : styles.timethumbup}>{fstart}</Text>
                    <View style={timecontrolstyles ? styles.timediagonaline : null}></View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} showsVerticalScrollIndicator={false}>
                <Loader loading={isloading} />

                <FontBold mystyle={styles.qText} value={t('dateq1')} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: 15, marginRight: 15 }}>
                    {days}
                </ScrollView>

                <Spacer />
                <FontBold mystyle={styles.qText} value={t('dateq2')} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: 15, marginRight: 15 }}>
                    {starts}
                </ScrollView>
                <View style={styles.ourpolicycontainer}>
                    <AntDesign style={{ marginBottom: 5 }} name="warning" size={30} color="#d21404" />
                    <FontLight mystyle={{ fontSize: 16 }} value={t('ourpolicydoc')} />
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.policybuttonStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                navigate('ReschedulePolicy');
                            }}>
                            <FontLight mystyle={{ color: "blue" }} value={t('viewourpolicy')} />
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView >
            <TouchableOpacity
                style={styles.cancelbuttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                    navigate('HCReschedule');
                }}>
                <FontBold mystyle={styles.buttonTextStyle} value={t('cancel')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.reschedulebuttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                    navigate('HCReschedule');
                }}>
                <FontBold mystyle={styles.buttonTextStyle} value={t('reschedule')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cloumn: {
        marginTop: 0,
        flex: 1,
        alignItems: 'center' // if you want to fill rows left to right
    },
    item1: {
        height: '30%' // is 50% of container width
    },
    item2: {
        height: '70%' // is 50% of container width
    },
    qText: {
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 7
    },
    aText: {
        fontSize: 12,
        textAlign: 'center',
    },
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
    },
    thumbup: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    thumbdown: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#f5c500aa',
        borderColor: 'white',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    notactive: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#dcdcdc',
        borderColor: '#aaa',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    timethumbup: {
        fontSize: 20,
        padding: 7,
        width: 65,
        height: 40,
        borderRadius: 65 / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    timethumbdown: {
        fontSize: 20,
        padding: 7,
        width: 65,
        height: 40,
        borderRadius: 65 / 2,
        backgroundColor: '#f5c500aa',
        borderColor: 'white',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    timenotactive: {
        // display: 'none',
        fontSize: 20,
        padding: 7,
        width: 65,
        height: 40,
        borderRadius: 65 / 2,
        backgroundColor: '#dcdcdc',
        borderColor: '#aaa',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    providerThumup: {
        backgroundColor: '#fff',
        width: 120,
        height: 170,
        borderColor: "#f5c500aa",
        borderRadius: 4,
        borderWidth: 2,
        marginRight: 10,
    },
    providerThumdown: {
        backgroundColor: '#f5c500aa',
        width: 120,
        height: 170,
        borderColor: "#fff",
        borderRadius: 2,
        borderWidth: 4,
        marginRight: 10,
    },
    imageThumup: {
        width: 80,
        height: 80,
        borderRadius: 45,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 3,
        borderColor: "#f5c500",
        opacity: 1,

    },
    imageThumdown: {
        width: 80,
        height: 80,
        borderRadius: 45,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 3,
        borderColor: "#fff",
        opacity: 1,

    },

    diagonaline: {
        position: 'absolute',
        transform: [{ rotate: '-45deg' }],
        right: 2,
        top: 22,
        width: 60,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 2,
    },
    timediagonaline: {
        position: 'absolute',
        transform: [{ rotate: '-45deg' }],
        right: 2,
        top: 22,
        width: 80,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 2,
    },
    ourpolicycontainer: {
        margin: 18,
        borderWidth: 1,
        borderColor: "#7a7a7a",
        padding: 15,
    },
    cancelbuttonStyle: {
        position: 'absolute',
        bottom: 15,
        right: 10,
        backgroundColor: '#d21404',
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        width: "40%"
    },
    reschedulebuttonStyle: {
        position: 'absolute',
        bottom: 15,
        left: 10,
        backgroundColor: '#404d21',
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        width: "40%"
    },
    buttonTextStyle: {
        color: '#fff',
        paddingVertical: 10,
        fontSize: 22,
    },
    mynextButtonStyle: {
        display: 'none',
        top: 0,
        right: -50,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        // fontFamily: 'Comfortaa-Bold',
        width: '100%'
    },
    nextButtonStyle: {
        display: 'none',
        top: 0,
        right: -50,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        // fontFamily: 'Comfortaa-Bold',
        width: '100%'
    },
    previousButtonStyle: {
        display: 'none',
        top: 0,
        left: -50,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7a7a7a',
        // fontFamily: 'Comfortaa-Bold',
        width: '100%'

    },
    // notactive: {
    //     transform: [{ rotate: '-45deg' }],
    //     borderBottomColor: 'gray',
    //     borderBottomWidth: 1,
    // }
});

export default withNamespaces()(HCRescheduleScreen);