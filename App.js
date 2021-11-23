import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from './screens/Inicio/InicioScreen';
import IniciarSesionScreen from './screens/IniciarSesion/IniciarSesionScreen'
import RegistrarUsuarioScreen from './screens/RegistrarUsuario/RegistrarUsuarioScreen';
import RegistrarViviendaScreen from './screens/RegistrarVivienda/RegistrarViviendaScreen';
//import VerViviendaScreen from './screens/VerViviendas/VerViviendaScreen';
import ModificarVivienda from './screens/ModificarVivienda/ModificarVivienda';
import RegistrarHabitacion from './screens/RegistrarHabitacion/RegistrarHabitacionScreen';
import Pruebas from './screens/Pruebas/PruebasScreen';
import VerOfertasScreen from './screens/VerOfertas/VerOfertasScreen';
import VerViviendaScreen from './screens/VerViviendas/VerViviendaScreen';
import PantallaCargaScreen from './screens/PantallaCarga/PantallaCargaScreen';
import { ScreenStack } from 'react-native-screens';

import PerfilUsuario from './screens/PerfilUsuario/PerfilUsuarioScreen';
import AjustesUsuario from './screens/AjustesUsuario/AjustesUsuaioScreen';

const App = () => {

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

export default App
