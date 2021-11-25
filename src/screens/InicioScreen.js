import React from 'react'
import { View, Pressable, Text, Image } from 'react-native'

const InicioScreen = ({navigation}) => {
    return(
        <View>
            <Pressable onPress={() => {navigation.navigate('Registrar 1')}}>
                <Text>Pulsa</Text>
            </Pressable>
        </View>
    )
}

export default InicioScreen