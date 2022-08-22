import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, Modal, TouchableOpacity, Image } from 'react-native'
import { Text } from '@rneui/themed'
//source for pinch zoom on images in a Modal: https://www.npmjs.com/package/react-native-image-zoom-viewer
import ImageViewer from 'react-native-image-zoom-viewer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TranslatedTextScreen({ route }) {
  const images = [{ url: `data:image/png;base64,${route.params.imageWithBoxes}`, }, { url: route.params.image, }]
  const [modalVisible, setModalVisible] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  // source for icons: https://oblador.github.io/react-native-vector-icons/
  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)} animationType={'slide'}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <MaterialIcons name='keyboard-arrow-down' size={20} color='#FFFFFF' style={styles.icon} />
              <Text style={styles.button_text}>More Info</Text>
            </TouchableOpacity>
          </View>
          <ImageViewer
            imageUrls={images}
            backgroundColor='white'
            swipeDownThreshold={75}
            enableSwipeDown={true}
            onSwipeDown={() => setModalVisible(false)}
            renderArrowRight={() => <Text style={styles.rightArrow}>{imageIndex == 1 ? '' : <Ionicons name='arrow-forward-circle-outline' size={45} color='black' />}</Text>}
            renderArrowLeft={() => <Text style={styles.leftArrow}>{imageIndex == 0 ? '' : <Ionicons name='arrow-back-circle-outline' size={45} color='black' />}</Text>}
            onChange={(index) => setImageIndex(index)}
          />
        </Modal>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Translation</Text>
            </View>
            <View style={styles.image_content}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                activeOpacity={.9}>
                <Image
                  style={[styles.cardImage]}
                  resizeMode='contain'
                  source={{
                    uri: `data:image/png;base64,${route.params.imageWithBoxes}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Translated Text to English</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{route.params.translatedTexts[0]}</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.titleText}>
                Detected {route.params.translatedTexts[1]} Text
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{route.params.detectedTexts}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 22,
  },
  text: {
    fontSize: 18,
  },
  buttonContainer: {
    paddingTop: 10,
    backgroundColor: '#0072B2'
  },
  button: {
    flexDirection: 'row',
    paddingTop: 22,
    backgroundColor: '#0072B2',
    marginLeft: 15,
    marginBottom: 10
  },
  button_text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  leftArrow: {
    marginLeft: 5
  },
  rightArrow: {
    marginRight: 5
  },
  image_header: {
    fontSize: 30,
    color: "black",
    textAlign: 'center'
  },
  image_header2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 38,
    alignItems: 'center',
  },
  image_header_text: {
    fontSize: 50,
    color: "black"
  },
  icon: {
    marginTop: 3
  },
  card: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowColor: '#BFAFB2',
    paddingHorizontal: 13,
    paddingVertical: 18,
    marginVertical: 15
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    width: '100%',
    paddingBottom: 10
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '500'
  },
  content: {
    padding: 10,
    marginTop: 15,
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  cardImage: {
    flex: 1,
    aspectRatio: 1,
    minHeight: 300,
    maxWidth: 335,
    maxHeight: 600,
    height: undefined,
    width: 335,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  image_content: {
    flex: 1,
    paddingTop: 10
  }
})
