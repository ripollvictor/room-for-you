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

    const Swipe = (lado) => {
        if (lado === 'der') {

        } else if (lado === 'izq') {

        }

        setIndexImg(0)
        if (controllers.back1) {
            setCurrentOferta(controllers.container1)
            setControllers({
                container1: currentOferta,
                back1: false,
                container2: ofertas[1], // esto tendría que ir cambiando por un indice adicional para saber en que posición del array se encuentra de todas las ofertas
                back2: true
            })
        } else {
            setCurrentOferta(controllers.container2)
            setControllers({  
                container1: ofertas[0],
                back1: true,
                container2: currentOferta,
                back2: false
            })
        }
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

export default VerOfertasScreen