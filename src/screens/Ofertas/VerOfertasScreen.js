import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Indicator } from '../../components/elements/Indicator'
import { colors } from '../../styles/colors'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'
import { OfertaDB } from '../../database/OfertaDB'
import { GetOfertas } from '../../database/helper'

const VerOfertasScreen = () => {

    const [indexFotoActual, setIndexFotoActual] = useState(0)
    const [indexOfertaActual, setOfertaActual] = useState(0)
    const [ofertas, setOfertas] = useState([new OfertaDB()])

    useEffect(() => {
        updateOfertas()
    }, [])

    useEffect(() => {

    }, [ofertas])

    // Cuando se actualiza la oferta que se ve hay que cambiar siempre el indice de la foto actual a 0
    useEffect(() => {
        setIndexFotoActual(0)
    }, [indexOfertaActual])

    const updateOfertas = async () => {
        const res = await GetOfertas()
        setOfertas(res)
    }

    const GetIndicators = () => {
        
        let res = []

        ofertas[indexOfertaActual].imagenes.forEach((imagen, index) => {

            let marginR = 0

            if (index !== ofertas[indexOfertaActual].imagenes.length - 1) marginR = 10

            if (indexFotoActual === index)
                res.push(<Indicator actual key={index} marginRight={marginR} />)
            else
                res.push(<Indicator key={index} marginRight={marginR} />)
        })

        return res
    }

    const indicadores = GetIndicators()

    return(
        <View style={[global.default, {paddingTop: 71}]}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                {indicadores}
            </View>
            <Pressable onPress={() => {setOfertaActual(0)}}><Text>Prueba</Text></Pressable>
            <Pressable onPress={() => {setIndexFotoActual(1)}}><Text>Prueba</Text></Pressable>
        </View>
    )
}

export default VerOfertasScreen