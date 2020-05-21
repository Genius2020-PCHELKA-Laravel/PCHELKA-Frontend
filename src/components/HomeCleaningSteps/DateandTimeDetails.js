
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
    const [day, setDay] = useState(0);
    const [start, setStart] = useState(1);
    useEffect(() => {

    }, []);
    return (
        <ScrollView style={{ flex: 1 }}>
            <FontBold mystyle={styles.qText} value='When would you like cleaning?' />
            <Slider
                value={day}
                onValueChange={setDay}
                minimumValue={2}
                maximumValue={8}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                minimumTrackTintColor='#f1c40f'
            />
            <FontRegular mystyle={styles.aText} value={day} />
            <Spacer>
                <FontBold mystyle={styles.qText} value='what time would you like us to start?' />
            </Spacer>
            <Slider
                value={start}
                onValueChange={setStart}
                minimumValue={1}
                maximumValue={4}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                minimumTrackTintColor='#f1c40f'
            />
            <FontRegular mystyle={styles.aText} value={start} />

            <View>

            </View>
        </ScrollView>);
};

const styles = StyleSheet.create({
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
    }
});

export default DateandTimeDetails;