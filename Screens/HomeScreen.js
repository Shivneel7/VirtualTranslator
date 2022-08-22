import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import TextBox from '../components/Message'
import Logo from '../components/Logo'
import CustomButton from '../components/CustomButton'

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Logo />
        <TextBox />
        <View style={styles.buttonContainer}>
          <CustomButton buttonName='Camera' iconName='camera' onPress={() => navigation.navigate('Camera')} />
          <CustomButton buttonName='Upload' iconName='upload' onPress={() => navigation.navigate('Upload')} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  subContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})