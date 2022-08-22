import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

// source for icons: https://oblador.github.io/react-native-vector-icons/
export default function CustomButton({ buttonName, onPress, iconName }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={stylesheet.button}>
                <Entypo name={iconName} size={35} color='#FFFFFF' />
                <Text style={stylesheet.content}>{buttonName}</Text>
            </View>
        </TouchableOpacity>
    );
}

const stylesheet = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#0072B2',
        borderRadius: 25,
        padding: 18
    },
    content: {
        alignSelf: 'center',
        fontSize: 21,
        marginLeft: 10,
        color: '#FFFFFF',
        fontWeight: '700',
    }
})