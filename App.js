import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import screens from './screens/IndiceScreens';


const App = () => {

    const Stack = createNativeStackNavigator()

    return(
        <NavigationContainer>
            <Stack.Navigator>
                {
                    Object.keys(screens).map((key) => {
                        return <Stack.Screen name={ screens[key].name } component={ screens[key] } />
                    })
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
