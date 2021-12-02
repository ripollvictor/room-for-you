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
const DefaultButton = ({title, bold, center, marginBottom, backgroundColor, func}) => {

    const stylesView = [defaultButton.container]
    const stylesText = [global.font, global.textInContainer]

    if (center) { stylesView.push(defaultButton.centerText) }
    if (marginBottom) { stylesView.push({marginBottom: marginBottom}) }
    if (backgroundColor) { stylesView.push({backgroundColor: backgroundColor}) }
        else { stylesView.push({backgroundColor: colors.white}) }
    
    //if (bold) { stylesText.push(boldStyle) }

    return(
        <Pressable onPress={func} style={stylesView}>
            {/*bold ? <Text style={[stylesText, {fontWeight: 'bold'}]}>{title}</Text> : <Text style={stylesText}>{title}</Text>*/}
            <Text style={stylesText}>{title}</Text>
        </Pressable>
    )
}

export { DefaultButton }