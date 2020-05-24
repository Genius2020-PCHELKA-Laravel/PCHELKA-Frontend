import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, Image, Text, View } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { Context as UserContext } from '../screens/context/UserContext';
import { Avatar } from 'react-native-elements';

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
            <View
                style={{ padding: 16, paddingTop: 48 }}>
                <Avatar
                    xlarge
                    rounded
                    icon={{ name: 'user', type: 'font-awesome' }}
                    size={50}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    containerStyle={{ flex: 5, marginRight: 60, backgroundColor: '#666' }}
                />
                {/* <Image source={require('../../assets/profile.png')} styles={styles.profile} /> */}
                <Text style={styles.text}>{fullName}</Text>
            </View>
            <View>
                <DrawerNavigatorItems {...props} />
            </View>
        </ScrollView>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        opacity: 0.5
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FFF',
    }
    , text: {
        fontSize: 30,
        color: '#fff',
        marginVertical: 8,
        fontWeight: "800"
    }
});