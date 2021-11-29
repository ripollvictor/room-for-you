import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { View, Text, Pressable } from 'react-native'
import { subirArchivo } from '../src/database/helper.js'
import * as ImagePicker from 'expo-image-picker'

const ElemLista = forwardRef(({title}, ref) => {

    const [time, setTime] = useState(0)

    useImperativeHandle(ref, () => {return({
        setTime
    })})

    return(
        <View
            style={{
                width: '100%',
                flexDirection: 'column',
                marginBottom: 10,
            }}
        >
            <Text style={{marginBottom: 10}}>{title}</Text>
            <Text>Tiempo en segundos: {time} s</Text>
        </View>
    )
})

const TestTime = () => {

    const fotoRef = useRef()
    const [uri, setUri] = useState('')
    const titles = [
        'PNG Large ~6MB',
        'PNG Medium ~2MB',
        'PNG Large ~500KB',
        'WebP Large ~6MB',
        'WebP Medium ~2MB',
        'WebP Small ~500KB',
    ]
    const title = 'Tipo de foto'

    const ejecutarTests = async () => {
        const t0 = performance.now()
        await subirArchivo(uri)

        fotoRef.current.setTime((performance.now() - t0) / 1000)
    }

    const seleccionarImagen = async () => {
        const respuesta = { status: false, image: null, base64: null }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            //aspect: [9, 16],
            quality: 1,
            base64: true,
        })

        if (result.cancelled) { return respuesta }

        respuesta.status = true
        respuesta.image = result.uri
        respuesta.base64 = result.base64

        // setImagenesSeleccionadas([...imagenesSeleccionadas, respuesta.image])
        setUri(respuesta.image)
    }

    return(
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: 10
            }}
        >
            <Pressable
                style={{
                    backgroundColor: 'lightgray',
                    padding: 10,
                    marginBottom: 10
                }}

                onPress={() => seleccionarImagen()}
            >
                <Text>Seleccionar foto</Text>
            </Pressable>

            <ElemLista ref={fotoRef} title={title} />

            <Pressable
                style={{
                    width: '100%',
                    backgroundColor: 'blue',
                    padding: 10,
                    marginBottom: 10,
                    alignItems: 'center'
                }}

                onPress={() => { ejecutarTests() }}
            >
                <Text style={{color: 'white'}}>Probar subida de imágenes</Text>
            </Pressable>
        </View>
    )
}

export default TestTime