import React, { useState } from 'react'
import { TextInput , Text, Image } from 'react-native'
import { colors } from '../../styles/colors'
import { defaultButton } from '../../styles/elements/buttonStyles'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'

/**
 * 
 * @param {object} props 
 * @returns {JSX.Element} Input de texto
 */
const TextField = ({title, center, marginBottom, focusColor, password, returnKeyType, onChangeText}) => {

    const [backgroundColor, setBackgroundColor] = useState({backgroundColor: colors.white})
    const stylesView = [defaultButton.container, global.font, global.textInContainer]

    // estilos del contenedor del botón
    if (center) { stylesView.push(defaultButton.centerText) }
    if (marginBottom) { stylesView.push({marginBottom: marginBottom}) }
    
    // estilos del texto del botón

    return(
        <TextInput 
            style = {[stylesView, backgroundColor]}
            returnKeyType = {returnKeyType}
            placeholder = {title}
            placeholderTextColor = 'black'
            onFocus = {() => {setBackgroundColor({backgroundColor: focusColor})}}
            onBlur = {() => {setBackgroundColor({backgroundColor: colors.white})}}
            secureTextEntry = {password}
            onChangeText = {onChangeText}
        />
    )
}

const PasswordField = ({title, center, marginBottom, focusColor, returnKeyType, onChangeText}) => {
    return TextField({title, center, marginBottom, focusColor, password: true, returnKeyType, onChangeText})
}

export { TextField, PasswordField }