import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class MapInput extends React.Component {

    render() {
        return (

            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        borderWidth: 1,
                        borderColor: '#f5c500',
                        top: 15,
                        right: 10,

                    },
                    textInputContainer: {
                        width: '100%',
                        backgroundColor: "#fff",

                    },
                    description: {
                        fontWeight: 'bold',
                    },
                    listView: {
                        // position: 'absolute',
                        marginTop: 0,
                        backgroundColor: '#fff',
                        elevation: 10,
                        zIndex: 1000
                    },
                    separator: {
                        opacity: 0
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    }
                }}
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                placeholderTextColor="#f5c500"
                onPress={
                    (data, details = null) => { // 'details' is provided when fetchDetails = true
                        this.props.notifyChange(details.geometry.location);
                        console.log("MapInput::notifyChange::");
                        console.log(details.geometry.location);
                    }
                }

                query={{
                    key: 'AIzaSyDaIXmhA81AB201SQEkng_3b3aT4_8muFs',
                    language: 'en',
                    // types: '(country)', // default: 'geocode'
                    // componentRestrictions: { country: "sy" }
                    components: 'country:sy'

                }}

                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={200}
                blurOnSubmit={true}
                GoogleReverseGeocodingQuery={{
                }}
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                    types: 'address',
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            />
        );
    }
}
export default MapInput;