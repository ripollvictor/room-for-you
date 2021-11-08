import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from './screens/Inicio/InicioScreen';
import IniciarSesionScreen from './screens/IniciarSesion/IniciarSesionScreen'
import RegistrarUsuarioScreen from './screens/RegistrarUsuario/RegistrarUsuarioScreen';
import RegistrarViviendaScreen from './screens/RegistrarVivienda/RegistrarViviendaScreen';
import VerViviendaScreen from './screens/VerViviendas/VerViviendaScreen';


const App = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="RegistrarVivienda" component={RegistrarViviendaScreen} />
                <Stack.Screen name="Inicio" component={InicioScreen} />
                <Stack.Screen name="IniciarSesion" component={IniciarSesionScreen} />
                <Stack.Screen name="RegistrarUsuario" component={RegistrarUsuarioScreen} />
                <Stack.Screen name="VerVivienda" component={VerViviendaScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
