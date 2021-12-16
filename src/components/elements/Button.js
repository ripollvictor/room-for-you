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

const ButtonImg = ({imgSource, backgroundColor, widthContianer, heightContianer, widthImg, heightImg, func, marginRight, borderRadiusImg}) => {
    const stylesContainer = [btnImg.container, {width: widthContianer, height: heightContianer}, {marginRight: marginRight ? marginRight : 0}]
    const stylesImg = [{width: widthImg, height: heightImg, borderRadius: borderRadiusImg ? borderRadiusImg : 0}]

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

const ViewImg = ({imgSource, backgroundColor, widthContianer, heightContianer, widthImg, heightImg, marginRight, borderRadiusImg}) => {
    const stylesContainer = [btnImg.container, {width: widthContianer, height: heightContianer}, {marginRight: marginRight ? marginRight : 0}]
    const stylesImg = [{width: widthImg, height: heightImg, borderRadius: borderRadiusImg ? borderRadiusImg : 0}]

    if (backgroundColor) { stylesContainer.push({backgroundColor: backgroundColor}) }

    return(
        <View
            style={stylesContainer}
        >
            <Image source={imgSource} style={stylesImg} />
        </View>
    )
}

const ViewImgShadow = (props) => {
    const button = ViewImg(props)
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

const ButtonShadow = ({backgroundColor, widthContianer, heightContianer, func, text}) => {
    const stylesContainer = [btnImg.container, {width: widthContianer, height: heightContianer}, {marginRight: marginRight ? marginRight : 0}]
    const stylesShadow = [{
        width: props.widthContianer,
        height: props.heightContianer,
        backgroundColor: colors.black,
        top: -5,
        left: -7,
        position: 'absolute',
        zIndex: -1,
        borderRadius: variables.borderRadius
    }]
    const stylesText = [global.description]

    return(
        <View style={{position: 'relative'}}>
            <Pressable style={stylesContainer} onPress={func}>
                <Text style={stylesText}>{text}</Text>
            </Pressable>
            <View style={stylesShadow} />
        </View>
    )
}

export { DefaultButton, ButtonImg, ButtonImgShadow, ViewImgShadow }