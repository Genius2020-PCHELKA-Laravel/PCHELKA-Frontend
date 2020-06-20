import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapContainerShowAddress from '../components/lcation/MapContainerShowAddress';
import { BackHandler } from 'react-native';

const MapScreenShowAddress = ({ navigation }) => {

    useEffect(() => {
        // console.log("navigation::" + JSON.stringify(navigation.state));
        BackHandler.addEventListener('hardwareBackPress', () => { return true });
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => { return true });
        }
    }, []);

    return (
        <View style={styles.container}>
            <MapContainerShowAddress
                uid={navigation.state.params.uid}
                ulatitude={navigation.state.params.ulatitude}
                ulongitude={navigation.state.params.ulongitude}
                ustreet={navigation.state.params.ustreet}
                ubuildingnumber={navigation.state.params.ubuildingnumber}
                uapartment={navigation.state.params.uapartment}
            />
        </View>
    );
}
export default MapScreenShowAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight
    }
});
