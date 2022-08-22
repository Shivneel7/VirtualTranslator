import * as React from 'react'
import { HeaderBackButton } from '@react-navigation/elements'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './Screens/HomeScreen'
import CameraScreen from './Screens/CameraScreen'
import UploadScreen from './Screens/UploadScreen'
import ProcessingScreen from './Screens/ProcessingScreen'
import TranslatedTextScreen from './Screens/TranslatedTextScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'PocketTranslator', headerStyle: { backgroundColor: '#0072B2' }, headerTintColor: '#FFFFFF'}}
        />
        <Stack.Screen
          name='Camera'
          component={CameraScreen}
          options={{ title: 'PocketTranslator', headerStyle: { backgroundColor: '#0072B2' }, headerTintColor: '#FFFFFF' }}
        />
        <Stack.Screen
          name='Upload'
          component={UploadScreen}
          options={{ title: 'PocketTranslator', headerStyle: { backgroundColor: '#0072B2' }, headerTintColor: '#FFFFFF' }}
        />
        <Stack.Screen
          name='Processing'
          component={ProcessingScreen}
          options={{
            title: 'PocketTranslator',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name='TranslatedText'
          component={TranslatedTextScreen}

          options={({ navigation }) => ({
            title: 'PocketTranslator',
            gestureEnabled: false,
            headerStyle: { backgroundColor: '#0072B2' }, 
            headerTintColor: '#FFFFFF',
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => navigation.navigate('Home')}
                label='Home'
                labelVisible={true}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App