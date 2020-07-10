import React from 'react';

//Import all required component
import { StyleSheet, View, Modal, ActivityIndicator, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { fontNormalize, Normalize } from './actuatedNormalize';
const Loader = props => {
    const { loading, ...attributes } = props;
    componentDidMount = () => {
        this.mounted = true;
    }
    componentWillUnmount = () => {
        this.mounted = false;
    }
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View style={styles.modalBackground}>
                <Image style={styles.activityIndicatorWrapper} source={require('../../assets/spin.gif')} />
                {/* <ActivityIndicator color='#ff9800' animating={loading} /> */}
            </View>
        </Modal>
    );
};
export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: Normalize(100),
        width: Normalize(100),
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

});