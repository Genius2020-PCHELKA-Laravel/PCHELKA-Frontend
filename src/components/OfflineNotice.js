import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import FontBold from '../components/FontBold';
import i18n from '../locales/i18n';
const { width } = Dimensions.get('window');
function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <FontBold value={i18n.t('noconnection')} mystyle={styles.offlineText} />
        </View>
    );
}
function MiniOnlineSign() {
    return (
        <View style={styles.onlineContainer}>
            <FontBold value={i18n.t('noconnection')} mystyle={styles.onlineText} />
        </View>
    );
}
class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    };
    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }
    componentDidMount() {
        NetInfo.addEventListener((state) => { this.setState({ isConnected: state.isConnected }) });
    }
    componentWillUnmount() {
        // NetInfo.removeEventListener();
    }
    render() {
        if (!this.state.isConnected) {
            return <MiniOfflineSign />;
        }
        else {
            setTimeout(() => {
                return <MiniOnlineSign />
            }, 3000);
        }
        return null;
    }
}
const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        bottom: 0
    },
    offlineText: {
        color: '#fff'
    },
    onlineContainer: {
        backgroundColor: 'green',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        bottom: 0
    },
    onlineText: {
        color: '#fff'
    },
});
export default OfflineNotice;