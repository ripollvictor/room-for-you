import { colors } from '../../styles/colors'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'
import React from 'react'
import { View } from 'react-native'

const Indicator = ({actual, marginRight}) => {

    const color = actual ? colors.black : 'rgba(0, 0, 0, 0.25)'

    return(
        <View style={{
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: color,
            marginRight: marginRight ? marginRight : 0
        }} />
    )
}

export { Indicator }