
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
export default class FontLight extends React.Component {
    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    useFonts(fontMap) {
        (async () => {
            await Font.loadAsync(fontMap);
            if (this.mounted) {
                this.setState({
                    fontsLoaded: true
                })
            }
        })();
    }
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: this.useFonts({
                'Comfortaa-Regular': require('../../assets/fonts/Comfortaa-Regular.ttf'),
                'Comfortaa-Bold': require('../../assets/fonts/Comfortaa-Bold.ttf'),
                'Comfortaa-Light': require('../../assets/fonts/Comfortaa-Light.ttf'),
            })
        };
    }


    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            return <Text style={this.props.mystyle}><Text style={styles.lightfont}>{this.props.value}</Text></Text>
        }
    }

}

const styles = StyleSheet.create({
    lightfont: {
        fontFamily: 'Comfortaa-Light'
    }
});
