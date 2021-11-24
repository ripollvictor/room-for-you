import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { subirArchivo } from '../../src/database/helper.js'

const TestTime = () => {
    const [tiempo, setTiempo] = useState(0)

    const testSubirImagen = () => {
        console.time('test')
        let x = 0
        for (let i = 0; i < 100000000; i += 0.01) {
            x = i
        }
        console.timeEnd('test')
    }

    return(
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                padding: 10
            }}
        >
            <Pressable
                style={{
                    backgroundColor: 'blue',
                    padding: 10,
                    marginBottom: 10,
                    alignItems: 'center'
                }}
                onPress={() => { testSubirImagen() }}
            >
                <Text style={{color: 'white'}}>Probar subida de imágenes</Text>
            </Pressable>
        </View>
    )
}

export default TestTime