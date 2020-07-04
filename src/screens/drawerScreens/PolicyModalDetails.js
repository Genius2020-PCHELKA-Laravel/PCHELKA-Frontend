import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import FontBold from '../../components/FontBold';
import FontRegular from '../../components/FontRegular';
import FontLight from '../../components/FontLight';
import Spacer from '../../components/Spacer';
import { withNamespaces } from 'react-i18next';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const PolicyModalDetails = ({ navigation, t, reschedulePolicyModalDetails, setReschedulePolicyModalDetails }) => {

    return (
        <View style={{ marginTop: 0 }}>
            <Modal
                style={{ flex: 1, margin: 0 }}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={1200}
                animationOutTiming={600}
                avoidKeyboard={true}
                backdropColor='transparent'
                transparent={true}
                isVisible={reschedulePolicyModalDetails}
                hideModalContentWhileAnimating={false}
                coverScreen={true}
                onBackButtonPress={() => setReschedulePolicyModalDetails(false)}
                onSwipeComplete={() => setReschedulePolicyModalDetails(false)}
                swipeThreshold={200}
                swipeDirection="down"
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        style={{ position: "absolute", right: 0, padding: 15 }}
                        onPress={() => {
                            setReschedulePolicyModalDetails(!reschedulePolicyModalDetails);
                        }}>
                        <FontAwesome name="times" size={35} color="#7a7a7a" />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 0, marginTop: 60 }}>
                        <Spacer>
                            <FontBold value={t('reschedulepolicy')} mystyle={{ fontSize: 24, textAlign: "left", }} />
                        </Spacer>
                        <View style={styles.ourpolicycontainer}>
                            <AntDesign style={{ marginBottom: 5 }} name="warning" size={30} color="#d21404" />
                            <FontLight mystyle={{ fontSize: 16 }} value={t('ourpolicydoc')} />

                        </View>
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
                        <Spacer />
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ourpolicycontainer: {
        marginHorizontal: 18,
        marginBottom: 18,
        padding: 15,
        borderColor: '#7a7a7a',
        borderWidth: 0,
        shadowColor: '#7a7a7a',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        elevation: 2,
        shadowRadius: 10,
    },
});
export default withNamespaces()(PolicyModalDetails);