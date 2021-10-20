import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
    button: {
        backgroundColor: '#DDD',
        padding: 15,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 4,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    img: {
        width: 24,
        height: 24,
        marginLeft: 10
    }
})

const styles = StyleSheet.create({
    container: {
        padding: 22,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'stretch'
    }
})

const Separator = () => {
    return(
        <View style={{
            width: '100%',
            height: 1,
            backgroundColor: 'gray',
            marginTop: 0,
            marginBottom: 20
        }} />
    )
}

const Button = (props) => {

    return(
        <View style={buttonStyles.button}>
            <Text>{props.content}</Text>
            {props.hasImg ? <Image style={buttonStyles.img} source={require('../assets/google-icon.png')} /> : null}
        </View>
    )
    
}

const IndexScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Button content='Iniciar Sesión' />
            <Button content='Iniciar Sesión con Google' hasImg='true' />
            <Separator />
            <Button content='Registrarse' onPress={() => {
                navigation.navigate('Registrar Usuario')
            }} />
        </View>
    )

}

export default IndexScreen