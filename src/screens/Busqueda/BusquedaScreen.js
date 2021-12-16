//import axios from 'axios'
import React, { useEffect, useState } from "react"
import { View, Image, Text, Button, TextInput, Alert } from "react-native"
import MapView, { Circle, Marker } from 'react-native-maps';
import { useRef } from "react";
import { global } from "../../styles/global";
import { Input } from "react-native-elements/dist/input/Input";
import Slider from '@react-native-community/slider';

const apiKey = "rSSmSMdz4ocAJ0Jd4S8dknHpPCqsyXFQPlT3vo3-Bno";



const BusquedaMapaScreen = ({ navigation }) => {
    //const [coord, setCoord] = useState({ x: 21, });
    const mapRef = useRef(null);
    const color = "rgba(204,0,204,0.2)";
    const [radio, setRadio] = useState(500);

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
        setmapRegion({ ...mapRegion, latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude });
    }

    const animateMap = () => {
        mapRef.current.animateToRegion(mapRegion, 1000);
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
        <View style={global.container}>
            <Input style={global.inputSearch} placeholder="Buscar"
                onChangeText={(value => setAddress(value))} />
            <Button
                title="Buscar aquí"
                color="#f194ff"
                onPress={() => Alert.alert('lat:'+mapRegion.latitude + "\n" + 'lng:'+mapRegion.longitude+  "\n" + 'Radio:'+radio+' m')}
            />
            <Slider
                step={0.5}
                onValueChange={value =>
                    setRadio(value)}
                maximumValue={5000}
                minimumValue={100}
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
                <Circle
                    center={mapRegion}
                    radius={radio}
                    fillColor={color}
                    draggable
                />
            </MapView>

        </View>
    );

}

export default BusquedaMapaScreen