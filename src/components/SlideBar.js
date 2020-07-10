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
import { fontNormalize, Normalize } from '../components/actuatedNormalize';

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
                        <FontBold mystyle={{ fontSize: fontNormalize(25), color: '#6b695a', fontWeight: "bold" }} value={fullName != null ? fullName.charAt(0) : ""} />
                    </View>
                </View>
                <FontLight mystyle={styles.profileHeaderText} value={fullName} />
                {/* <View style={styles.profileHeaderLine} /> */}
                <View>
                    <DrawerNavigatorItems
                        activeBackgroundColor="#353626"
                        activeTintColor="#6b695a"

                        activeLabelStyle={{}}
                        inactiveBackgroundColor="#6b695a"
                        inactiveTintColor="#353626"
                        iconContainerStyle={{ position: 'absolute', right: 0 }}
                        itemStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#7a7a7a"
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
                            backgroundColor: '#6b695a',
                        }}
                        {...props} />
                </View>
            </View>
        </ScrollView>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6b695a',
    },

    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#6b695a',
        paddingTop: 0,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#6b695a',
        padding: Normalize(15),
        textAlign: 'center',
    },
    profileHeaderPicCircle: {
        width: Normalize(60),
        height: Normalize(60),
        borderRadius: Normalize(60) / 2,
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
        marginLeft: Normalize(20),
        fontWeight: 'bold',
        fontSize: fontNormalize(24)
    },
    profileHeaderLine: {
        height: Normalize(3),
        marginHorizontal: Normalize(20),
        backgroundColor: '#6b695a',
        marginTop: Normalize(15),
        marginBottom: Normalize(30),
        marginLeft: Normalize(15),
    },

});