import { screenStyles } from './styles'
import { Marker, Polyline } from 'react-native-maps'
import { MapView } from 'expo'
//import axios from 'axios'

import React, { useState } from "react"
import { View, Image, Text } from "react-native"


const HereMap = ({ navigation }) => {

    const [Vivienda, setState] = useState({
        startingLocation: {
            latitude: "39.466667",
            longitude: "-0.375000",
        },
        finishLocation: {
            latitude: "39.466667",
            longitude: "-0.375000",
        }
    })

    return (
        <View style={screenStyles.container}>

            <MapView style={screenStyles.map} />


        </View>
    )

}

export default HereMap