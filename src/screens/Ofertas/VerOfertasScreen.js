import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, Alert, Animated } from 'react-native'
import { Indicator } from '../../components/elements/Indicator'
import { colors } from '../../styles/colors'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'
import { OfertaDB } from '../../database/OfertaDB'
import { GetOfertas } from '../../database/helper'
import { ButtonImgShadow } from '../../components/elements/Button'
import { OfertaContainer } from '../../components/elements/OfertaContainer'

const VerOfertasScreen = () => {

    const [indexFotoActual, setIndexFotoActual] = useState(0)
    const [indexOfertaActual, setOfertaActual] = useState(0)
    const [ofertas, setOfertas] = useState([new OfertaDB()])
    
    const [currentColor, setCurrentColor] = useState(colors.secondary)

    const opacityAnim = useRef(new Animated.Value(0)).current

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

    const NextImg = () => { if (indexFotoActual !== ofertas[indexOfertaActual].imagenes.length - 1) setIndexFotoActual(indexFotoActual + 1) }
    const PrevImg = () => { if (indexFotoActual !== 0) setIndexFotoActual(indexFotoActual - 1) }

    const indicadores = GetIndicators()






    const NotFav = () => {

    }

    const AddFav = () => {

    }

    return(
        <View style={[global.default, {paddingTop: 71}]}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 42
                }}
            >
                {indicadores}
            </View>

            <OfertaContainer 
                color={currentColor} alpha={opacityAnim}
            />

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 100,
                left: 0,
                right: 0,
                paddingHorizontal: variables.spaceHorizontal,
                zIndex: 10
            }}>
                <ButtonImgShadow
                    imgSource={require('../../../assets/ofertas/triste.png')} 
                    widthContianer={77}
                    heightContianer={55}
                    widthImg={42}
                    heightImg={42}
                    backgroundColor={colors.primary}
                    func={() => {NotFav()}}
                    marginRight={variables.spaceBetweenElems}
                />
                <ButtonImgShadow
                    imgSource={require('../../../assets/ofertas/zoom.png')} 
                    widthContianer={77}
                    heightContianer={55}
                    widthImg={42}
                    heightImg={42}
                    backgroundColor={colors.white}
                    func={() => {}}
                    marginRight={variables.spaceBetweenElems}
                />
                <ButtonImgShadow
                    imgSource={require('../../../assets/ofertas/contento.png')} 
                    widthContianer={77}
                    heightContianer={55}
                    widthImg={42}
                    heightImg={42}
                    backgroundColor={colors.secondary}
                    func={() => {AddFav()}}
                />
            </View>

        </View>
    )
}

export default VerOfertasScreen