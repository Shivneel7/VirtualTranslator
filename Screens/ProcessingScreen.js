import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native'
import axios from 'axios'

export default function ProcessingScreen({ route, navigation }) {
  useEffect(() => {
    axios
      .post('http://10.0.0.0:5000/translate', {
        base64: route.params.base64,
        type: route.params.type,
      })
      .then((res) => {
        navigation.navigate('TranslatedText', {
          detectedTexts: res.data.detectedTexts,
          translatedTexts: res.data.translatedTexts,
          image: route.params.image,
          imageWithBoxes: res.data.imageWithBoxes,
        })
      })
      .catch((err) => {
        console.log(err.response.data)

        Alert.alert(
          "Processing Error",
          err.response.data,
          [
            { text: "Try Again", onPress: () => navigation.navigate('Home') }
          ]
        );
      })

  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#E69F00' />
      <Text style={styles.text}>Processing, translating, and drawing...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 15,
    fontSize: 18,
  },
})
