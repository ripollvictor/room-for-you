import React from 'react';
import { LogBox } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { MainNavigator } from './src/navigation/MainNavigator';
import { colors } from './src/styles/colors';

import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

const App = () => {

    LogBox.ignoreLogs(['Setting a timer'])

    const [fontsLoaded] = useFonts({
        'nk57-monospace': require('./assets/fonts/nk57-monospace.ttf'),
        'nk57-monospace-bold': require('./assets/fonts/nk57-monospace_bold.ttf'),
        'millimetre': require('./assets/fonts/Millimetre-Regular.otf')
    })
    
    if (!fontsLoaded) return <AppLoading />

    return(
        <NavigationContainer theme={{...DefaultTheme, colors: {...DefaultTheme.colors, background: colors.gray}}}>
            <MainNavigator />
        </NavigationContainer>
    )
} 

export default App
