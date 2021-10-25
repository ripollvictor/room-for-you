import React, { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../database/firebase";

import { View, Image, Text } from "react-native";
import ViviendaContainer from "../components/ViviendaContainer";

import { screenStyles } from "../styles/MatchesScreenStyle";

const MatchesScreen = () => {

    // useEffect(() => {
    //     onSnapshot(collection(db, 'Vivienda'), (snapshot) => {
    //         console.log(snapshot.docs.map((doc) => doc.data()))
    //     })
    // }, [])
    
    

    return(
        <View style={screenStyles.container}>
            {/* Indicador del número de fotos */}
            


            {/* La imagen */}
            <ViviendaContainer 
                imgSrc={require('../assets/imagen.png')}
                ubi='Avenida Primado Reig'
                precio='800€/mes'
            />


            {/* Botones */}


        </View>
    )

}

export default MatchesScreen