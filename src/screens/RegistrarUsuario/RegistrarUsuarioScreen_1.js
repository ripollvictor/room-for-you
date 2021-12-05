import React from 'react'
import { View } from 'react-native'
import { global } from '../../styles/global'
import { ButtonImgShadow } from '../../components/elements/Button'
import { colors } from '../../styles/colors'

const RegistrarUsuario1Screen = () => {
    return(
        <View style={global.default}>
            <ButtonImgShadow
                imgSource={require('../../../assets/registrar/suma.png')} 
                widthContianer={93}
                heightContianer={93}
                widthImg={25}
                heightImg={25}
                backgroundColor={colors.white}
                func={() => {console.log('hoola')}}
            />
        </View>
    )
}

export default RegistrarUsuario1Screen