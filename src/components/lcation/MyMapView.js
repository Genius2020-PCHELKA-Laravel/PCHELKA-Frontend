// import React from 'react';
// import MapView, { Marker } from 'react-native-maps';

// const MyMapView = (props) => {
//     return (
//         <MapView
//             style={{ flex: 1, position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
//             region={{ latitude: parseFloat(props.latitude), longitude: parseFloat(props.longitude), latitudeDelta: parseFloat(props.latitudeDelta), longitudeDelta: parseFloat(props.longitudeDelta) }}
//             showsUserLocation={true}
//             loadingEnabled
//             maxDelta={0.003}
//             maxZoomLevel={300}
//             onRegionChangeComplete={(reg) => {
//                 props.onMapRegionChangeComplete(reg);
//                 console.log("MyMapView::onregionChange:: ");
//                 console.log(reg)
//             }}
//         >
//             <Marker
//                 coordinate={{ latitude: parseFloat(props.latitude), longitude: parseFloat(props.longitude), latitudeDelta: parseFloat(props.latitudeDelta), longitudeDelta: parseFloat(props.longitudeDelta) }}
//                 pinColor="#d21404" />
//         </MapView>
//     )
// }
// export default MyMapView;












// import React from 'react';
// import MapView, { Marker } from 'react-native-maps';

// const MyMapView = (props) => {
//     return (
//         <MapView
//             style={{ flex: 1, position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
//             region={{ latitude: props.latitude, longitude: props.longitude, latitudeDelta: props.latitudeDelta, longitudeDelta: props.longitudeDelta }}
//             showsUserLocation={true}
//             loadingEnabled
//             maxDelta={0.003}
//             maxZoomLevel={300}
//             onRegionChangeComplete={(reg) => {
//                 props.onMapRegionChangeComplete(reg);
//                 console.log("MyMapView::onregionChange:: ");
//                 console.log(reg)
//             }}
//         >
//             <Marker
//                 coordinate={{ latitude: props.latitude, longitude: props.longitude, latitudeDelta: props.latitudeDelta, longitudeDelta: props.longitudeDelta }}
//                 pinColor="#d21404" />
//         </MapView>
//     )
// }
// export default MyMapView;