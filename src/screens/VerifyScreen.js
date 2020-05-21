import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from './context/AuthContext';
import FontBold from '../components/FontBold';
import FontLight from '../components/FontLight';
import FontRegular from '../components/FontRegular';
import Spacer from '../components/Spacer';
import Timer from '../components/Timer';
import OtpInputs from "react-native-otp-inputs";
import Axios from '../api/axiosapi';
const VerifyScreen = ({ navigation }) => {
    const { mobile, otp } = navigation.state.params;
    const { state, verifysms } = useContext(AuthContext);

    return (<>
        <View style={styles.container}>
            <Spacer>
                <FontBold mystyle={styles.mobileText} value="Enter The Code That Was Sent To: "></FontBold>
            </Spacer>
            <Spacer>
                <FontBold mystyle={styles.mobileText} value={mobile}></FontBold>
                <FontBold mystyle={styles.mobileText} value={otp}></FontBold>
            </Spacer>
            <OtpInputs
                //handleChange={code => console.log(code)}
                handleChange={(enteredotp) => { if (enteredotp === otp) { verifysms({ mobile: mobile, enteredotp: enteredotp, otp: otp }); navigation.navigate('Register'); } else console.log(enteredotp); }}
                numberOfInputs={4}
                inputStyles={styles.input}
            />
            <Spacer>
                <FontBold mystyle={styles.mobileText} value={'Resend Code in: '}></FontBold>
            </Spacer>
            <Timer></Timer>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileText: { marginTop: 0, fontSize: 30, fontFamily: 'Comfortaa-Bold' },
    Textss: { fontSize: 12, paddingRight: 280 },
    input: {
        margin: 10,
        height: 60,
        width: 60,
        borderColor: '#f1c40f',
        borderRadius: 15,
        borderWidth: 2,
        fontSize: 26,
        // backgroundColor: '#DAA520',
        textAlign: 'center',
    },
    phoneParts: {
        flexDirection: 'row'
    },
    red: {
        backgroundColor: 'red'
    }
});

export default VerifyScreen;