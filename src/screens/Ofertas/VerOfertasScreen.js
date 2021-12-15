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

    const [imgsLength, setImgsLength] = useState(0)

    const [indexFotoActual, setIndexFotoActual] = useState(0)
    const [indexOfertaActual, setIndexOfertaActual] = useState(0)
    const [ofertas, setOfertas] = useState([new OfertaDB()])

    const [indexZ1, setIndexZ1] = useState(3)
    const [indexZ2, setIndexZ2] = useState(2)
    const [indexZ3, setIndexZ3] = useState(1)

    const [oferta1, setOferta1] = useState(new OfertaDB())
    const [oferta2, setOferta2] = useState(new OfertaDB())
    const [oferta3, setOferta3] = useState(new OfertaDB())
    
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
                
                AddFav()

            } else if (Math.abs(gesture.dx) > Dimensions.get('screen').width / 2) {
                // izquierda

                NotFav()

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

    const [panController1, setPanController1] = useState(panResponder)
    const [panController2, setPanController2] = useState({})
    const [panController3, setPanController3] = useState({})

    const [pan1, setPan1] = useState(pan)
    const [pan2, setPan2] = useState({getLayout: () => {}})
    const [pan3, setPan3] = useState({getLayout: () => {}})

    const [opacityController1, setOpacityController1] = useState(opacity)
    const [opacityController2, setOpacityController2] = useState(0)
    const [opacityController3, setOpacityController3] = useState(0)

    const [rotationController1, setRotationController1] = useState(rotation)
    const [rotationController2, setRotationController2] = useState('0deg')
    const [rotationController3, setRotationController3] = useState('0deg')

    useEffect(() => {
        updateOfertas()
    }, [])

    useEffect(() => {
        // comprueba si hay un cambio que no sea la primera ejecución y solo entrará en el if cuando la base de datos devuelva las ofertas
        if (ofertas[0].id !== undefined && ofertas.length > 1) {

            // la primera vez obviamente tiene que guardar la longitud del array de imagenes de la primera oferta
            // cuando se cambie a la siguiente oferta hay que cambiar otra vez este estado
            setImgsLength(ofertas[0].imagenes.length)

            // ahora hay que rellenar los contenedores de ofertas
            setOferta1(ofertas[0])
            setOferta2(ofertas[1])
            setOferta3(ofertas[2])

        }
    }, [ofertas])

    useEffect(() => {
        
    }, [indexOfertaActual])




















    // useEffect(() => {
    //     console.log(ofertas.length)


    //     let index1 = indexOfertaActual
    //     let index2 = indexOfertaActual + 1
    //     let index3 = indexOfertaActual + 2

    //     if (index2 === ofertas.length) { index2 = 0 }
    //     if (index3 === ofertas.length) { index3 = 0 }
    //     if (index3 === ofertas.length + 1) { index3 = 1 }

        
        
        

        
    //     if (ofertas[indexOfertaActual] !== undefined) setOferta1(ofertas[index1])
    //     if (ofertas[indexOfertaActual + 1] !== undefined)  setOferta2(ofertas[index2])
    //     if (ofertas[indexOfertaActual + 2] !== undefined)  setOferta3(ofertas[index3])

    // }, [ofertas])

    // Cuando se actualiza la oferta que se ve hay que cambiar siempre el indice de la foto actual a 0
    useEffect(() => {
        setIndexFotoActual(0)
        if (ofertas[indexOfertaActual] !== undefined) { setImgsLength(ofertas[indexOfertaActual].imagenes.length) }
            else { setImgsLength(0) }

        if (indexOfertaActual === ofertas.length && ofertas.length > 0) {
            setIndexOfertaActual(0)
        }

    }, [indexOfertaActual])

    useEffect(() => {
        if (pan === pan1) {
            setPanController1(panResponder)
            setPanController2({})
            setPanController3({})

            setOpacityController1(opacity)
            setOpacityController2(0)
            setOpacityController3(0)

            setRotationController1(rotation)
            setRotationController2('0deg')
            setRotationController3('0deg')

            setPan2({getLayout: () => {}})
            setPan3({getLayout: () => {}})
        }
    }, [pan1])

    useEffect(() => {
        if (pan === pan2) {
            setPanController1({})
            setPanController2(panResponder)
            setPanController3({})

            setOpacityController1(0)
            setOpacityController2(opacity)
            setOpacityController3(0)

            setRotationController1('0deg')
            setRotationController2(rotation)
            setRotationController3('0deg')

            setPan1({getLayout: () => {}})
            setPan3({getLayout: () => {}})
        }
    }, [pan2])

    useEffect(() => {
        if (pan === pan3) {
            setPanController1({})
            setPanController2({})
            setPanController3(panResponder)

            setOpacityController1(0)
            setOpacityController2(0)
            setOpacityController3(opacity)

            setRotationController1('0deg')
            setRotationController2('0deg')
            setRotationController3(rotation)

            setPan1({getLayout: () => {}})
            setPan2({getLayout: () => {}})
        }
    }, [pan3])

    const updateOfertas = async () => {
        const res = await GetOfertas()
        setOfertas(res)
    }

    const GetIndicators = () => {
        
        let res = []

        if (imgsLength !== 0) {
            ofertas[indexOfertaActual].imagenes.forEach((imagen, index) => {

                let marginR = 0
    
                if (index !== ofertas[indexOfertaActual].imagenes.length - 1) marginR = 10
    
                if (indexFotoActual === index)
                    res.push(<Indicator actual key={index} marginRight={marginR} />)
                else
                    res.push(<Indicator key={index} marginRight={marginR} />)
            })
        }
        

        return res
    }

    const NextImg = () => { if (indexFotoActual < imgsLength - 1) setIndexFotoActual(indexFotoActual + 1) }
    const PrevImg = () => { if (indexFotoActual > 0) setIndexFotoActual(indexFotoActual - 1) }

    const indicadores = GetIndicators()

    const NextOferta = () => {
        setIndexOfertaActual(indexOfertaActual + 1)

        const indexesFunc = [setIndexZ1, setIndexZ2, setIndexZ3]
        const indexes = [indexZ1, indexZ2, indexZ3]

        indexesFunc.forEach((elem, i) => {
            if (indexes[i] % 3 === 0) elem(1)
            else if (indexes[i] % 3 === 2) elem(3)
            else if (indexes[i] % 3 === 1) elem(2)
        })

        // falta cambiar rotation, opacity, pan y pancontroller para el siguiente oferta container
        if (pan === pan1) { setPan2(pan) }
        else if (pan === pan2) { setPan3(pan) }
        else if (pan === pan3) { setPan1(pan) }
    }

    const NotFav = () => {
        setCurrentColor(colors.secondary)
        Animated.spring(
            pan,
            {toValue: {x: -500, y: 0}, useNativeDriver: false}
        ).start(() => {
            NextOferta()
            pan.setValue({x: 0, y: 0})
            rotationAnim.setValue(0)
            opacityAnim.setValue(0)
        })
        Animated.spring(
            rotationAnim,
            {toValue: -300, useNativeDriver: false}
        ).start()
        Animated.spring(
            opacityAnim,
            {toValue: -300, useNativeDriver: false}
        ).start()
    }

    const AddFav = () => {
        Animated.spring(
            pan,
            {toValue: {x: 500, y: 0}, useNativeDriver: false}
        ).start(() => {
            NextOferta()
            pan.setValue({x: 0, y: 0})
            rotationAnim.setValue(0)
            opacityAnim.setValue(0)
        })
        Animated.spring(
            rotationAnim,
            {toValue: 300, useNativeDriver: false}
        ).start()
        Animated.spring(
            opacityAnim,
            {toValue: 300, useNativeDriver: false}
        ).start()

        
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

            <View style={{
                flex: 1,
                top: 112,
                right: variables.spaceHorizontal,
                left: variables.spaceHorizontal,
                bottom: 140,
                position: 'absolute',
                zIndex: indexZ1
            }}>
                <OfertaContainer
                    oferta={oferta1}
                    color={currentColor} alpha={opacityController1} rotation={rotationController1}
                    indexFoto={indexFotoActual}
                    panController={panController1.panHandlers}
                    panLayout={pan1.getLayout()}
                />
            </View>

            <View style={{
                flex: 1,
                top: 112,
                right: variables.spaceHorizontal,
                left: variables.spaceHorizontal,
                bottom: 140,
                position: 'absolute',
                zIndex: indexZ2
            }}>
                <OfertaContainer
                    oferta={oferta2}
                    color={currentColor} alpha={opacityController2} rotation={rotationController2}
                    indexFoto={indexFotoActual}
                    panController={panController2.panHandlers}
                    panLayout={pan2.getLayout()}
                />
            </View>

            <View style={{
                flex: 1,
                top: 112,
                right: variables.spaceHorizontal,
                left: variables.spaceHorizontal,
                bottom: 140,
                position: 'absolute',
                zIndex: indexZ3
            }}>
                <OfertaContainer
                    oferta={oferta3}
                    color={currentColor} alpha={opacityController3} rotation={rotationController3}
                    indexFoto={indexFotoActual}
                    panController={panController3.panHandlers}
                    panLayout={pan3.getLayout()}
                />
            </View>
            

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