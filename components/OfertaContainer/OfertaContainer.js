import React, { useRef, useState } from "react"
import { Pressable, View, Text, Animated, PanResponder, Dimensions } from "react-native"
import { OfertaImagenes } from "./OfertaImagenes"
import { ofertaContainerStyles } from "./style"

export const OfertaContainer = (props) => {

    if (props.oferta === undefined) return null

    const [index, setIndex] = useState(0)

    const numImg = props.oferta ? props.oferta.imagenes.length : 0
    const imagenes = props.oferta ? props.oferta.imagenes : new Array()
    const direccion = props.oferta ? props.oferta.direccion : ''
    const precio = props.oferta ? props.oferta.precio : ''

    const pan = useRef(new Animated.ValueXY()).current
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {
            dx: pan.x,
            dy: pan.y
        }], {useNativeDriver: false}),
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx === 0 && gestureState.dy === 0) {
                // Se ha clickado
                
                if (gestureState.x0 >= Dimensions.get('screen').width / 2 && index < numImg - 1) {
                    props.changeIndexImg(index + 1)
                    setIndex(index + 1)
                }
                else if (gestureState.x0 < Dimensions.get('screen').width / 2 && index > 0) {
                    props.changeIndexImg(index - 1)
                    setIndex(index - 1)
                }
            }
            else if (gestureState.dx > Dimensions.get('window').width / 2) {
                // derecha
                console.log('derecha')
                Animated.spring(
                    pan,
                    { toValue:{ x:Dimensions.get('window').width, y:0 }, useNativeDriver: false }
                ).start(() => {pan.setValue({ x: 0, y: 0 })})
                props.swipeFunc('der')
                setIndex(0)
            }
            else if (Math.abs(gestureState.dx) > Dimensions.get('window').width / 2) {
                // izquierda
                console.log('izquierda')
                let negativeWidth = 0 - Dimensions.get('window').width
                Animated.spring(
                    pan,
                    { toValue: { x:negativeWidth, y:0 }, useNativeDriver: false }
                ).start(() => {pan.setValue({ x: 0, y: 0 })})
                props.swipeFunc('izq')
                setIndex(0)
            }
            else {
                Animated.spring(
                    pan,
                    { toValue: { x: 0, y: 0 }, useNativeDriver: false }
                ).start();
            }
        },
    })

    return(
        <View style={[ofertaContainerStyles.container, { zIndex: props.back ? -1 : 0 }]}>

            <Animated.View
                {...panResponder.panHandlers}
                style={[pan.getLayout(), ofertaContainerStyles.animatedContainer]}
            >
                <OfertaImagenes
                    imagenes={imagenes}
                    index={index}
                    direccion={direccion}
                    precio={precio}
                />
            </Animated.View>
            
        </View>
    )
}