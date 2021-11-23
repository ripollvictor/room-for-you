import { screenStyles } from './styles'

import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native"
import { GetEmailFromCurrentUser, GetUserDataFromEmail , ModificarDatosUsuaio} from '../../database/helper'



const PerfilUsuario = ({navigation}) => {
  const email = GetEmailFromCurrentUser();
      
       

    return(
        <ScrollView>
                 <Text style={screenStyles.titleText}>
                    Perfil Usuario
                </Text>

            <View style={screenStyles.scrollview}>         
                <Button style={screenStyles.button} color='#177013'title="Modificar Datos" onPress={() =>  
                   GetUserDataFromEmail(email).then((result) =>{
                       console.log(result);
                    navigation.navigate('AjustesUsuario',result)
                   })
                    }/>
                <Button style={screenStyles.button} color='#177013'title="Cancelar" onPress={() => history.back()}/>
            </View>

        </ScrollView>
    )
}
export default PerfilUsuario