import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FontRegular from '../../components/FontRegular';
import { Context as HCContext } from '../../screens/context/HCContext';
import { ScrollView } from 'react-native-gesture-handler';
// import Liqpay from '../Liqpay';
import { withNamespaces } from 'react-i18next';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { navigate } from '../../navigationRef';

const BookedScreen = ({ children, t }) => {
    const { dispatch, state: hcstate } = useContext(HCContext);

    return (
        <View style={styles.container}>
            <Spacer>
                <FontBold value={t('thankyouforyourorder')} mystyle={{ textAlign: "center", fontSize: 20 }} />
            </Spacer>
            <Spacer>
                <FontLight value={t('booked')} mystyle={{ textAlign: "center", color: 'gray', fontSize: 20 }} />
            </Spacer>
            <View style={styles.imagecontainer} >
                <Image style={styles.image} source={require('../../../assets/correct.png')} />
            </View>
            <TouchableOpacity onPress={() => { navigate('HomeNavigator') }}>
                <Spacer>
                    <FontBold
                        value={t('homepage')}
                        mystyle={{
                            textDecorationLine: 'underline',
                            textDecorationStyle: "solid",
                            textDecorationColor: "blue",
                            textAlign: "center",
                            fontSize: 12,
                            color: 'blue'
                        }} />
                </Spacer>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    imagecontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: 75,
        height: 75,
        borderColor: "#fff",
        opacity: 1,
    },
});

export default withNamespaces()(BookedScreen);