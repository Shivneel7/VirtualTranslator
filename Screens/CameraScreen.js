import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera } from 'expo-camera'
import { Entypo, MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [base64, setBase64] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)

  useEffect(() => {
    // source for camera permission: https://docs.expo.dev/versions/latest/sdk/camera/
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const takePicture = async () => {
    if (!camera) return
    let photo = await camera.takePictureAsync({ base64: true })

    setBase64(photo.base64)
    setImage(photo.uri)
  }

  const toggleFlash = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    )
  }

  const toggleFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  const retakePicture = () => {
    setImage(null)
  }

  const translatePicture = () => {
    navigation.navigate('Processing', { base64, image })
  }

  cameraState = {
    visible: true
  }

  // source for icons: https://oblador.github.io/react-native-vector-icons/
  function cameraRender() {
    if (image !== null) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleFlash}>
            <View style={styles.icon}>
              <Entypo name='flash' size={30} color='#000000' />
            </View>
            <Text style={styles.text}>
              Flash is{' '}
              {flash === Camera.Constants.FlashMode.off ? 'off' : 'on'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleFlip}>
            <View style={styles.icon}>
              <MaterialIcons name='flip-camera-android' size={30} color='#000000' />
            </View>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  return (
    <View style={styles.container}>
      {image ? (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.subContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={retakePicture}>
                <View style={styles.icon}>
                  <Entypo name='camera' size={30} color='#000000' />
                </View>
                <Text style={styles.text}>Retake</Text>
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
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={(ref) => {
              setCamera(ref)
            }}
          >
            <View style={styles.captureButtonContainer}>

            </View>
          </Camera>
          <View style={styles.subContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleFlash}>
                <View style={styles.icon}>
                  <Entypo name='flash' size={30} color='#000000' />
                </View>
                <Text style={styles.textFlash}>
                  Flash:{' '}
                  {flash === Camera.Constants.FlashMode.off ? 'Off' : 'On'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              ></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={toggleFlip}>
                <View style={styles.icon}>
                  <MaterialIcons name='flip-camera-android' size={30} color='#000000' />
                </View>
                <Text style={styles.textFlip}>Flip</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      )}
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
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 10
  },
  button: {
    marginBottom: 10,
    margin: 5,
    alignSelf: 'center',
    borderRadius: 40,
    borderColor: '#0072B2',
    borderWidth: 2,
    width: 80,
    height: 80,
    padding: 10,

    // backgroundColor: 'rgba(86, 180, 233, 0.3)',
    // backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundColor: 'transparent'
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
    marginBottom: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#00324e',
    backgroundColor: 'white',
    borderColor: '#0072B2',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginTop: 3,
    marginLeft: 8,
  },
  textFlip: {
    fontSize: 17,
    color: '#000000',
    marginTop: 3,
    marginLeft: 18
  },
  textFlash: {
    flexDirection: 'row',
    fontSize: 15,
    marginTop: 3,
    marginLeft: 1,
    color: '#000000',
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
