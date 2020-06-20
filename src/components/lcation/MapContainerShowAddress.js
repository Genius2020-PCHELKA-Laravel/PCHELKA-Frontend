import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import MapInput from './MapInput';
import { getLocation, geocodeLocationByName, geocodeLocationByCoords, geocodeCountryByCoords, geocodeFormattedAddressByCoords } from './LocationService';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../navigationRef';
import MapView, { Marker } from 'react-native-maps';
import AddressDetailsConfirmShowAddress from './AddressDetailsConfirmShowAddress';
import Toast from 'react-native-simple-toast';
import { Context as UserContext } from '../../screens/context/UserContext';
import { setRediret, getRedirect, removeRedirect } from '../../api/redirect'
import Loader from '../Loader';
import i18n from '../../locales/i18n';
import { Dimensions } from 'react-native';

const MapContainerShowAddress = ({ navigation, ulatitude, ulongitude, uid, ustreet, ubuildingnumber, uapartment }) => {
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [latitudeDelta, setLatitudeDelta] = useState(0.003);
    const [longitudeDelta, setLongitudeDelta] = useState(0.003);
    const [isloading, setIsLoading] = useState(false);
    const { state, updateAddress, dispatch } = useContext(UserContext);
    const { width, height } = Dimensions.get('window');


    useEffect(() => {
        // console.log("navigation::" + JSON.stringify(navigation));
        getInitialState();
    }, [])

    const updateUserAddress = async (street, buildingnumber, apartment) => {
        setIsLoading(true);
        var add = await geocodeFormattedAddressByCoords(latitude, longitude);
        updateAddress({
            id: uid,
            address: add.address_components[1].long_name,
            lat: latitude,
            lon: longitude,
            details: add.formatted_address,
            area: "area",
            street: street,
            buildingNumber: buildingnumber,
            apartment: apartment
        }).then(async (status) => {
            //to update address in state
            var updated_addresses = state.addresses.slice();
            var address = updated_addresses.find((add) => add.id === uid);
            var addressindex = updated_addresses.findIndex((add) => add.id === uid);
            // alert(addressindex)
            updated_addresses[addressindex] = {
                ...address,
                id: uid,
                address: add.address_components[1].long_name,
                lat: latitude,
                lon: longitude,
                details: add.formatted_address,
                area: "area",
                street: street,
                buildingNumber: buildingnumber,
                apartment: apartment
            };
            //TODO
            /////update address
            dispatch({ type: 'set_user_addresses', payload: updated_addresses });
            // alert(JSON.stringify(address))

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
        // getLocation().then(
        //     (data) => {
        console.log("MapContainerShowAddress::getinitialState");
        // console.log(data);
        // console.log("ShowAddressLatitude" + navigation)
        setLatitude(ulatitude);
        setLongitude(ulongitude);
        setLatitudeDelta(0.003);
        setLongitudeDelta(0.003);

        var name = await geocodeFormattedAddressByCoords(ulatitude, ulongitude);
        if (name != undefined && (name.formatted_address.indexOf('Ukraine') > -1)) {
            console.log("##################" + name.formatted_address);
            setCountry('Ukraine');
        }
        else {
            setCountry('')
        }


        //     }
        // );
    }

    const getCoordsFromName = async (loc) => {
        console.log("MapContainerShowAddress::getCoordsFromName");
        console.log(loc);
        setLatitude(loc.lat);
        setLongitude(loc.lng);
        setLatitudeDelta(0.003);
        setLongitudeDelta(0.003);
        var name = await geocodeFormattedAddressByCoords(ulatitude, ulongitude);
        if (name != undefined && (name.formatted_address.indexOf('Ukraine') > -1)) {
            console.log("##################" + name.formatted_address);
            setCountry('Ukraine');
        }
        else {
            setCountry('')
        }
    }

    const onMapRegionChange = async (region) => {
        console.log("MapContainerShowAddress::onMapRegionChange");
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
                    <Icon
                        style={{ position: "absolute", zIndex: 17, top: 20, color: '#aaa' }}
                        onPress={async () => {
                            var redirect = await getRedirect();
                            // alert(redirect)
                            removeRedirect();
                            navigate(redirect);
                        }}
                        name="md-arrow-back"
                        size={35}
                    />
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
                                }} source={require('../../../assets/marker.png')} />
                        </View>
                        <MapView
                            style={styles.mapStyle}
                            region={{ latitude: latitude, longitude: longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }}
                            loadingEnabled
                            showsUserLocation={true}
                            onRegionChangeComplete={(reg) => onMapRegionChange(reg)}
                        >
                        </MapView>
                    </View> : null
            }
            <AddressDetailsConfirmShowAddress
                country={country}
                latitude={latitude}
                longitude={longitude}
                uid={uid}
                ustreet={ustreet}
                ubuildingnumber={ubuildingnumber}
                uapartment={uapartment}
                onclick={(street, buildingnumber, apartment) => {
                    updateUserAddress(street, buildingnumber, apartment);
                }} />
        </View >
    );
}
export default MapContainerShowAddress;
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
    item2: {
        left: 20,
        width: '97%' // is 50% of container width
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});