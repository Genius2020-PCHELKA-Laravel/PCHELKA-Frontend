// import { Context as UserContext } from '../screens/context/UserContext';
// import React, { useEffect, useContext, useState } from 'react';

// import { View, StyleSheet, Text, Alert } from 'react-native';
// import { AsyncStorage } from "react-native";

// const CustomSidebarMenu = props => {
//     let items = [
//         {
//             navOptionName: 'Home Screen',
//             screenToNavigate: 'HomeScreen',
//         },
//         {
//             navOptionName: 'Setting Screen',
//             screenToNavigate: 'SettingScreen',
//         },
//         {
//             navOptionName: 'Logout',
//             screenToNavigate: 'logout',
//         },
//     ];
//     const { dispatch, state, getUserDetails } = useContext(UserContext);
//     const [fullName, setFullName] = useState('');

//     useEffect(() => {
//         // getUserDetails().then((response) => {
//         try {
//             var details = getUserDetailsStorage();
//             setFullName(details.fullName);
//             console.log("SET Full Name IN SlideBar:" + details.fullName);
//         } catch (err) {
//             console.log("Error CustomSideBarMenu:: " + err)
//         }
//         // }).catch((error) => { });
//     }, []);
//     const handleClick = (index, screenToNavigate) => {
//         if (screenToNavigate == 'logout') {
//             props.navigation.toggleDrawer();
//             Alert.alert(
//                 'Logout',
//                 'Are you sure? You want to logout?',
//                 [
//                     {
//                         text: 'Cancel',
//                         onPress: () => {
//                             return null;
//                         },
//                     },
//                     {
//                         text: 'Confirm',
//                         onPress: () => {
//                             AsyncStorage.clear();
//                             props.navigation.navigate('Auth');
//                             console.log('logout');
//                         },
//                     },
//                 ],
//                 { cancelable: false }
//             );
//         } else {
//             props.navigation.toggleDrawer();
//             global.currentScreenIndex = screenToNavigate;
//             props.navigation.navigate(screenToNavigate);
//         }
//     };
//     return (
//         <View style={stylesSidebar.sideMenuContainer}>
//             <View style={stylesSidebar.profileHeader}>
//                 <View style={stylesSidebar.profileHeaderPicCircle}>
//                     <Text style={{ fontSize: 25, color: '#307ecc' }}>
//                         {fullName.charAt(0)}
//                     </Text>
//                 </View>
//                 <Text style={stylesSidebar.profileHeaderText}>{fullName}</Text>
//             </View>
//             <View style={stylesSidebar.profileHeaderLine} />
//             <View style={{ width: '100%', flex: 1 }}>
//                 {items.map((item, key) => (
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             padding: 20,
//                             color: 'white',
//                             backgroundColor:
//                                 global.currentScreenIndex === item.screenToNavigate
//                                     ? '#4b9ff2'
//                                     : '#307ecc',
//                         }}
//                         key={key}
//                         onStartShouldSetResponder={() =>
//                             handleClick(key, item.screenToNavigate)
//                         }>
//                         <Text style={{ fontSize: 15, color: 'white' }}>
//                             {item.navOptionName}
//                         </Text>
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const stylesSidebar = StyleSheet.create({
//     sideMenuContainer: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#307ecc',
//         paddingTop: 40,
//         color: 'white',
//     },
//     profileHeader: {
//         flexDirection: 'row',
//         backgroundColor: '#307ecc',
//         padding: 15,
//         textAlign: 'center',
//     },
//     profileHeaderPicCircle: {
//         width: 60,
//         height: 60,
//         borderRadius: 60 / 2,
//         color: 'white',
//         backgroundColor: '#ffffff',
//         textAlign: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     profileHeaderText: {
//         color: 'white',
//         alignSelf: 'center',
//         paddingHorizontal: 10,
//         fontWeight: 'bold',
//     },
//     profileHeaderLine: {
//         height: 1,
//         marginHorizontal: 20,
//         backgroundColor: '#e2e2e2',
//         marginTop: 15,
//         marginBottom: 10,
//     },
// });
// export default CustomSidebarMenu;                