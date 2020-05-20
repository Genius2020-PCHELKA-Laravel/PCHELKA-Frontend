
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { withNamespaces } from 'react-i18next';
import FontBold from '../components/FontBold';
import { Context as AuthContext } from '../screens/context/AuthContext';
const LoginButton = ({ t }) => {
    const { state, logout } = useContext(AuthContext);
    return (<TouchableOpacity onPress={() => { logout(); }}>
        {/* <FontBold mystyle={styles.topButtonStyle} value={t('logout')}></FontBold> */}
        <Text style={styles.topButtonStyle}>
            {t('logout')} <FontAwesome5 name="user" size={18} color="#161924" />
        </Text>
    </TouchableOpacity>)
};

const styles = StyleSheet.create({
    topButtonStyle: {
        padding: 5,
        //backgroundColor:'#DAA520',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DAA520',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "500",
        right: 15
    },
});

export default withNamespaces()(LoginButton);