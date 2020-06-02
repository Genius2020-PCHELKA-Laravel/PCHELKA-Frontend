import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, TextInput, StyleSheet, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { Container, Footer, FooterTab, Button, } from 'native-base';
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
const DateandTimeDetails = ({ children, t }) => {
    const { dispatch, state: hcstate, getSchedules } = useContext(HCContext);
    //const [day, setDay] = useState(hcstate.selectedday);
    const [selectedDay, setSelectedDay] = useState(hcstate.selectedday);
    const [start, setStart] = useState(hcstate.start);
    const [providerid, setProviderid] = useState(hcstate.providerid);
    const [autoassign, setAutoassign] = useState(hcstate.autoassign);
    const [isloading, setIsLoading] = useState(false);

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
    for (let i = 0; i < 15; i++) {
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
                        <FontRegular mystyle={{ textAlign: 'center', padding: 2 }} value={days_names[(newDate.getDay() + i) % 7]} />
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

        if (hcstate.providerid != '') {
            const timeStarts = [];
            hcstate.schedules.filter((e) => { return (e.serviceProviderId == hcstate.providerid && e.availableDate == hcstate.selectedday) }).map((u, i) => {
                timeStarts[i] = u.timeStart;
            });
            console.log(timeStarts);
            //const uniqueNStarts = Array.from(new Set(timeStarts));
            var timecontrolstyles = isInArray(timeStarts, fstart) ? false : true;
        }
        starts.push(
            <TouchableOpacity key={fstart} onPress={() => {
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
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Loader loading={isloading} />
            <FontBold mystyle={styles.qText} value={t('dateq0')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', }}>
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
                    <View>
                        <Image style={styles.imageThumdown} source={require('../../../assets/Splash/SplashScreen1.png')} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <FontRegular mustyle={{ fontSize: 12, padding: 0, textAlign: 'center' }} value='Auto-Assign' />

                    </View>
                    <FontRegular mystyle={{ color: "#000", fontSize: 12 }} value='We will assign the best cleaner' />
                </TouchableOpacity>

                {/* redering the providers */}

                {
                    hcstate.providers.map((u, i) => {
                        return (
                            <TouchableOpacity key={u.id} style={providerid == u.id ? styles.providerThumdown : styles.providerThumup}
                                onPress={() => {
                                    setIsLoading(true);
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
                                <View>
                                    {
                                        <Image
                                            source={{ uri: u.imageUrl }}
                                            style={providerid == i ? styles.imageThumdown : styles.imageThumup}
                                        />
                                    }
                                    {/* {
                                        u.count < 0 ?
                                            null :
                                            u.count > 0 ?
                                                <Badge
                                                    status="success"
                                                    badgeStyle={{ width: 15, height: 15, borderRadius: 10, borderColor: '#fff', borderWidth: 1 }}
                                                    containerStyle={{ position: 'absolute', top: 5, right: 22, }}
                                                />
                                                : u.count == 0 ?
                                                    <Badge
                                                        status="error"
                                                        badgeStyle={{ width: 15, height: 15, borderRadius: 10, borderColor: '#fff', borderWidth: 1 }}
                                                        containerStyle={{ position: 'absolute', top: 5, right: 22 }}
                                                    />
                                                    : null
                                    } */}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontRegular mustyle={{ fontSize: 12, padding: 0, textAlign: 'center' }} value={u.name} />
                                    <Text>{' '}</Text>
                                    {/* {
                                        u.evaluation >= 4 ?
                                            <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                            :
                                            <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{ top: 3 }} />
                                    } */}
                                    {/* <Text>{' '}</Text>
                                    {
                                        <FontRegular mustyle={{ fontSize: 11, padding: 0 }} value={u.evaluation} />
                                    } */}
                                </View>
                                {/* <FontRegular mystyle={{ color: "#000", fontSize: 12 }} value={u.desc} /> */}
                            </TouchableOpacity>

                        );
                    })
                }
            </ScrollView>
            <Spacer />
            <FontBold mystyle={styles.qText} value={t('dateq1')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                {days}
            </ScrollView>

            <Spacer />
            <Spacer />
            <FontBold mystyle={styles.qText} value={t('dateq2')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                {starts}
            </ScrollView>

            <Spacer />

            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    dispatch({ type: 'set_start', payload: '08:00:00' });
                    setStart('08:00:00');
                }}>
                    <Text style={start == '08:00:00' ? styles.timethumbdown : styles.timethumbup}>08:00</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('08:30:00')
                    dispatch({ type: 'set_start', payload: '08:30:00' });
                }}><Text style={start == '08:30:00' ? styles.timethumbdown : styles.timethumbup}>08:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('09:00:00')
                    dispatch({ type: 'set_start', payload: '04:00:00' });
                }}><Text style={start == '09:00:00' ? styles.timethumbdown : styles.timethumbup}>09:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('09:30:00')
                    dispatch({ type: 'set_start', payload: '04:30:00' });
                }}><Text style={start == '09:30:00' ? styles.timethumbdown : styles.timethumbup}>09:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('10:00:00')
                    dispatch({ type: 'set_start', payload: '10:00:00' });
                }}><Text style={start == '10:00:00' ? styles.timethumbdown : styles.timethumbup}>10:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('10:30:00')
                    dispatch({ type: 'set_start', payload: '10:30:00' });
                }}><Text style={start == '10:30:00' ? styles.timethumbdown : styles.timethumbup}>10:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('11:00:00')
                    dispatch({ type: 'set_start', payload: '11:00:00' });
                }}><Text style={start == '11:00:00' ? styles.timethumbdown : styles.timethumbup}>11:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('11:30:00')
                    dispatch({ type: 'set_start', payload: '11:30:00' });
                }}><Text style={start == '11:30:00' ? styles.timethumbdown : styles.timethumbup}>11:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('12:00:00')
                    dispatch({ type: 'set_start', payload: '12:00:00' });
                }}><Text style={start == '12:00:00' ? styles.timethumbdown : styles.timethumbup}>12:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('12:30:00')
                    dispatch({ type: 'set_start', payload: '12:30:00' });
                }}><Text style={start == '12:30:00' ? styles.timethumbdown : styles.timethumbup}>12:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('13:00:00')
                    dispatch({ type: 'set_start', payload: '13:00:00' });
                }}><Text style={start == '13:00:00' ? styles.timethumbdown : styles.timethumbup}>13:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('13:30:00')
                    dispatch({ type: 'set_start', payload: '13:30:00' });
                }}><Text style={start == '13:30:00' ? styles.timethumbdown : styles.timethumbup}>13:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('14:00:00')
                    dispatch({ type: 'set_start', payload: '14:00:00' });
                }}><Text style={start == '14:00:00' ? styles.timethumbdown : styles.timethumbup}>14:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('14:30:00')
                    dispatch({ type: 'set_start', payload: '14:30:00' });
                }}><Text style={start == '14:30:00' ? styles.timethumbdown : styles.timethumbup}>14:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('15:00:00')
                    dispatch({ type: 'set_start', payload: '15:00:00' });
                }}><Text style={start == '15:00:00' ? styles.timethumbdown : styles.timethumbup}>15:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('15:30:00')
                    dispatch({ type: 'set_start', payload: '15:30:00' });
                }}><Text style={start == '15:30:00' ? styles.timethumbdown : styles.timethumbup}>15:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('16:00:00')
                    dispatch({ type: 'set_start', payload: '16:00:00' });
                }}><Text style={start == '16:00:00' ? styles.timethumbdown : styles.timethumbup}>16:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('16:30:00')
                    dispatch({ type: 'set_start', payload: '16:30:00' });
                }}><Text style={start == '16:30:00' ? styles.timethumbdown : styles.timethumbup}>16:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('17:00:00')
                    dispatch({ type: 'set_start', payload: '17:00:00' });
                }}><Text style={start == '17:00:00' ? styles.timethumbdown : styles.timethumbup}>17:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('17:30:00')
                    dispatch({ type: 'set_start', payload: '17:30:00' });
                }}><Text style={start == '17:30:00' ? styles.timethumbdown : styles.timethumbup}>17:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('18:00:00')
                    dispatch({ type: 'set_start', payload: '18:00:00' });
                }}><Text style={start == '18:00:00' ? styles.timethumbdown : styles.timethumbup}>18:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setStart('18:30:00')
                    dispatch({ type: 'set_start', payload: '18:30:00' });
                }}><Text style={start == '18:30:00' ? styles.timethumbdown : styles.timethumbup}>18:30</Text></TouchableOpacity>
            </ScrollView> */}
            <Spacer />
            <View>

            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    cloumn: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item1: {
        height: '30%' // is 50% of container width
    },
    item2: {
        height: '70%' // is 50% of container width
    },
    qText: {
        fontSize: 20,
    },
    aText: {
        fontSize: 14,
        textAlign: 'center',
    },
    track: {
        height: 4,
        borderRadius: 2,
        backgroundColor: '#d0d0d0',
    },
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        borderColor: '#ff9800',
        borderWidth: 2,
    },
    thumbup: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'white',
        borderColor: '#ff9800',
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
        backgroundColor: '#ff9800',
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
        fontSize: 24,
        padding: 7,
        width: 75,
        height: 48,
        borderRadius: 75 / 2,
        backgroundColor: 'white',
        borderColor: '#ff9800',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    timethumbdown: {
        fontSize: 24,
        padding: 7,
        width: 75,
        height: 48,
        borderRadius: 75 / 2,
        backgroundColor: '#ff9800',
        borderColor: 'white',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    },
    timenotactive: {
        fontSize: 24,
        padding: 7,
        width: 75,
        height: 48,
        borderRadius: 75 / 2,
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
        padding: 15,
        borderColor: "#ff9800",
        borderWidth: 2,
        padding: 5,
        marginRight: 10,
        marginTop: 10
    },
    providerThumdown: {
        backgroundColor: '#ff9800',
        width: 120,
        height: 170,
        padding: 15,
        borderColor: "#fff",
        borderWidth: 2,
        padding: 5,
        marginRight: 10,
        marginTop: 10
    },
    imageThumup: {
        width: 80,
        height: 80,
        borderRadius: 45,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 3,
        borderColor: "#ff9800",
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
    // notactive: {
    //     transform: [{ rotate: '-45deg' }],
    //     borderBottomColor: 'gray',
    //     borderBottomWidth: 1,
    // }
});

export default withNamespaces()(DateandTimeDetails);