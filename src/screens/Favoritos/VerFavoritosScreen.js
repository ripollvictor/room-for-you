import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { OfertaFavorita } from '../../components/elements/OfertaFavorita'
import { GetOfertasFavoritas } from '../../database/helper'
import { OfertaDB } from '../../database/OfertaDB'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'

const VerFavoritosScreen = ({navigation}) => {

    const [ofertasFavoritas, setOfertasFavoritas] = useState([])
    const [favoritos, setFavoritos] = useState([])

    const updateFavoritos = async () => {
        const res = await GetOfertasFavoritas()
        setOfertasFavoritas(res)
    }

    useEffect(() => {
        if (ofertasFavoritas.length !== 0) return undefined

        updateFavoritos()
    }, [])

    useEffect(() => {


        if (ofertasFavoritas.length === 0) return undefined

        let i = 0
        let ofertasElem = []

        while ( i < ofertasFavoritas.length ) {
            if ( i + 1 === ofertasFavoritas.length ) {
                let id1 = ofertasFavoritas[i].id
                ofertasElem.push(
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: variables.spaceBetweenElems}} key={i} >
                        <OfertaFavorita
                            imgSource={{uri: ofertasFavoritas[i].imagenes[0]}}
                            title={ofertasFavoritas[i].direccion}
                            price={ofertasFavoritas[i].precio}
                            func={() => VerOferta(id1)}
                            key={i}
                        />
                    </View>
                )
            } else {
                let id1 = ofertasFavoritas[i].id
                let id2 = ofertasFavoritas[i + 1].id
                ofertasElem.push(
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: variables.spaceBetweenElems}} key={i} >
                        <OfertaFavorita
                            imgSource={{uri: ofertasFavoritas[i].imagenes[0]}}
                            title={ofertasFavoritas[i].direccion}
                            price={ofertasFavoritas[i].precio}
                            func={() => VerOferta(id1)}
                            key={i}
                        />
                        <OfertaFavorita
                            imgSource={{uri: ofertasFavoritas[i + 1].imagenes[0]}}
                            title={ofertasFavoritas[i + 1].direccion}
                            price={ofertasFavoritas[i + 1].precio}
                            func={() => VerOferta(id2)}
                            key={i + 1}
                        />
                    </View>
                )
            }

            i = i + 2
        }

        setFavoritos(ofertasElem)
    }, [ofertasFavoritas])

    const VerOferta = (viviendaId) => {
        console.log(viviendaId)
    }

    return(
        <View style={global.default, {paddingTop: variables.heightTopHeader, flex: 1}}>
            <Text style={{
                fontFamily: 'nk57-monospace',
                fontSize: 16,
                textAlign: 'center'
            }}>
                Mis favoritos
            </Text>
            <ScrollView persistentScrollbar={true} style={{marginTop: 38, marginBottom: 70, paddingHorizontal: variables.spaceHorizontal}}>
                {favoritos}
            </ScrollView>
        </View>
    )
}

export default VerFavoritosScreen