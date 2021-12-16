import React from 'react'
import { View, Image, Pressable, Text } from 'react-native'
import { variables } from '../styles/variables'

const CustomHeader = ({navigation, options}) => {
    
    return (
        <View
            style={{
                height: variables.heightTopHeader,
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingHorizontal: variables.spaceHorizontal
            }}
        >
            <Pressable
                onPress={navigation.goBack}
            >
                <Image source = {require('../../assets/backImage.png')} style={{width: 27, height: 22}} />
            </Pressable>
        </View>
    )
}

export { CustomHeader }