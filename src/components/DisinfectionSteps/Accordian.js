import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontBold from '../FontBold';
import FontRegular from '../FontRegular';
import FontLight from '../FontLight';
import { Normalize, fontNormalize } from '../actuatedNormalize';

export default class Accordian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View>
                <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
                    <View style={{ flexDirection: "column", flex: 0.9 }}>
                        <FontBold value={this.props.title} mystyle={styles.title} />
                    </View>
                    <View style={{ flexDirection: "column", flex: 0.1 }}>
                        <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={Normalize(30)} color='darkgray' />
                    </View>
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <FontRegular value={this.props.data} />
                    </View>
                }

            </View>
        )
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: fontNormalize(14),
        color: '#000',
        flexWrap: "wrap"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Normalize(56),
        paddingLeft: Normalize(25),
        paddingRight: Normalize(18),
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    parentHr: {
        height: 1,
        color: "#fff",
        width: '100%'
    },
    child: {
        backgroundColor: '#fff',
        padding: Normalize(16),
    }

});