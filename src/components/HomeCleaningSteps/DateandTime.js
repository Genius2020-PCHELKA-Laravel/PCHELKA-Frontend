import React from 'react';
import { View, StyleSheet } from 'react-native';

const DateandTime = ({ children }) => {
    return <View style={styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({
    spacer: {
        margin: 10
    }
});

export default DateandTime;