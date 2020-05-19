import React from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: 'AIzaSyCmAe-tvHvfwuAy6MfJi_Kw_U80n9RAdag',
                language: 'en',
            }}
        />
    );
};

export default GooglePlacesInput;