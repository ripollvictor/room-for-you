import React from 'react'
import { Pressable, Text, Image, View, Animated } from 'react-native'
import { colors } from '../../styles/colors'
import { btnImg, defaultButton } from '../../styles/elements/buttonStyles'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'

const InfoContainer = ({direccion, precio, funcInfo, moreStyles}) => {
    return(
        <View
            style={[moreStyles, {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: variables.borderRadius,
                borderWidth: 2,
                width: '100%',
                paddingTop: 22,
                paddingHorizontal: 17,
                paddingBottom: 20
            }]}
        >
            <Text style={{fontFamily: 'nk57-monospace', fontSize: 18, marginBottom: 20}}>{direccion}</Text>
            <Text style={{fontFamily: 'nk57-monospace', fontSize: 22}}>{precio}€/mes</Text>
            <Pressable style={{position: 'absolute', bottom: 0, right: 18, height: 20}} onPress={funcInfo}><Image source={require('../../../assets/ofertas/more.png')} style={{width: 29, height: 5, resizeMode: 'contain'}} /></Pressable>
        </View>
    )
}

const OfertaContainer = ({direccion, precio, funcInfo, moreStyles, color, alpha}) => {

    return(
        <Animated.View
            style={[moreStyles, {
                width: '100%',
                borderRadius: variables.borderRadius,
                borderWidth: 2,
                flexDirection: 'column-reverse',
                paddingHorizontal: 11,
                paddingBottom: 28,
                flex: 1,
                marginBottom: 140
            }]}
        >
            <Animated.View style={{
                backgroundColor: color,
                opacity: alpha,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: variables.borderRadius
            }} />
            
            <InfoContainer direccion={direccion} precio={precio} funcInfo={funcInfo} />
        </Animated.View>
    )
}

export { OfertaContainer }