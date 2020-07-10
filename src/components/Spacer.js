
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Normalize } from './actuatedNormalize';

const Spacer = ({ children }) => {
    return <View style={styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({
    spacer: {
        margin: Normalize(10)
    }
});

export default Spacer;