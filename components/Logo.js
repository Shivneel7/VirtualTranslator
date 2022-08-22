import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class Logo extends React.Component {
    render() {
        return (
            <View style={stylesheet.container}>
                <Image style={stylesheet.image} source={require('../assets/pt_logo.png')} />
            </View>
        );
    }
}

const stylesheet = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: 25
    },
    image: {
        width: 175,
        height: 175
    }
})