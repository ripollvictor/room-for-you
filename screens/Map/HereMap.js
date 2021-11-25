import { screenStyles } from './styles'
//import axios from 'axios'
import React, { useState } from "react"
import { View, Image, Text, Button, TextInput } from "react-native"
import MapView, { Marker } from 'react-native-maps';
import { useRef } from "react";


function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
}

const HereMap = ({ navigation }) => {
    const [coord, setCoord] = useState({ x: 21, });
    const mapRef = useRef(null);

    const [mapRegion, setmapRegion] = useState({
        latitude: 39.4702,
        longitude: -0.376805,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const goToTokyo = () => {
        //Animate the user to new region. Complete this animation in 3 seconds
        mapRef.current.animateToRegion(mapRegion, 1000);
    };
    return (
        <View style={screenStyles.container}>
            <MapView
                ref={mapRef}
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
            >

                <Marker
                    coordinate={mapRegion}
                    onDragEnd={e => log('onDragEnd', e)}
                    draggable
                />
                <Button onPress={() => goToTokyo()} title="Go to Tokyo" />
                </MapView>

        </View>
    );

}

export default HereMap