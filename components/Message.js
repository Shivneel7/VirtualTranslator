import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Message extends React.Component {
    render() {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.box}>
                    <Text style={stylesheet.content}>
                        Welcome to PocketTranslator!{"\n\n"}
                        To translate any language to English, you could do the following:{"\n\n"}
                        {'\u2022'} Press the 'Camera' button (bottom left){"\n\n"}
                        {'\u2022'} Press the 'Upload' button (bottom right)
                    </Text>
                </View>
            </View>
        );
    }
}

const stylesheet = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    box: {
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 1,
        shadowColor: '#BFAFB2',
        paddingHorizontal: 13,
        paddingVertical: 25
    },
    content: {
        fontWeight: 'bold',
        fontSize: 14,
    }
})