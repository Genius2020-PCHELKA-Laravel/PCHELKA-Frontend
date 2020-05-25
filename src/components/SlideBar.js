import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, Image, Text, View } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import { Context as UserContext } from '../screens/context/UserContext';
import { Avatar } from 'react-native-elements';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
import { getUserDetailsStorage, setUserDetailsStorage, removeUserDetailsStorage } from '../api/userDetails';

export default SlideBar = props => {
    //const { state, getUserDetails } = useContext(UserContext);
    const { dispatch, state, getUserDetails } = useContext(UserContext);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        getUserDetailsStorage().then((response) => {
            if (response != null) {
                setFullName(response.fullName);
                console.log("Getting details of user from AscyncStorage");
                return;
            };
        }).catch((err) => { console.log("SlideBar useffect #1 " + err); });

        getUserDetails().then((details) => {
            getUserDetailsStorage().then((response) => {
                console.log("Getting details of user from AscyncStorage");
                console.log("SET Full Name IN SlideBar:" + response.fullName);
                setFullName(response.fullName);
            }).catch((err) => { console.log(err); });
        }).catch((err) => { console.log("SlideBar useffect #2 " + err); });
    }, []);
    return (
        <ScrollView style={styles.container}>
            <Spacer />
            <View style={styles.sideMenuContainer}>
                <Spacer />
                <View style={styles.profileHeader}>
                    <View style={styles.profileHeaderPicCircle}>
                        <FontLight mystyle={{ fontSize: 25, color: '#FF9800' }} value={fullName != null ? fullName.charAt(0) : ""} />
                    </View>
                    <FontLight mystyle={styles.profileHeaderText} value={fullName} />
                </View>
                <View style={styles.profileHeaderLine} />
                <View>
                    <DrawerNavigatorItems
                        activeBackgroundColor="#ffc166"
                        activeTintColor="#ffd699"

                        activeLabelStyle={{}}
                        inactiveBackgroundColor="#ffd699"
                        inactiveTintColor="#ffc166"
                        iconContainerStyle=""
                        iconContainerStyle={{ position: 'absolute', right: 15 }}
                        itemStyle={{
                            // alignItems: 'center',
                            // color: 'blue',
                            // fontSize: 20,
                            // borderColor: 'white',
                            // borderWidth: 1,
                            // padding: 0,
                            // marginVertical: 2,
                            // marginHorizontal: 2,
                        }}
                        itemsContainerStyle={{
                            backgroundColor: '#ffd699',
                        }}
                        {...props} />
                </View>
            </View>
        </ScrollView>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffd699',
    },

    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffd699',
        paddingTop: 0,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#ffd699',
        padding: 15,
        textAlign: 'center',
    },
    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        color: '#ffffff',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    profileHeaderLine: {
        height: 3,
        marginHorizontal: 20,
        backgroundColor: '#ffc166',
        marginTop: 15,
        marginBottom: 30,
    },

});