import React from 'react'
import { Pressable, Text, Image, View } from 'react-native'
import { colors } from '../../styles/colors'
import { btnImg, defaultButton } from '../../styles/elements/buttonStyles'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'

const OfertaFavorita = ({imgSource, title, price, func}) => {

    return(
        <Pressable
            style={{
                alignSelf: 'flex-start',
                borderColor: colors.black,
                borderRadius: variables.borderRadius,
                borderWidth: 2,
                width: '48%'
            }}

            onPress={func}
        >
            <Image
                source={imgSource}
                style={{
                    width: '100%',
                    height: 107,
                    resizeMode: 'cover',
                    borderTopLeftRadius: variables.borderRadius,
                    borderTopRightRadius: variables.borderRadius,
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 13,
                    paddingVertical: 11,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <Text
                    style={{
                        fontSize: 10,
                        fontFamily: 'nk57-monospace',
                        flex: 2
                    }}
                >{title}</Text>
                <Text
                    style={{
                        fontFamily: 'nk57-monospace',
                        fontSize: 14,
                        color: colors.primary,
                        flex: 1,
                        textAlign: 'right'
                    }}
                >{price}€</Text>
            </View>
        </Pressable>
    )
}

export { OfertaFavorita }