import React, { Component } from 'react'
import { Image, Text, Animated, PanResponder, View, Dimensions, Touchable } from 'react-native'
import { ofertaContainerStyles } from "./style"
import { cargarArray, anadirFavoritos } from "../../screens/VerViviendas/VerViviendaScreen"

export default class OfertaContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pan: new Animated.ValueXY()
        }

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder    : () => true,
            onPanResponderMove              : Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease           : (e, gesture) => {

                if(gesture.dx === 0 && gesture.dy === 0) {
                    // Se ha pulsado una vez 
                    // abrir nuevo contenedor que muestre las fotos en grande
                    //TO DO metodo pasar de foto


                } else if (this.Derecha(gesture)) {
                    // Se ha movido a la derecha
                    anadirFavoritos()
                    


                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:Dimensions.get('window').width,y:0}}
                    ).start()
                        



                } else if (this.Izquierda(gesture)) {
                    // Se ha movido a la izquierda
                    descartarVivienda()




                    let negativeWidth = 0 - Dimensions.get('window').width

                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:negativeWidth,y:0}}
                    ).start()




                } else {
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}}
                    ).start()
                }
                
            }
        })
    }

    Derecha(gesture) {
        return gesture.dx > (Dimensions.get('window').width / 2)
    }

    Izquierda(gesture) {
        return Math.abs(gesture.dx) > (Dimensions.get('window').width / 2)
    }

    render() {
        
        return(
            <Animated.View 
                style={[ofertaContainerStyles.container, this.props.style, this.state.pan.getLayout()]}
                {...this.panResponder.panHandlers}
            >

                <View style={ofertaContainerStyles.shadow}>

                    <Image
                        source={this.props.imgSrc}
                        style={viviendaContainerStyles.img}
                    />

                    <View style={viviendaContainerStyles.infoContainer}>
                        <Text style={viviendaContainerStyles.ubiVivienda}>{this.props.ubi}</Text>
                        <Text style={viviendaContainerStyles.precioVivienda}>{this.props.precio}</Text>
                    </View>
                </View>

            </Animated.View>
        )
        
    }
}




