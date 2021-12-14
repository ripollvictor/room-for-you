import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, Alert, Animated, PanResponder, Dimensions } from 'react-native'
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
    const rotationAnim = useRef(new Animated.Value(0)).current
    const pan = useRef(new Animated.ValueXY()).current

    const rotation = rotationAnim.interpolate({
        inputRange: [-300, 300],
        outputRange: ['-20deg', '20deg']
    })
    const opacity = opacityAnim.interpolate({
        inputRange: [0, 300],
        outputRange: [0, 0.5]
    })

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            if (gesture.dx < 0) { setCurrentColor(colors.primary) }
                else { setCurrentColor(colors.secondary) }
            pan.x.setValue(gesture.dx)
            pan.y.setValue(0)
            rotationAnim.setValue(gesture.dx)
            opacityAnim.setValue(Math.abs(gesture.dx))
        },
        onPanResponderRelease: (_, gesture) => {

            if (gesture.dx === 0 && gesture.dy === 0) {
                // se ha clickado

                if (gesture.x0 > Dimensions.get('screen').width / 2) { NextImg() }
                else { PrevImg() }

            } else if (gesture.dx > Dimensions.get('screen').width / 2) {
                // derecha
                
                

            } else if (Math.abs(gesture.dx) > Dimensions.get('screen').width / 2) {
                // izquierda



            } else {
                Animated.spring(
                    pan,
                    {toValue: {x: 0, y: 0}, useNativeDriver: false}
                ).start()
                Animated.spring(
                    rotationAnim,
                    {toValue: 0, useNativeDriver: false}
                ).start()
                Animated.spring(
                    opacityAnim,
                    {toValue: 0, useNativeDriver: false}
                ).start()
            }
        }
    })

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
        console.log(Object.keys(pan.y))
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
                direccion={ofertas[indexOfertaActual].direccion}
                precio={ofertas[indexOfertaActual].precio}
                color={currentColor} alpha={opacity} rotation={rotation}
                imagenURL={ofertas[indexOfertaActual].imagenes[indexFotoActual]}
                panController={panResponder.panHandlers}
                panLayout={pan.getLayout()}
            />

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 100,
                left: 0,
                right: 0,
                paddingHorizontal: variables.spaceHorizontal,
                zIndex: 10,
                
            }}>
                <ButtonImgShadow
                    imgSource={require('../../../assets/ofertas/triste.png')} 
                    widthContianer={77}
                    heightContianer={55}
                    widthImg={42}
                    heightImg={42}
                    backgroundColor={colors.primary}
                    func={() => {PrevImg()}}
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