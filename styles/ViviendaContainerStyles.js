import { StyleSheet, Dimensions } from "react-native"

const Window = Dimensions.get('window')

const viviendaContainerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },

    shadow: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        backgroundColor: 'black'
    },

    imgContainer: {
        flex: 1
    },

    img: {
        width: '100%',
        height: '100%'
    },

    infoContainer: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        backgroundColor: 'red',
    },

    ubiVivienda: {

    },

    precioVivienda: {

    },
})

export { viviendaContainerStyles }