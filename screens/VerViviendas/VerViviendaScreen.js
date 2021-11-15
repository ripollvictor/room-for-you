import { screenStyles } from './styles'
import { getFirestore, getDocs,doc ,addDoc, query,where,deleteDoc} from 'firebase/firestore/lite';
import React, { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../database/firebase";
import {vivienda} from "../../clases/vivienda"
import { View, Image, Text } from "react-native";
import ViviendaContainer from "../../components/ViviendaContainer/ViviendaContainer";
import {listaVivienda, anadirSolicitud, listadeFavoritos } from "../../database/funcionesfirebase"


var muestra = new Array()
var contadorArray = 0
cargarArray()
var listaFavoritos = listadeFavoritos()


export async function cargarArray(){
    contadorArray--
    if(contadorArray<0){
        listaVivienda().then((listaVivienda)=>{
            for (let index = 0; index < 5; index++) {
                var x = parseInt(Math.random() * (listaVivienda.length))
                let vivienda = listaVivienda[x].data()
                // for (let index = 0; index < listaFavoritos.length; index++) {
                //     if(vivienda == listaFavoritos[index]){
                //         var yaIncluida = true
                //     }
                // }
                // if(!yaIncluida){
                     muestra.push(vivienda)
                // }

                
            }
            contadorArray = 5
            console.log(listaVivienda.length)
            // console.log(x)
            console.log(muestra)
        });
    }
    
}


export async function anadirFavoritos(){
    anadirSolicitud(muestra[contadorArray - 1])
    //console.log(muestra[contadorArray - 1].Direccion)
    muestra.pop()
    cargarArray()
    //recarga animated.view TODO
    VerViviendaScreen
}

export async function descartarVivienda(){
    muestra.pop()

    cargarArray()
    //recarga animated.view TODO
}



const VerViviendaScreen = () => {
 return(
        
        <View style={screenStyles.container}>
            {/* Indicador del número de fotos */}
            


            {/* La imagen */}
            <ViviendaContainer
                imgSrc={require('../../assets/imagen.png')}
                //ubi={muestra[contadorArray - 1].Direccion}
                //precio={muestra[contadorArray - 1].precio}
            />


            {/* Botones */}


        </View>
    )

}

export default VerViviendaScreen