import React, { useContext } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, AsyncStorage, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Context as Authcontext2 } from '../context/AuthContext';
import { FontAwesome5 } from '@expo/vector-icons';
import OfflineNotice from '../../components/OfflineNotice';

const ManageCreditCards = ({ navigation }) => {
    const { logout } = useContext(Authcontext2);
    getData = async () => {
        try {
            const value = await AsyncStorage.removeItem('token')


        } catch (e) {
            // error reading value
        }
    }

    return (
        <View style={styles.container}>
            <OfflineNotice />


            <Text>Manage Credit Cards</Text>




        </View>);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
});

export default ManageCreditCards;
