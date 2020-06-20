import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapContainer from '../components/lcation/MapContainer';
import { BackHandler } from 'react-native';


export default class MapScreen extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => { return true });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => { return true });
    }
    render() {
        return (
            <View style={styles.container}>
                <MapContainer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight
    }
});
