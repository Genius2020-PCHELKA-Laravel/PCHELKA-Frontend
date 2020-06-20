import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import MapInput from './MapInput';
// import MyMapView from './MyMapView';
import { getLocation, geocodeLocationByName, geocodeLocationByCoords } from './LocationService';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../navigationRef';
import MapView, { Marker } from 'react-native-maps';
import AddressDetailsConfirm from './AddressDetailsConfirm';
import Toast from 'react-native-simple-toast';
import { Context as UserContext } from '../../screens/context/UserContext';
import { setRediret, getRedirect, removeRedirect } from '../../api/redirect'
import Loader from '../Loader';
import i18n from '../../locales/i18n';
import { Dimensions } from 'react-native';

const MapContainer = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [latitudeDelta, setLatitudeDelta] = useState(0.003);
    const [longitudeDelta, setLongitudeDelta] = useState(0.003);
    const [isloading, setIsLoading] = useState(false);
    const { state, addNewAddress, } = useContext(UserContext);
    const { width, height } = Dimensions.get('window');


    useEffect(() => {
        getInitialState();
    }, [])

    const saveUserAddress = async (street, buildingnumber, apartment) => {
        setIsLoading(true);

        var locname = await geocodeLocationByCoords(latitude, longitude);
        // console.log("Location Name");
        // console.log(locname);
        // console.log(sbf);
        // const parts = sbf.split('@');
        // console.log("parts" + parts[0])
        var long_name = locname.long_name;
        var short_name = locname.short_name;
        // console.log("long_name: " + long_name)
        // console.log("short_name: " + short_name)
        // console.log("Entered Street");
        // console.log(parts[0]);
        // console.log("Entered Building");
        // console.log(parts[1]);
        // console.log("Entered Apartment");
        // console.log(parts[2]);
        addNewAddress({
            address: short_name,
            lat: latitude,
            lon: longitude,
            details: long_name,
            area: "area",
            street: street,
            buildingNumber: buildingnumber,
            apartment: apartment
        }).then(async (status) => {
            //for Adding new Address to the list
            setIsLoading(false);
            Toast.show(i18n.t('addresscorrectlysaved'), Toast.LONG);
            // navigate('HomeNavigator');
            var redirect = await getRedirect();
            removeRedirect();
            if (redirect == "ManageAddresses") navigate("HomeNavigator");
            else if (redirect == "BabySitterScreen") navigate("BabySitterScreen");
            else if (redirect == "HomeCleaningScreen") navigate("HomeCleaningScreen");
            //navigate("HomeCleaningScreen");
            else navigate(redirect);
        }).catch(() => {
            setIsLoading(false);
            Toast.show(i18n.t('addresscantbesaved'), Toast.LONG);
        });
    }
    const getInitialState = () => {
        getLocation().then(
            (data) => {
                console.log("MapContainer::getinitialState");
                console.log(data);
                setLatitude(data.latitude);
                setLongitude(data.longitude);
                setLatitudeDelta(0.003);
                setLongitudeDelta(0.003);
            }
        );
    }

    const getCoordsFromName = (loc) => {
        // this.setState({
        //     region: {
        //         latitude: loc.lat,
        //         longitude: loc.lng,
        //         latitudeDelta: 0.003,
        //         longitudeDelta: 0.003
        //     }
        // });
        console.log("MapContainer::getCoordsFromName");
        console.log(loc);
        setLatitude(loc.lat);
        setLongitude(loc.lng);
        setLatitudeDelta(0.003);
        setLongitudeDelta(0.003);
    }

    const onMapRegionChange = (region) => {
        // this.setState({ region });
        console.log("MapContainer::onMapRegionChange");
        console.log(region);
        setLatitude(region.latitude);
        setLongitude(region.longitude);
        setLatitudeDelta(region.latitudeDelta);
        setLongitudeDelta(region.longitudeDelta);
    }

    return (
        <View style={styles.container}>
            <Loader loading={isloading} />
            <View style={styles.mapinputstyle}>
                <View style={styles.item1}>
                    <Icon
                        style={{ top: 15, color: '#f5c500' }}
                        onPress={() => navigate('HomeNavigator')}
                        name="md-arrow-back"
                        size={35}
                    />
                </View>
                <View style={styles.item2}>
                    <MapInput notifyChange={(loc) => {
                        getCoordsFromName(loc);
                    }} />
                </View>
            </View>

            {
                latitude != 0 ?
                    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{
                            left: '50%',
                            marginLeft: -24,
                            marginTop: -48,
                            position: 'absolute',
                            top: '50%',
                            zIndex: 16
                        }}>
                            <Image
                                style={{
                                    resizeMode: 'contain',
                                    height: 45, width: 45,
                                }} source={require('../../../assets/marker3.png')} />
                        </View>
                        <MapView
                            style={styles.mapStyle}
                            region={{ latitude: latitude, longitude: longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }}
                            loadingEnabled
                            showsUserLocation={true}
                            onRegionChangeComplete={(reg) => onMapRegionChange(reg)}
                        >
                            {/* <Marker
                                coordinate={{ latitude: latitude, longitude: longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }}
                                pinColor="#d21404" /> */}
                        </MapView>
                    </View> : null
            }
            {/* <TouchableOpacity
                    onPress={() => this.handleSubmitButton()}> */}
            <AddressDetailsConfirm latitude={latitude} longitude={longitude} onclick={(street, buildingnumber, apartment) => { saveUserAddress(street, buildingnumber, apartment); }} />
            {/* </TouchableOpacity> */}
        </View >
    );
}
export default MapContainer;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapinputstyle: {
        position: 'absolute',
        top: 5,
        zIndex: 16,
        flexDirection: 'row',
    },
    item1: {
        left: 15,
        width: '10%' // is 50% of container width
    },
    item2: {
        left: 20,
        width: '87%' // is 50% of container width
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});