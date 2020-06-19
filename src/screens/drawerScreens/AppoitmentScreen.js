// import React, { Component } from 'react';
// import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { BackHandler } from 'react-native';

// const AppoitmentScreen = ({ navigation }) => {
//   const unsubscribe = navigation.addListener('didFocus', () => {
//     BackHandler.addEventListener('hardwareBackPress', () => { return true; });
//   });
//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', () => { return true; });
//     return () => {
//       BackHandler.removeEventListener('hardwareBackPress', () => { return true; });
//       navigation.removeListener('didFocus', () => { })
//     };
//   }, []);
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#ff9800" }}>
//     </SafeAreaView>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   Text: {
//     color: "#161924",
//     fontSize: 20,
//     fontWeight: "500"
//   }
// });

// export default AppoitmentScreen;