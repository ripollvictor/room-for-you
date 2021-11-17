import { StyleSheet, Dimensions } from "react-native"

const ofertaContainerStyles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 42, // altura de indicators
        right: 0,
        left: 0,
        bottom: 50, // altura de containerButtons

        paddingHorizontal: 24,
    },

    animatedContainer: {
        flex: 1
    },

    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        position: 'absolute',
        bottom: 30,
        left: 13,
        right: 13,
        padding: 17,
        borderRadius: 16,
        borderWidth: 2,
    },

    imagenesContainer: {
        flex: 1,
        borderRadius: 16,
        borderWidth: 2,
    },

    imagen: {
        flex: 1,
        borderRadius: 14,
    }
})

export { ofertaContainerStyles }