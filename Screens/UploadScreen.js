import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Entypo, MaterialIcons } from '@expo/vector-icons';

export default function UploadScreen({ navigation, error = false }) {
  const [image, setImage] = useState(null)
  const [base64, setBase64] = useState(null)

  useEffect(() => {
    (async () => {
      // source for opening device's gallery: https://docs.expo.dev/versions/latest/sdk/imagepicker/
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        base64: true,
      })

      if (!result.cancelled) {
        setImage(result.uri)
        setBase64(result.base64)
      } else {
        navigation.goBack()
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    })

    if (!result.cancelled) {
      setImage(result.uri)
      setBase64(result.base64)
    }
  }

  const repickPicture = () => {
    pickImage()
  }

  const translatePicture = () => {
    navigation.navigate('Processing', { base64, image })
  }

  // source for icons: https://oblador.github.io/react-native-vector-icons/
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode='contain'
        />
        <View style={styles.subContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={repickPicture}>
              <View style={styles.icon}>
                <Entypo name='upload' size={30} />
              </View>
              <Text style={styles.text}>{image ? 'Reupload' : 'Upload'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={translatePicture}>
              <View style={styles.icon}>
                <MaterialIcons name='translate' size={30} />
              </View>
              <Text style={styles.textTranslate}>Translate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  subContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    marginBottom: 10,
    alignSelf: 'flex-end',
    margin: 5,
    alignSelf: 'center',
    borderRadius: 40,
    borderColor: '#00324e',
    borderWidth: 2,
    width: 80,
    height: 80,
    padding: 10,
  },
  captureButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginTop: 3,
    marginLeft: 2,
  },
  textTranslate: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 3,
  },
  icon: {
    alignSelf: 'center'
  }
})
