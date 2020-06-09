import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
import Spacer from '../../components/Spacer';
import { withNamespaces } from 'react-i18next';
const ReschedulePolicyScreen = ({ navigation, t }) => {

    return (
        <View style={styles.container}>
            <Spacer />
            <Spacer>
                <FontBold value={t('reschedulepolicy')} mystyle={{ fontSize: 24, textAlign: "left", }} />
            </Spacer>
            <Spacer />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('type')} mystyle={{ color: "blue", fontSize: 18, textAlign: "left", }} />
                </View>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('reschedulefee')} mystyle={{ color: "blue", fontSize: 18, textAlign: "left", }} />
                </View>
            </View>
            <Spacer>
                <View style={{ borderBottomColor: "#f5c500", borderBottomWidth: 1 }} />
            </Spacer>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('tenminafterplacing')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('freeofcharge')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
            </View>

            <Spacer>
                <View style={{ borderBottomColor: "#f5c500", borderBottomWidth: 1 }} />
            </Spacer>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('12beforeappoitment')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('freeofcharge')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
            </View>

            <Spacer>
                <View style={{ borderBottomColor: "#f5c500", borderBottomWidth: 1 }} />
            </Spacer>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('122beforeappoitment')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('freeofcharge')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
            </View>

            <Spacer>
                <View style={{ borderBottomColor: "#f5c500", borderBottomWidth: 1 }} />
            </Spacer>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('2hbeforeappoitment')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('twentyfivepercent')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
            </View>

            <Spacer>
                <View style={{ borderBottomColor: "#f5c500", borderBottomWidth: 1 }} />
            </Spacer>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('missedappoitment')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
                <View style={{ flexDirection: "column", width: "40%" }}>
                    <FontBold value={t('onehandredpercent')} mystyle={{ fontSize: 16, textAlign: "left", }} />
                </View>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

});
export default withNamespaces()(ReschedulePolicyScreen);