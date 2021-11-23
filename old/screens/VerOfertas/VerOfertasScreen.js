import React, { useEffect, useState } from "react"
import { Pressable, View, Text } from "react-native"
import { Oferta } from "../../clases/Oferta"
import { OfertaContainer } from "../../components/OfertaContainer/OfertaContainer"
import { GetOfertas } from "../../database/helper"
import { screenStyles } from './styles'

const VerOfertasScreen = () => {

    // const [ofertas, setOfertas] = useState(new Array())

    // useEffect(() => {
    //     const get = async () => { probar a poner un if de si no está vacio no volver a hacer esta funcion
    //         const promise = GetOfertas()
    //         const res = await promise
    //         setOfertas(res)
    //     }
    //     get()
    // })

    const [ofertas, setOfertas] = useState([
        new Oferta(
            'alguien',
            'Avenida Blasco Ibañez 54',
            300,
            [
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F13786390295?alt=media&token=74355c42-05f2-4b25-931a-e52444f7d044',
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F58712746787?alt=media&token=158002c3-7111-4176-a6b1-ee17f000d2f2'
            ]
        ),
        new Oferta(
            'otro alguien',
            'Camino Moncada 13',
            200,
            [
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F13786390295?alt=media&token=74355c42-05f2-4b25-931a-e52444f7d044',
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F58712746787?alt=media&token=158002c3-7111-4176-a6b1-ee17f000d2f2',
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F13786390295?alt=media&token=74355c42-05f2-4b25-931a-e52444f7d044',
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F58712746787?alt=media&token=158002c3-7111-4176-a6b1-ee17f000d2f2'
            ]
        ),
        new Oferta(
            'otro alguien',
            'Camino Moncada 13',
            200,
            [
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F58712746787?alt=media&token=158002c3-7111-4176-a6b1-ee17f000d2f2',
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F58712746787?alt=media&token=158002c3-7111-4176-a6b1-ee17f000d2f2',
                'https://firebasestorage.googleapis.com/v0/b/room-for-you-87832.appspot.com/o/images%2F58712746787?alt=media&token=158002c3-7111-4176-a6b1-ee17f000d2f2',
            ]
        )
    ])

    const [currentOferta, setCurrentOferta] = useState(ofertas[0])
    const [indexImg, setIndexImg] = useState(0)

    const GetIndicators = () => {
        const res = new Array()
        if (currentOferta === undefined) return null

        for (let i = 0; i < currentOferta.imagenes.length; i++) {
            res.push(
                <View
                    style={{
                        backgroundColor: i == indexImg ? '#000' : 'rgba(0, 0, 0, 0.25)',
                        marginRight: i == currentOferta.imagenes.length - 1 ? 0 : 10,
                        width: 5,
                        height: 5,
                        borderRadius: 2.5 // La mitad de los lados
                    }}
                    key={i}
                />
            )
        }

        return res
    }

    const indicators = GetIndicators()

    // aqui se supone que va a ver por lo menos 2 ofertas
    const [controllers, setControllers] = useState({
        container1: ofertas[0],
        back1: false,
        container2: ofertas[1],
        back2: true
    })

    const [indexOferta, setIndexOferta] = useState(1)

    // Salta un error cuando se llega a la ultima oferta -> Faltaria volver a buscar ofertas y si no hay más ofertas mostrar una ventana de ya no hay más
    const Swipe = (lado) => {
        if (lado === 'der') {

        } else if (lado === 'izq') {

        }

        setIndexImg(0)
        if (controllers.back1) {
            setCurrentOferta(controllers.container1)
            setControllers({
                container1: ofertas[indexOferta],
                back1: false,
                container2: ofertas[indexOferta + 1],
                back2: true
            })
        } else {
            setCurrentOferta(controllers.container2)
            setControllers({
                container1: ofertas[indexOferta + 1],
                back1: true,
                container2: ofertas[indexOferta],
                back2: false
            })
        }

        setIndexOferta(indexOferta + 1)
    }


    return(
        <View style={screenStyles.container}>
            <View style={screenStyles.indicators}>{indicators}</View>

            <OfertaContainer oferta={controllers.container1} changeIndexImg={setIndexImg} swipeFunc={Swipe} back={controllers.back1} />
            <OfertaContainer oferta={controllers.container2} changeIndexImg={setIndexImg} swipeFunc={Swipe} back={controllers.back2} />

            <View style={screenStyles.containerButtons}>
                

            </View>
        </View>
    )
}

/**
 * Es la que contiene el indicador de imagenes, los botones y las ofertas container
 * Recordar que cuando se cambia de oferta hay que resetear los valores de los indices de las imagenes
 */
const VerOfertas2Screen = () => {
    const[indexImg, setIndexImg] = useState(0)
    const[indexOferta, setIndexOferta] = useState(0)
    const[ofertas, setOfertas] = useState([])
    const currentOferta = ofertas[indexOferta]

    // Coger todas las ofertas y guardarlas en un array
    const fillOfertas = async () => {
        const res = await GetOfertas()
        setOfertas(res)
    }

    useEffect(() => {
        fillOfertas()
    }, [])

    // Crear los indicadores
    const createIndicators = () => {
        if (ofertas.length === 0) { return null }

        const res = new Array()
        const imagenesCurrentOferta = ofertas[indexOferta].imagenes

        imagenesCurrentOferta.forEach((imagen, index) => {
            res.push(
                <View
                    style = {{
                        backgroundColor: index == indexImg ? '#000' : 'rgba(0, 0, 0, 0.25)',
                        marginRight: index == imagenesCurrentOferta.length - 1 ? 0 : 10,
                        width: 5,
                        height: 5,
                        borderRadius: 2.5 // La mitad de los lados
                    }}
                    key={index}
                />
            )
        })
        return res
    }

    const indicators = createIndicators()
    
    return(
        <View>
            {indicators}





            <Pressable onPress={() => {setIndexOferta(indexOferta + 1)}}>
                <Text>Pulsa</Text>
            </Pressable>
        </View>
    )
} 

export default VerOfertas2Screen