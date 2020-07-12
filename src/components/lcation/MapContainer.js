import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import MapInput from './MapInput';
// import MyMapView from './MyMapView';
import { getLocation, geocodeLocationByName, geocodeLocationByCoords, geocodeCountryByCoords, geocodeFormattedAddressByCoords } from './LocationService';
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
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Normalize, fontNormalize } from '../../components/actuatedNormalize';

const MapContainer = () => {
    const [country, setCountry] = useState('');
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

        // var locname = await geocodeLocationByCoords(latitude, longitude);
        var add = await geocodeFormattedAddressByCoords(latitude, longitude);
        // var shortname = await geocodeShortByCoords(latitude, longitude).short_name;
        // console.log("Location Name");
        // console.log(locname);
        // console.log(sbf);
        // const parts = sbf.split('@');
        // console.log("parts" + parts[0])
        // var long_name = locname.long_name;
        // var short_name = locname.short_name;
        // console.log("long_name: " + long_name)
        // console.log("short_name: " + short_name)
        // console.log("Entered Street");
        // console.log(parts[0]);
        // console.log("Entered Building");
        // console.log(parts[1]);
        // console.log("Entered Apartment");
        // console.log(parts[2]);
        addNewAddress({
            address: add.address_components[1].long_name,
            lat: latitude,
            lon: longitude,
            details: add.formatted_address,
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
            if (redirect == "ManageAddresses") { navigate("HomeNavigator"); navigate("ManageAddresses"); }
            else if (redirect == "BabySitterScreen") navigate("BabySitterScreen");
            else if (redirect == "HomeCleaningScreen") navigate("HomeCleaningScreen");
            //navigate("HomeCleaningScreen");
            else navigate(redirect);
        }).catch(() => {
            setIsLoading(false);
            Toast.show(i18n.t('addresscantbesaved'), Toast.LONG);
        });
    }
    const getInitialState = async () => {
        await getLocation().then(
            async (data) => {
                console.log("MapContainer::getinitialState");
                console.log(data);
                setLatitude(data.latitude);
                setLongitude(data.longitude);
                setLatitudeDelta(0.003);
                setLongitudeDelta(0.003);
                var name = await geocodeFormattedAddressByCoords(data.latitude, data.longitude);
                if (name != undefined && (name.formatted_address.indexOf('Ukraine') > -1)) {
                    console.log("##################" + name.formatted_address);
                    setCountry('Ukraine');
                }
                else {
                    setCountry('')
                }
            }
        );
    }

    const getCoordsFromName = async (loc) => {
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
        var name = await geocodeFormattedAddressByCoords(loc.lat, loc.lng);
        if (name != undefined && (name.formatted_address.indexOf('Ukraine') > -1)) {
            console.log("##################" + name.formatted_address);
            setCountry('Ukraine');
        }
        else {
            setCountry('')
        }
    }

    const onMapRegionChange = async (region) => {
        // this.setState({ region });
        console.log("MapContainer::onMapRegionChange");
        console.log(region);
        setLatitude(region.latitude);
        setLongitude(region.longitude);
        setLatitudeDelta(region.latitudeDelta);
        setLongitudeDelta(region.longitudeDelta);
        var name = await geocodeFormattedAddressByCoords(region.latitude, region.longitude);
        if (name != undefined && (name.formatted_address.indexOf('Ukraine') > -1)) {
            console.log("##################" + name.formatted_address);
            setCountry('Ukraine');
        }
        else {
            setCountry('')
        }
    }

    return (
        <View style={styles.container}>
            <Loader loading={isloading} />
            <View style={styles.mapinputstyle}>
                <View style={styles.item2}>
                    <View style={{ zIndex: 17, top: Normalize(15), left: Normalize(25), color: '#aaa', flexDirection: "column", justifyContent: "center" }}>
                        <Icon
                            onPress={async () => {
                                var redirect = await getRedirect();
                                // alert(redirect)
                                removeRedirect();
                                navigate(redirect);
                            }}
                            name="md-arrow-back"
                            size={Normalize(35)}
                        />
                    </View>
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
                            {/* <Image
                                style={{
                                    resizeMode: 'contain',
                                    height: 45, width: 45,
                                }} source={require('../../../assets/marker.png')} /> */}
                            <MaterialIcons name="location-on" size={Normalize(45)} color="#d21404" />
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                right: Normalize(25),
                                bottom: Normalize(100),
                                marginLeft: -Normalize(24),
                                marginTop: -Normalize(48),
                                position: 'absolute',
                                zIndex: 16,
                            }}
                            onPress={() => {
                                getInitialState();
                            }}>
                            <FontAwesome style={styles.locationArrow} name="location-arrow" size={Normalize(30)} color="#999" />
                        </TouchableOpacity>
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
            <AddressDetailsConfirm country={country} latitude={latitude} longitude={longitude} onclick={(street, buildingnumber, apartment) => { saveUserAddress(street, buildingnumber, apartment); }} />
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
        top: Normalize(5),
        zIndex: 16,
        flexDirection: 'row',
    },
    item2: {
        flexDirection: "row",
        width: '100%' // is 50% of container width
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    locationArrow: {
        borderRadius: 50,
        borderWidth: 0,
        width: Normalize(50),
        height: Normalize(50),
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#e7e7e7',

    }
});