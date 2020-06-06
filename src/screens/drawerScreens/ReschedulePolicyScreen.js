import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';

const ReschedulePolicyScreen = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <Text>ReschedulePolicyScreen</Text>
        </View>
    );

}
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
export default ReschedulePolicyScreen;