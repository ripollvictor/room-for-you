import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { MainNavigator } from './src/navigation/MainNavigator';
import { colors } from './src/styles/colors';

const App1 = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Ver Ofertas' component={ VerOfertasScreen } />
                <Stack.Screen name = "Pantalla Carga" component = {PantallaCargaScreen}
                options={{
                    headerShown: false
                  }}/>
                <Stack.Screen name="Inicio" component={ InicioScreen } />
                <Stack.Screen name="IniciarSesion" component={ IniciarSesionScreen } />
                <Stack.Screen name="RegistrarUsuario" component={ RegistrarUsuarioScreen } />
                <Stack.Screen name="RegistrarVivienda" component={ RegistrarViviendaScreen } />
                {/* <Stack.Screen name="VerVivienda" component={ VerViviendaScreen } /> */}
                <Stack.Screen name="ModificarVivienda" component={ ModificarVivienda} />
                <Stack.Screen name="RegistrarHabitacion" component={ RegistrarHabitacion} />
                <Stack.Screen name="Pruebas" component={ Pruebas} />
                <Stack.Screen name='PerfilUsuario' component={ PerfilUsuario } />
                <Stack.Screen name='AjustesUsuario' component={ AjustesUsuario } />
                <Stack.Screen name='Ver Ofertas' component={ VerOfertasScreen } />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const App = () => {
    return(
        <NavigationContainer theme={{...DefaultTheme, colors: {...DefaultTheme.colors, background: colors.gray}}}>
            <MainNavigator />
        </NavigationContainer>
    )
} 

export default App
