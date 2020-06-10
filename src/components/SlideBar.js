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
    const { state } = useContext(UserContext);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        setFullName(state.userDetails.fullName);
    }, [state.userDetails.fullName]);

    return (
        <ScrollView style={styles.container}>
            <Spacer />
            <View style={styles.sideMenuContainer}>
                <Spacer />
                <View style={styles.profileHeader}>
                    <View style={styles.profileHeaderPicCircle}>
                        <FontLight mystyle={{ fontSize: 25, color: '#ffd700', }} value={fullName != null ? fullName.charAt(0) : ""} />
                    </View>
                    <FontLight mystyle={styles.profileHeaderText} value={fullName} />
                </View>
                <View style={styles.profileHeaderLine} />
                <View>
                    <DrawerNavigatorItems
                        activeBackgroundColor="#f5c500"
                        activeTintColor="#ffd700"

                        activeLabelStyle={{}}
                        inactiveBackgroundColor="#ffd700"
                        inactiveTintColor="#f5c500"
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
                            backgroundColor: '#ffd700',
                        }}
                        {...props} />
                </View>
            </View>
        </ScrollView>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffd700',
    },

    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffd700',
        paddingTop: 0,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#ffd700',
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
        flex: 1,
        flexWrap: 'wrap',
        color: '#ffffff',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    profileHeaderLine: {
        height: 3,
        marginHorizontal: 20,
        backgroundColor: '#f5c500',
        marginTop: 15,
        marginBottom: 30,
    },

});