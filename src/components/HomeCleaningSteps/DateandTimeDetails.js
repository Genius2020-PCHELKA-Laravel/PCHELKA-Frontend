
import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as HCContext } from '../../screens/context/HCContext';
import { Slider, Input } from "react-native-elements";
const DateandTimeDetails = ({ children }) => {
    const { dispatch, state } = useContext(HCContext);
    const [day, setDay] = useState(state.selectedday);
    const [selectedDay, setSelectedDay] = useState(state.selectedday);
    const [selectedDate, setSelectedDate] = useState(state.selecteddate);
    const [start, setStart] = useState(state.start);
    useEffect(() => {

    }, []);
    let days_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var days = [];
    // var months = [];
    // var years = [];
    // var now = new Date();
    // console.log(now.getDay() + 1);
    // console.log(now.getDate());
    // console.log(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
    const date = new Date();
    for (let i = 0; i < 31; i++) {
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

    // const date = new Date();
    // let datesCollection = []
    // for (let j = 0; j < 31; j++) {
    //     const newDate = new Date(date.getTime() + j * 1000 * 60 * 60 * 24);
    //     //datesCollection.push(`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
    //     days.push(
    //         <TouchableOpacity key={j} onPress={() => setSelectedDay(j)}>
    //             <View style={styles.cloumn}>
    //                 <Text style={styles.thumbup}>{newDate.getDate()}</Text>
    //             </View>
    //         </TouchableOpacity >
    //     )
    // }
    // for (let j = 0; j < 31; j++) {
    //     const newDate = new Date(date.getTime() + j * 1000 * 60 * 60 * 24);
    //     // datesCollection.push(`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
    //     months.push(
    //         <TouchableOpacity key={j} onPress={() => setSelectedDay(j)}>
    //             <View style={styles.cloumn}>
    //                 <Text style={styles.thumbup}>{newDate.getMonth() + 1}</Text>
    //             </View>
    //         </TouchableOpacity >
    //     )
    // }
    // for (let j = 0; j < 331; j++) {
    //     const newDate = new Date(date.getTime() + j * 1000 * 60 * 60 * 24);
    //     // datesCollection.push(`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
    //     years.push(
    //         <TouchableOpacity key={j} onPress={() => setSelectedDay(j)}>
    //             <View style={styles.cloumn}>
    //                 <Text style={styles.thumbup}>{newDate.getFullYear()}</Text>
    //             </View>
    //         </TouchableOpacity >
    //     )
    // }
    // addDays = () => {
    //     const date = new Date();
    //     let datesCollection = []

    //     for (var i = 1; i < 31; i++) {
    //       const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
    //       datesCollection.push(`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
    //     }

    //     return datesCollection
    //   }
    // console.log(days);
    useEffect(() => {
        dispatch({
            type: 'set_selectedday',
            payload: selectedDay,
        });

        const newDate = new Date(date.getTime() + selectedDay * 1000 * 60 * 60 * 24);

        let full_date = newDate.getFullYear().toString() + '-' + newDate.getMonth().toString() + '-' + newDate.getDate();
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
        <ScrollView style={{ flex: 1 }}>
            <FontBold mystyle={styles.qText} value='When would you like cleaning?' />
            <Spacer />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                {days}
            </ScrollView>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                {months}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                {years}
            </ScrollView> */}
            <Spacer />
            {/* <Slider
                value={selectedDay}
                onValueChange={setSelectedDay}
                minimumValue={2}
                maximumValue={8}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                minimumTrackTintColor='#f1c40f'
            /> */}
            <Spacer>
                <FontBold mystyle={styles.qText} value='what time would you like us to start?' />
            </Spacer>
            <Spacer />
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
            {/* <Slider
                value={start}
                onValueChange={setStart}
                minimumValue={1}
                maximumValue={4}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                minimumTrackTintColor='#f1c40f'
            /> */}

            <View>

            </View>
        </ScrollView>);
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
        borderColor: '#f1c40f',
        borderWidth: 2,
    },
    thumbup: {
        fontSize: 24,
        padding: 7,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'white',
        borderColor: '#f1c40f',
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
        backgroundColor: '#f1c40f',
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
        borderColor: '#f1c40f',
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
        backgroundColor: '#f1c40f',
        borderColor: 'white',
        borderWidth: 2,
        textAlign: 'center',
        marginRight: 4
    }
});

export default DateandTimeDetails;