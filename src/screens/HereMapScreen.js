//import axios from 'axios'
import React, { useEffect, useState } from "react"
import { View, Image, Text, Button, TextInput, Alert } from "react-native"
import MapView, { Marker } from 'react-native-maps';
import { useRef } from "react";
import { screenStyles } from "../styles/global";
import { Input } from "react-native-elements/dist/input/Input";

const apiKey = "rSSmSMdz4ocAJ0Jd4S8dknHpPCqsyXFQPlT3vo3-Bno";



const HereMapScreen = ({ navigation }) => {
    //const [coord, setCoord] = useState({ x: 21, });
    const mapRef = useRef(null);

    const [ubi, setUbi] = useState({
        latitude: "",
        longitude: "",
    });

    const [mapRegion, setmapRegion] = useState({
        latitude: 39.4702,
        longitude: -0.376805,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [address, setAddress] = useState("");
    function log(e) {
        console.log(e.nativeEvent);
        setUbi({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
    }
    const animateMap = () => {
        mapRef.current.animateToRegion(mapRegion,1000);
    }
    useEffect(() => {
        const timeOutId = setTimeout(() => searchAddress(), 700);
        return () => clearTimeout(timeOutId);
    }, [address])

    useEffect(() => {
        const timeOutId = setTimeout(() => animateMap(), 500);
        return () => clearTimeout(timeOutId);
    }, [mapRegion])

    const searchAddress = async () => {
        try {
            const response = await fetch(
                'https://geocode.search.hereapi.com/v1/geocode?q=' + address + '&apiKey=' + apiKey
            );
            const json = await response.json();
            if (address != "") {
                setmapRegion({ ...mapRegion, longitude: await json.items[0].position.lng, latitude: await json.items[0].position.lat });
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={screenStyles.container}>
            <Input style={screenStyles.inputSearch} placeholder="Buscar"
                onChangeText={(value => setAddress(value))} />
            <Button
                title="Añadir Ubicación"
                color="#f194ff"
                onPress={() => Alert.alert(ubi.latitude + "\n" + ubi.longitude)}
            />
            <MapView
                ref={mapRef}
                style={{ alignSelf: 'stretch', height: '100%' }}
                initialRegion={mapRegion}
            >

                <Marker
                    coordinate={mapRegion}
                    onDragEnd={e => log(e)}
                    draggable
                />
            </MapView>

        </View>
    );

}

export default HereMapScreen