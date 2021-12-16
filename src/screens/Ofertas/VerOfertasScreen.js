import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, Alert, Animated, PanResponder, Dimensions } from 'react-native'
import { Indicator } from '../../components/elements/Indicator'
import { colors } from '../../styles/colors'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'
import { OfertaDB } from '../../database/OfertaDB'
import { GetOfertas, CreateSolicitud } from '../../database/helper'
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
    const pan2 = useRef(new Animated.ValueXY()).current
    const pan3 = useRef(new Animated.ValueXY()).current

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

    const panResponder2 = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            if (gesture.dx < 0) { setCurrentColor(colors.primary) }
                else { setCurrentColor(colors.secondary) }
            pan2.x.setValue(gesture.dx)
            pan2.y.setValue(0)
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
                    pan2,
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

    const panResponder3 = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            if (gesture.dx < 0) { setCurrentColor(colors.primary) }
                else { setCurrentColor(colors.secondary) }
            pan3.x.setValue(gesture.dx)
            pan3.y.setValue(0)
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
                    pan3,
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
        
        // cada vez que se modifica la oferta actual la imagen vuelve al indice 0
        setIndexFotoActual(0)
        
        // esto sirve para los indicadores que hay encima de los contenedores de las ofertas
        if (ofertas[indexOfertaActual] !== undefined) setImgsLength(ofertas[indexOfertaActual].imagenes.length)

        

    }, [indexOfertaActual])

    useEffect(() => {

        //console.log(indexFotoActual)

    }, [indexFotoActual])

    const updateOfertas = async () => {
        const res = await GetOfertas()
        setOfertas(res)
    }

    const NextImg = () => {
        if (indexFotoActual < ofertas[indexOfertaActual].imagenes.length - 1) {
            let newIndex = indexFotoActual + 1
            setIndexFotoActual(newIndex)
        }
    }
    const PrevImg = () => {
        if (indexFotoActual > 0) {
            setIndexFotoActual(indexFotoActual - 1)
        }
    }

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
        if (opacityController2 === 0 && opacityController3 === 0) {

            setOpacityController1(0)
            setOpacityController2(opacity)
            setOpacityController3(0)

            setRotationController1('0deg')
            setRotationController2(rotation)
            setRotationController3('0deg')

        }
        else if (opacityController1 === 0 && opacityController3 === 0) {

            setOpacityController1(0)
            setOpacityController2(0)
            setOpacityController3(opacity)

            setRotationController1('0deg')
            setRotationController2('0deg')
            setRotationController3(rotation)
        }
        else if (opacityController1 === 0 && opacityController2 === 0) {

            setOpacityController1(opacity)
            setOpacityController2(0)
            setOpacityController3(0)

            setRotationController1(rotation)
            setRotationController2('0deg')
            setRotationController3('0deg')

        }
    }

    const NotFav = () => {
        setCurrentColor(colors.secondary)
        if (indexZ1 === 3) {
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
        else if (indexZ2 === 3) {
            Animated.spring(
                pan2,
                {toValue: {x: -500, y: 0}, useNativeDriver: false}
            ).start(() => {
                NextOferta()
                pan2.setValue({x: 0, y: 0})
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
        else if (indexZ3 === 3) {
            Animated.spring(
                pan3,
                {toValue: {x: -500, y: 0}, useNativeDriver: false}
            ).start(() => {
                NextOferta()
                pan3.setValue({x: 0, y: 0})
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





        
    }

    const AddFav = () => {
        if (indexZ1 === 3) {
            Animated.spring(
                pan,
                {toValue: {x: 500, y: 0}, useNativeDriver: false}
            ).start(() => {
                CreateSolicitud(oferta1.id)
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
        else if (indexZ2 === 3) {
            Animated.spring(
                pan2,
                {toValue: {x: 500, y: 0}, useNativeDriver: false}
            ).start(() => {
                CreateSolicitud(oferta2.id)
                NextOferta()
                pan2.setValue({x: 0, y: 0})
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
        else if (indexZ3 === 3) {
            Animated.spring(
                pan3,
                {toValue: {x: 500, y: 0}, useNativeDriver: false}
            ).start(() => {
                CreateSolicitud(oferta3.id)
                NextOferta()
                pan3.setValue({x: 0, y: 0})
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
    }

    const indicators = () => {
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
        

        return(res)
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
                {indicators()}
            </View>

            <View style={{
                flex: 1,
                top: 112,
                right: variables.spaceHorizontal,
                left: variables.spaceHorizontal,
                bottom: 140,
                position: 'absolute',
                zIndex: indexZ1,
            }}>
                <OfertaContainer
                    oferta={oferta1}
                    color={currentColor} alpha={opacityController1} rotation={rotationController1}
                    indexFoto={oferta1.imagenes[indexFotoActual]}
                    panController={panResponder.panHandlers}
                    panLayout={pan.getLayout()}
                />
            </View>

            <View style={{
                flex: 1,
                top: 112,
                right: variables.spaceHorizontal,
                left: variables.spaceHorizontal,
                bottom: 140,
                position: 'absolute',
                zIndex: indexZ2,
            }}>
                <OfertaContainer
                    oferta={oferta2}
                    color={currentColor} alpha={opacityController2} rotation={rotationController2}
                    indexFoto={oferta2.imagenes[indexFotoActual]}
                    panController={panResponder2.panHandlers}
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
                zIndex: indexZ3,
            }}>
                <OfertaContainer
                    oferta={oferta3}
                    color={currentColor} alpha={opacityController3} rotation={rotationController3}
                    indexFoto={oferta3.imagenes[indexFotoActual]}
                    panController={panResponder3.panHandlers}
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
                    func={() => {console.log(panController2)}}
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