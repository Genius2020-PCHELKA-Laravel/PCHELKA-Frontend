
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
const DateandTimeDetails = ({ children, t }) => {
    const { dispatch, state } = useContext(HCContext);
    const [day, setDay] = useState(state.selectedday);
    const [selectedDay, setSelectedDay] = useState(state.selectedday);
    const [selectedDate, setSelectedDate] = useState(state.selecteddate);
    const [start, setStart] = useState(state.start);
    const [selectedprovider, setSelectedProvider] = useState(state.selectedprovider);
    useEffect(() => {

    }, []);
    let days_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var days = [];
    const providers = [
        {
            name: 'Auto-assign',
            avatar: '../../../assets/Splash/SplashScreen1.png',
            evaluation: '5',
            desc: 'We will assign the besst cleaner',
            count: -1
        },
        {
            name: 'Mailyn',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            evaluation: '4.6',
            desc: '13 Apr',
            count: 2
        },
        {
            name: 'Majd',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            evaluation: '3.6',
            desc: '13 Apr',
            count: 0
        }, {
            name: 'Haya',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            evaluation: '2.0',
            desc: '13 Apr',
            count: 3
        }, {
            name: 'Mailyn',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            evaluation: '4.6',
            desc: '13 Apr',
            count: 0
        }, {
            name: 'Samer',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            evaluation: '4.6',
            desc: '13 Apr',
            count: 1
        },
    ];
    // var months = [];
    // var years = [];
    // var now = new Date();
    // console.log(now.getDay() + 1);
    // console.log(now.getDate());
    // console.log(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
    const date = new Date();
    for (let i = 0; i < 15; i++) {
        const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
        days.push(
            <TouchableOpacity key={i} onPress={() => setSelectedDay(i)}>
                <View style={styles.cloumn}>
                    <View style={styles.item1}>
                        <FontRegular mystyle={{ textAlign: 'center', padding: 2 }} value={days_names[(newDate.getDay() + i) % 7]} />
                    </View>
                    <View style={styles.item2}>
                        <Text style={selectedDay == i ? styles.thumbdown : styles.thumbup}>{newDate.getDate()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        dispatch({
            type: 'set_selectedday',
            payload: selectedDay,
        });

        const newDate = new Date(date.getTime() + selectedDay * 1000 * 60 * 60 * 24);

        let full_date = newDate.getFullYear().toString() + '-' + (newDate.getMonth() + 1).toString() + '-' + newDate.getDate();
        dispatch({
            type: 'set_fulldate',
            payload: { full_date },
        });
        console.log(selectedDay);
    }, [selectedDay]);
    useEffect(() => {
        dispatch({
            type: 'set_start',
            payload: start,
        });
    }, [start]);
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <FontBold mystyle={styles.qText} value={t('dateq0')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', }}>
                {
                    providers.map((u, i) => {
                        return (
                            <TouchableOpacity key={i} style={selectedprovider == i ? styles.providerThumdown : styles.providerThumup} onPress={() => setSelectedProvider(i)}>
                                <View>
                                    {
                                        u.name == 'Auto-assign' ?
                                            <Image style={styles.imageThumdown} source={require('../../../assets/Splash/SplashScreen1.png')} />
                                            :
                                            <Image
                                                source={{ uri: u.avatar }}
                                                // style={styles.imagestyle}
                                                style={selectedprovider == i ? styles.imageThumdown : styles.imageThumup}
                                            />
                                    }

                                    {
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
                                    }
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <FontRegular mustyle={{ fontSize: 12, padding: 0, textAlign: 'center' }} value={u.name} />
                                    <Text>{' '}</Text>
                                    {
                                        u.name != 'Auto-assign' ?
                                            u.evaluation >= 4 ?
                                                <FontAwesome name="star" size={18} color="#ff9800" style={{ top: 3 }} />
                                                :
                                                <FontAwesome name="star-half-empty" size={18} color="#ff9800" style={{ top: 3 }} />
                                            : null
                                    }
                                    <Text>{' '}</Text>
                                    {
                                        u.name != 'Auto-assign' ?
                                            <FontRegular mustyle={{ fontSize: 11, padding: 0 }} value={u.evaluation} />
                                            : null
                                    }
                                </View>
                                <FontRegular mystyle={{ color: "#000", fontSize: 12 }} value={u.desc} />
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

            <Spacer>
                <FontBold mystyle={styles.qText} value={t('dateq2')} />
            </Spacer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setStart('08:00:00')}><Text style={start == '08:00:00' ? styles.timethumbdown : styles.timethumbup}>08:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('08:30:00')}><Text style={start == '08:30:00' ? styles.timethumbdown : styles.timethumbup}>08:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('09:00:00')}><Text style={start == '09:00:00' ? styles.timethumbdown : styles.timethumbup}>09:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('09:30:00')}><Text style={start == '09:30:00' ? styles.timethumbdown : styles.timethumbup}>09:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('10:00:00')}><Text style={start == '10:00:00' ? styles.timethumbdown : styles.timethumbup}>10:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('10:30:00')}><Text style={start == '10:30:00' ? styles.timethumbdown : styles.timethumbup}>10:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('11:00:00')}><Text style={start == '11:00:00' ? styles.timethumbdown : styles.timethumbup}>11:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('11:30:00')}><Text style={start == '11:30:00' ? styles.timethumbdown : styles.timethumbup}>11:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('12:00:00')}><Text style={start == '12:00:00' ? styles.timethumbdown : styles.timethumbup}>12:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('12:30:00')}><Text style={start == '12:30:00' ? styles.timethumbdown : styles.timethumbup}>12:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('13:00:00')}><Text style={start == '13:00:00' ? styles.timethumbdown : styles.timethumbup}>13:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('13:30:00')}><Text style={start == '13:30:00' ? styles.timethumbdown : styles.timethumbup}>13:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('14:00:00')}><Text style={start == '14:00:00' ? styles.timethumbdown : styles.timethumbup}>14:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('14:30:00')}><Text style={start == '14:30:00' ? styles.timethumbdown : styles.timethumbup}>14:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('15:00:00')}><Text style={start == '15:00:00' ? styles.timethumbdown : styles.timethumbup}>15:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('15:30:00')}><Text style={start == '15:30:00' ? styles.timethumbdown : styles.timethumbup}>15:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('16:00:00')}><Text style={start == '16:00:00' ? styles.timethumbdown : styles.timethumbup}>16:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('16:30:00')}><Text style={start == '16:30:00' ? styles.timethumbdown : styles.timethumbup}>16:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('17:00:00')}><Text style={start == '17:00:00' ? styles.timethumbdown : styles.timethumbup}>17:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('17:30:00')}><Text style={start == '17:30:00' ? styles.timethumbdown : styles.timethumbup}>17:30</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('18:00:00')}><Text style={start == '18:00:00' ? styles.timethumbdown : styles.timethumbup}>18:00</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setStart('18:30:00')}><Text style={start == '18:30:00' ? styles.timethumbdown : styles.timethumbup}>18:30</Text></TouchableOpacity>
            </ScrollView>
            <Spacer />
            <View>

            </View>
        </ScrollView >);
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

    }
});

export default withNamespaces()(DateandTimeDetails);