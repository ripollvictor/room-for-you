import React from 'react'
import { Pressable, Text, Image, View } from 'react-native'
import { colors } from '../../styles/colors'
import { btnImg, defaultButton } from '../../styles/elements/buttonStyles'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'

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

const ButtonImg = ({imgSource, backgroundColor, widthContianer, heightContianer, widthImg, heightImg, func}) => {
    const stylesContainer = [btnImg.container, {width: widthContianer, height: heightContianer}]
    const stylesImg = [{width: widthImg, height: heightImg}]

    if (backgroundColor) { stylesContainer.push({backgroundColor: backgroundColor}) }

    return(
        <Pressable
            style={stylesContainer}
            onPress={func}
        >
            <Image source={imgSource} style={stylesImg} />
        </Pressable>
    )
}

const ButtonImgShadow = (props) => {
    const button = ButtonImg(props)
    const styleContainer = {
        position: 'relative',
    }
    const styleShadow = {
        width: props.widthContianer,
        height: props.heightContianer,
        backgroundColor: colors.black,
        top: -5,
        left: -7,
        position: 'absolute',
        zIndex: -1,
        borderRadius: variables.borderRadius
    }

    return(
        <View
            style={styleContainer}
        >
            {button}
            <View style={styleShadow} />
        </View>
    )
}

export { DefaultButton, ButtonImg, ButtonImgShadow }