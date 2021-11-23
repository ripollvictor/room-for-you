import React, { useState } from "react"
import { Image, View, Text } from "react-native"
import { ofertaContainerStyles } from "./style"

export const OfertaImagenes = (props) => {

    return(
        <View style={ofertaContainerStyles.imagenesContainer}>
            <Image
                style={ofertaContainerStyles.imagen}
                source={{uri: props.imagenes[props.index]}}
            />

            <View style={ofertaContainerStyles.infoContainer}>
                <Text style={{marginBottom: 12}}>{props.direccion}</Text>
                <Text>{props.precio} €/mes</Text>
            </View>
        </View>
    )
}