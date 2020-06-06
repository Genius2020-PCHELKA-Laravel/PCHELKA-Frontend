import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import FontBold from "../../components/FontBold";
import FontRegular from "../../components/FontRegular";
import FontLight from "../../components/FontLight";
import { withNamespaces } from 'react-i18next';
import { navigate } from '../../navigationRef';

const HCRescheduleScreen = ({ navigation, t }) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.policybuttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                    navigate('ReschedulePolicy');
                }}>
                <FontBold mystyle={styles.buttonTextStyle} value={t('ReschedulePolicy')} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    policybuttonStyle: {
        position: 'absolute',
        bottom: 15,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#7a7a7a',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: '#7a7a7a',
        paddingVertical: 10,
        fontSize: 22,
    },
});
export default withNamespaces()(HCRescheduleScreen);