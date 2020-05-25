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

export default SlideBar = props => {
    //const { state, getUserDetails } = useContext(UserContext);
    const { dispatch, state, getUserDetails } = useContext(UserContext);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        getUserDetails().then((response) => {
            setFullName(response.fullName);
            console.log("SET Full Name IN Drawer:" + response.fullName);
        }).catch((error) => { });
    }, []);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.sideMenuContainer}>
                <Spacer />
                <View style={styles.profileHeader}>
                    <View style={styles.profileHeaderPicCircle}>
                        <FontLight mystyle={{ fontSize: 25, color: '#FF9800' }} value={fullName.charAt(0)} />
                    </View>
                    <FontLight mystyle={styles.profileHeaderText} value={fullName} />
                </View>
                <View style={styles.profileHeaderLine} />
                <View>
                    <DrawerNavigatorItems
                        activeBackgroundColor="#ffd699"
                        activeTintColor="#ffc166"
                        activeLabelStyle={{}}
                        inactiveBackgroundColor=""
                        inactiveTintColor=""
                        iconContainerStyle=""
                        iconContainerStyle={{ position: 'absolute', right: 25 }}
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
                            backgroundColor: 'white',
                        }}
                        {...props} />
                </View>
            </View>
        </ScrollView>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FF9800',
        paddingTop: 40,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#FF9800',
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
        backgroundColor: '#ffffff',
        marginTop: 15,
        marginBottom: 15,
    },

});