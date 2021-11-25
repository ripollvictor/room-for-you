import React from 'react'
import { View, Image } from 'react-native'
import { icon } from '../../styles/elements/iconStyles'

/**
 * Es un icono
 * @param {Object} props - Es un objeto que tiene que tener como parametros la url de la imagen
 * @returns {JSX.Element} 
 */
const TabIcon = (props) => {
    return(
        <View style={icon.container}>
            <Image style={icon.img} source={props.url} />
            {props.isFocused ? <View style={icon.focused} /> : null}
        </View>
    )
}

export { TabIcon }