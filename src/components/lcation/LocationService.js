import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyDaIXmhA81AB201SQEkng_3b3aT4_8muFs"); // use a valid API key

export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => {
                    resolve(data.coords);
                    console.log("locationServices::getlocation::resolve");
                    console.log(data.coords)
                },
                (err) => {
                    reject(error);
                    console.log("locationServices::getlocation::reject");
                    console.log(error)
                }
            );
        }
    );
}

export const geocodeLocationByName = (locationName) => {
    return new Promise(
        (resolve, reject) => {
            // Initialize the module (needs to be done only once)
            Geocoder.from(locationName)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolve(addressComponent);
                    console.log("locationServices::geocodeLocationByName::resolve");
                    console.log(addressComponent);
                })
                .catch(error => {
                    reject(error);
                    console.log("locationServices::geocodeLocationByName::reject");
                    console.log(error);
                });
        }
    );
}

export const geocodeLocationByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            // Initialize the module (needs to be done only once)
            Geocoder.from(lat, long)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolve(addressComponent);
                    console.log("locationServices::geocodeLocationByCoords::resolve");
                    console.log(addressComponent);
                })
                .catch(error => {
                    reject(error);
                    console.log("locationServices::geocodeLocationByCoords::reject");
                    console.log(error);
                });
        }
    );
}
// export const geocodeShortByCoords = (lat, long) => {
//     return new Promise(
//         (resolve, reject) => {
//             // Initialize the module (needs to be done only once)
//             Geocoder.from(lat, long)
//                 .then(json => {
//                     const addressComponent = json.results[0].address_components[1];
//                     resolve(addressComponent);
//                     console.log("locationServices::geocodeShortByCoords::resolve");
//                     console.log(addressComponent);
//                 })
//                 .catch(error => {
//                     reject(error);
//                     console.log("locationServices::geocodeShortByCoords::reject");
//                     console.log(error);
//                 });
//         }
//     );
// }
export const geocodeFormattedAddressByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            // Initialize the module (needs to be done only once)
            Geocoder.from(lat, long)
                .then(json => {
                    const addressComponent = json.results[0];
                    resolve(addressComponent);
                    console.log("locationServices::geocodeFormattedAddressByCoords::resolve");
                    console.log(addressComponent);
                })
                .catch(error => {
                    reject(error);
                    console.log("locationServices::geocodeFormattedAddressByCoords::reject");
                    console.log(error);
                });
        }
    );
}

export const geocodeCountryByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            // Initialize the module (needs to be done only once)
            Geocoder.from(lat, long)
                .then(json => {
                    const addressComponent = json.results[0].address_components[6];
                    resolve(addressComponent);
                    console.log("locationServices::geocodeCountryByCoords::resolve");
                    console.log(addressComponent);
                })
                .catch(error => {
                    reject(error);
                    console.log("locationServices::geocodeCountryByCoords::reject");
                    console.log(error);
                });
        }
    );
}