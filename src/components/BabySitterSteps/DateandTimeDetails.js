import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, TextInput, StyleSheet, View, Switch, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
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
import Loader from '../Loader';
import { getLang } from '../../api/userLanguage';
import { Normalize, fontNormalize } from '../actuatedNormalize';

const DateandTimeDetails = ({ children, t }) => {
    const { dispatch, state: hcstate, getSchedules } = useContext(HCContext);
    //const [day, setDay] = useState(hcstate.selectedday);
    const [selectedDay, setSelectedDay] = useState(hcstate.selectedday);
    const [start, setStart] = useState(hcstate.start);
    const [providerid, setProviderid] = useState(hcstate.providerid);
    const [autoassign, setAutoassign] = useState(hcstate.autoassign);
    // const [isloading, setIsLoading] = useState(false);
    const [isloadingActivityIndicator, setIsLoadingActivityIndicator] = useState(false);
    const [days_names, set_days_names] = useState('');

    // const fetchLang
    useEffect(() => {
        let en_days_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let ru_days_names = ['Bc', 'пн', 'вт', 'Cp', 'Чт', 'пт', 'сб'];
        getLang().then((response) => {
            if (response === 'ru')
                set_days_names(ru_days_names)
            else if (response === 'en' || typeof response === 'undefined')
                set_days_names(en_days_names)
        });
    }, []);

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
        getSchedules({ id: providerid }).then((response) => {
            console.log("HomeCleaniningScreen::schedules");
            //console.log(response);
            //console.log(response.filter((e) => e.serviceProviderId == 1 && e.availableDate == "2020-05-31"))
        }).catch((error) => {
            console.log("Error::HomeCleaniningScreen::schedules");
            console.log(error);
        });
    }, []);
    useEffect(() => {
        if (providerid == "")
            return;
        getSchedules({ id: providerid }).then((response) => {
            console.log("HomeCleaniningScreen::schedules");
            setIsLoadingActivityIndicator(false);
            console.log(response);
            //console.log(response.filter((e) => e.serviceProviderId == 1 && e.availableDate == "2020-05-31"))
        }).catch((error) => {
            console.log("Error::HomeCleaniningScreen::schedules");
            console.log(error);
            setIsLoadingActivityIndicator(false);
        });
    }, [providerid]);
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
                        <FontBold mystyle={controlstyles ? styles.notactive : selectedDay == fdate ? styles.thumbdown : styles.thumbup} value={newDate.getDate()} />
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
                            Toast.show(t('youselected') + ' ' + hcstate.hours + ' ' + t('hours') + '\n' + t('selectanothertimeplease'), Toast.LONG);
                            return;
                        }
                    }
                }


                dispatch({ type: 'set_start', payload: fstart });
                setStart(fstart);
            }}
                disabled={timecontrolstyles}>
                <View>
                    <FontBold mystyle={timecontrolstyles ? styles.timenotactive : start == fstart ? styles.timethumbdown : styles.timethumbup} value={fstart.substring(0, 5)} />
                    <View style={timecontrolstyles ? styles.timediagonaline : null}></View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {/* <Loader loading={isloading} /> */}
            <FontBold mystyle={styles.qText} value={t('babydateq0')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: Normalize(15), marginRight: Normalize(15) }}>
                {/* redering Auto-Assign */}
                <TouchableOpacity style={providerid == '' ? styles.providerThumdown : styles.providerThumup}
                    onPress={() => {
                        setSelectedDay('');
                        setStart('');
                        dispatch({
                            type: 'set_selectedday',
                            payload: '',
                        });
                        dispatch({
                            type: 'set_start',
                            payload: '',
                        });
                        console.log('AutoAssign::hcstate.selectedday' + hcstate.selectedday);
                        console.log('AutoAssign::hcstate.start' + hcstate.start);
                        console.log('AutoAssign::selectedDay' + selectedDay);
                        console.log('AutoAssign::start' + start);
                        setAutoassign(1);
                        setProviderid('');
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <Image style={providerid != "" ? styles.imageThumdown : styles.imageThumup} source={require('../../../assets/Splash/FinalSplash.png')} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <FontBold mystyle={{ fontSize: fontNormalize(10) }} value={t('autoassign')} />

                    </View>
                    <FontRegular mystyle={{ color: "#000", fontSize: fontNormalize(12), marginLeft: Normalize(5) }} value={t('babywewillassignthebestcleaner')} />
                </TouchableOpacity>

                {/* redering the providers */}

                {
                    hcstate.providers.map((u, i) => {
                        return (
                            <TouchableOpacity key={u.id} style={providerid == u.id ? styles.providerThumdown : styles.providerThumup}
                                onPress={() => {
                                    setIsLoadingActivityIndicator(true);
                                    setSelectedDay('');
                                    setStart('');
                                    dispatch({
                                        type: 'set_selectedday',
                                        payload: '',
                                    });
                                    dispatch({
                                        type: 'set_start',
                                        payload: '',
                                    });
                                    console.log('Provider::hcstate.selectedday' + hcstate.selectedday);
                                    console.log('Provider::hcstate.start' + hcstate.start);
                                    console.log('Provider::selectedDay' + selectedDay);
                                    console.log('Provider::start' + start);
                                    setAutoassign(0);
                                    setProviderid(u.id);
                                }}>
                                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                    {
                                        <Image
                                            source={{ uri: "http://pchelka.org/storage/app/public/" + u.imageUrl.split('/')[2] }}
                                            style={providerid == i ? styles.imageThumdown : styles.imageThumup}
                                        />
                                    }
                                    {
                                        <Badge
                                            status="success"
                                            badgeStyle={{ width: Normalize(18), height: Normalize(18), borderRadius: 10, borderColor: '#fff', borderWidth: 2 }}
                                            containerStyle={{ position: 'absolute', top: Normalize(58), right: Normalize(21), }}
                                        />
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                    <FontBold mystyle={{ fontSize: fontNormalize(10), marginLeft: Normalize(5) }} value={u.name} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                    {
                                        u.evaluation == 0 ?
                                            <FontAwesome name="star-o" size={Normalize(18)} color="#ff9800" style={{}} />
                                            :
                                            u.evaluation == 1 ?
                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                :
                                                u.evaluation == 2 ?
                                                    <>
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                    </>
                                                    :
                                                    u.evaluation == 3 ?
                                                        <>
                                                            <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                            <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                            <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                        </>
                                                        :
                                                        u.evaluation == 4 ?
                                                            <>
                                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                            </>
                                                            :
                                                            u.evaluation == 5 ?
                                                                <>
                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                </>
                                                                :
                                                                u.evaluation > 1 && u.evaluation < 2 ?
                                                                    <>
                                                                        <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                        <FontAwesome name="star-half-empty" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                    </>
                                                                    :
                                                                    u.evaluation > 2 && u.evaluation < 3 ?
                                                                        <>
                                                                            <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                            <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                            <FontAwesome name="star-half-empty" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                        </>
                                                                        :
                                                                        u.evaluation > 3 && u.evaluation < 4 ?
                                                                            <>
                                                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                <FontAwesome name="star-half-empty" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                            </>
                                                                            :
                                                                            u.evaluation > 4 && u.evaluation < 5 ?
                                                                                <>
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star-half-empty" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                    <FontAwesome name="star" size={Normalize(18)} color="#ff9800" style={{}} />
                                                                                </>
                                    }
                                    <Text>{' '}</Text>
                                    {
                                        u.evaluation == 0 ?
                                            <FontLight mystyle={{ fontSize: fontNormalize(11), padding: 0 }} value={t('notevaluated')} />
                                            :
                                            <FontLight mystyle={{ fontSize: fontNormalize(11), padding: 0 }} value={u.evaluation} />
                                    }
                                </View>
                                {
                                    u.lastServiceDate != null ?
                                        <View>
                                            <View style={{ flexDirection: "row", justifyContent: "flex-start", marginLeft: Normalize(5), marginRight: Normalize(5) }}>
                                                <FontLight mystyle={{ color: "#000", fontSize: fontNormalize(12) }} value={t('lastservedat')} />
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "center", marginLeft: Normalize(5), marginRight: Normalize(5) }}>
                                                <FontLight mystyle={{ color: "#000", fontSize: fontNormalize(12) }} value={u.lastServiceDate} />
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            {/* <View style={{ flexDirection: "row", justifyContent: "flex-start", marginLeft: 5, marginRight: 5 }}>
                                                <FontLight mystyle={{ color: "#000", fontSize: 12 }} value={t('lastservedat')} />
                                            </View> */}
                                            <View style={{ flexDirection: "row", justifyContent: "center", marginLeft: Normalize(5), marginRight: Normalize(5) }}>
                                                <FontLight mystyle={{ color: "#000", fontSize: fontNormalize(12), textAlign: "center" }} value={t('notcompleted')} />
                                            </View>
                                        </View>
                                }
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
            <Spacer />
            <FontBold mystyle={styles.qText} value={t('babydateq1')} />
            {
                isloadingActivityIndicator ?
                    <ActivityIndicator style={{ flexDirection: "row", justifyContent: "center" }} size={Normalize(35)} color='#ff9800' animating={isloadingActivityIndicator} />
                    :
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: Normalize(15), marginRight: Normalize(15) }}>
                        {
                            days
                        }
                    </ScrollView>

            }

            <Spacer />
            <FontBold mystyle={styles.qText} value={t('dateq2')} />
            {

                isloadingActivityIndicator ?
                    <ActivityIndicator style={{ flexDirection: "row", justifyContent: "center" }} size={Normalize(35)} color='#ff9800' animating={isloadingActivityIndicator} />
                    :
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', left: Normalize(15), marginRight: Normalize(15), marginRight: Normalize(15) }}>
                        {
                            starts
                        }
                    </ScrollView>

            }
            <Spacer />
            <Spacer />
            <Spacer />
        </ScrollView >
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
        fontSize: fontNormalize(18),
        marginLeft: Normalize(15),
        marginRight: Normalize(15),
        marginBottom: Normalize(7)
    },
    aText: {
        fontSize: fontNormalize(12),
        textAlign: 'center',
    },
    thumbup: {
        fontSize: fontNormalize(20),
        width: Normalize(48),
        height: Normalize(48),
        borderRadius: Normalize(48) / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: Normalize(5)
    },
    thumbdown: {
        fontSize: fontNormalize(20),
        width: Normalize(48),
        height: Normalize(48),
        borderRadius: Normalize(48) / 2,
        backgroundColor: '#f5c500',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: Normalize(5)
    },
    notactive: {
        fontSize: fontNormalize(20),
        width: Normalize(48),
        height: Normalize(48),
        borderRadius: Normalize(48) / 2,
        backgroundColor: '#dcdcdc',
        borderColor: '#aaa',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: Normalize(5),
        color: "#7a7a7a"
    },
    timethumbup: {
        fontSize: fontNormalize(16),
        width: Normalize(65),
        height: Normalize(40),
        borderRadius: Normalize(65) / 2,
        backgroundColor: 'white',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: Normalize(5)
    },
    timethumbdown: {
        fontSize: fontNormalize(16),
        width: Normalize(65),
        height: Normalize(40),
        borderRadius: Normalize(65) / 2,
        backgroundColor: '#f5c500',
        borderColor: '#f5c500',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: Normalize(5)
    },
    timenotactive: {
        display: 'none',
        fontSize: fontNormalize(16),
        width: Normalize(65),
        height: Normalize(40),
        borderRadius: Normalize(65) / 2,
        backgroundColor: '#dcdcdc',
        borderColor: '#aaa',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: Normalize(5),
        color: "#7a7a7a"

    },
    providerThumup: {
        backgroundColor: '#fff',
        width: Normalize(120),
        height: Normalize(170),
        borderRadius: 2,
        borderWidth: 0,
        marginRight: Normalize(5),
        marginLeft: Normalize(5),
        marginTop: Normalize(5),
        marginBottom: Normalize(5),
        shadowColor: '#7a7a7a',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: Normalize(10),
            width: Normalize(10)
        },
        elevation: 3,
        shadowRadius: Normalize(10),
    },
    providerThumdown: {
        backgroundColor: '#f5c500',
        width: Normalize(120),
        height: Normalize(170),
        borderRadius: 2,
        borderWidth: 0,
        marginRight: Normalize(5),
        marginLeft: Normalize(5),
        marginTop: Normalize(5),
        marginBottom: Normalize(5),
        shadowColor: '#7a7a7a',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: Normalize(10),
            width: Normalize(10)
        },
        elevation: 4,
        shadowRadius: Normalize(10),
    },
    imageThumup: {
        width: Normalize(80),
        height: Normalize(80),
        borderRadius: Normalize(45),
        marginTop: Normalize(2),
        marginLeft: Normalize(10),
        marginRight: Normalize(10),
        borderWidth: 2,
        borderColor: "#fff",
    },
    imageThumdown: {
        width: Normalize(80),
        height: Normalize(80),
        borderRadius: Normalize(45),
        marginTop: Normalize(2),
        marginLeft: Normalize(10),
        marginRight: Normalize(10),
        borderWidth: 2,
        borderColor: "#fff",
    },

    diagonaline: {
        position: 'absolute',
        transform: [{ rotate: '-45deg' }],
        right: Normalize(2),
        top: Normalize(22),
        width: Normalize(60),
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 2,
    },
    timediagonaline: {
        position: 'absolute',
        transform: [{ rotate: '-45deg' }],
        right: Normalize(2),
        top: Normalize(22),
        width: Normalize(80),
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 2,
    },
    // notactive: {
    //     transform: [{ rotate: '-45deg' }],
    //     borderBottomColor: 'gray',
    //     borderBottomWidth: 1,
    // }
});

export default withNamespaces()(DateandTimeDetails);