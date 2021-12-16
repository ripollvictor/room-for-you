import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'
import { ButtonImgShadow, ButtonImg } from '../../components/elements/Button'
import { TextField, PasswordField } from '../../components/elements/Input'
import { colors } from '../../styles/colors'
import * as ImagePicker from 'expo-image-picker'


const RegistrarUsuario1Screen = ({navigation}) => {

    const [width, setWidth] = useState(25)
    const [border, setBorder] = useState(0)

    const [imgSource, setImgSource] = useState(require('../../../assets/registrar/suma.png'))

    const   [email, setEmail] = useState(''),
            [telefono, setTelefono] = useState(''),
            [password, setPassword] = useState(''),
            [confirm, setConfirm] = useState(''),
            [perfilSource, setPerfilSource] = useState('')

    /**
     * Comprobar que todos los campos cumplen todas las condiciones y si está todo correcto pasar a la siguiente fase de registrar
     */
    const CheckFields = () => {
        // Comprobaciones

        const errores = []

        if (email === '') errores.push('El email está vacio')
        if (telefono === '') errores.push('El teléfono está vacio')
        if (password === '') errores.push('La contraseña está vacia')
        if (perfilSource === '') errores.push('No hay foto de perfil')
        if (confirm !== password) errores.push('No coincide con la contraseña introducida')

        if ( errores.length === 0 ) {
            navigation.navigate('Registrar 2', {
                email: email,
                telefono: telefono,
                fotoPerfil: perfilSource,
                password: password
            })
        } else {
            Alert.alert('Errores', ParseErrores(errores), [{
                text: 'OK',
                onPress: () => {}
            }])
        }
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Debes dar acceso a la galería para poder subir imágenes');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        const respuesta = { status: false, image: null, base64: null }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true,
        });

        if (result.cancelled) { return respuesta; }
        respuesta.status = true;
        respuesta.image = result.uri;
        respuesta.base64 = result.base64;
        return respuesta;
    };

    async function CargarImagen() {
            const respuesta = await pickImage()
            if (!respuesta.status) {
                alert('No has seleccionado ninguna Imagen')
                return
            }
            setWidth(93)
            setBorder(variables.borderRadius)
            setImgSource({uri:respuesta.image})
            setPerfilSource(respuesta.image)
    }

    /**
     * Devuelve un string con todos los errores
     * @param {string[]} listaErrores 
     */
    const ParseErrores = listaErrores => {
        let res = ''
        listaErrores.forEach(error => {
            res += '- ' + error + '\n'
        })
        return res
    }

    return(
        <ScrollView style={global.default}>
            <View 
                style={{
                    alignItems: 'center',
                    marginTop: 45,
                    marginBottom: 39,
                }}
            >
                <ButtonImgShadow
                    imgSource={imgSource} 
                    widthContianer={93}
                    heightContianer={93}
                    widthImg={width}
                    heightImg={width}
                    backgroundColor={colors.gray}
                    func={CargarImagen}
                    borderRadiusImg={border}
                />
            </View>
            <Text style={[global.title, {marginBottom: 54}]}>
                Tus datos personales
            </Text>
            <TextField
                title = 'Correo electrónico'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setEmail(value)}}
            />
            <TextField
                title = 'Teléfono'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setTelefono(value)}}
            />
            <PasswordField 
                title = 'Contraseña'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setPassword(value)}}
            />
            <PasswordField 
                title = 'Confirmar contraseña'
                focusColor = {colors.secondary}
                marginBottom={66}
                onChangeText = {(value) => {setConfirm(value)}}
            />

            <View style={{alignItems: 'flex-end'}}>
                <ButtonImg 
                    imgSource={require('../../../assets/registrar/next.png')}
                    widthContianer={55}
                    heightContianer={50}
                    widthImg={27}
                    heightImg={22}
                    backgroundColor={colors.white}
                    func={() => CheckFields()}
                />
            </View>
        </ScrollView>
    )
}

export default RegistrarUsuario1Screen