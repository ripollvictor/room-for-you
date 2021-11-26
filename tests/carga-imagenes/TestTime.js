import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { subirArchivo } from '../../src/database/helper.js'

const TestTime = () => {

    const testSubirImagen = async () => {
        console.time('test')
        await subirArchivo()
        console.timeEnd('test')
    }

    const testPNG = async () => {
        const t0 = performance.now()
        await subirArchivo(require('./examples/prueba_PNG_S.png'))
        const t1 = performance.now()

        console.log((t1 - t0) / 1000 + ' s')
        // console.time('Test PNG Small ~500KB')
        // await subirArchivo('./examples/prueba_PNG_S.png')
        // console.timeEnd('Test PNG Small ~500KB')

        // console.time('Test PNG Medium ~2MB')
        // await subirArchivo('./examples/prueba_PNG_M.png')
        // console.timeEnd('Test PNG Medium ~2MB')

        // console.time('Test PNG Large ~6MB')
        // await subirArchivo('./examples/prueba_PNG_L.png')
        // console.timeEnd('Test PNG Large ~6MB')
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
                onPress={() => { testPNG() }}
            >
                <Text style={{color: 'white'}}>Probar subida de imágenes</Text>
            </Pressable>
        </View>
    )
}

export default TestTime