import React from 'react'
import { Pressable, Text, Image } from 'react-native'
import { colors } from '../../styles/colors'
import { defaultButton } from '../../styles/elements/buttonStyles'
import { global } from '../../styles/global'

/**
 * 
 * @param {object} props 
 * @returns {JSX.Element} Botón por defecto
 */
const DefaultButton = ({title, bold, center, textColor, marginBottom, backgroundColor, func, moreStyles}) => {

    const stylesView = [defaultButton.container]
    const stylesText = [global.textInContainer]

    // estilos del contenedor del botón
    if (moreStyles) { stylesView.push(moreStyles) }
    if (center) { stylesView.push(defaultButton.centerText) }
    if (marginBottom) { stylesView.push({marginBottom: marginBottom}) }
    if (backgroundColor) { stylesView.push({backgroundColor: backgroundColor}) }
        else { stylesView.push({backgroundColor: colors.white}) }
    
    // estilos del texto del botón
    if (bold) { stylesText.push(global.bold) }
        else { stylesText.push(global.font) }
    if (textColor) {stylesText.push({color: textColor})}

    return(
        <Pressable onPress={func} style={stylesView}>
            <Text style={stylesText}>{title}</Text>
        </Pressable>
    )
}

export { DefaultButton }