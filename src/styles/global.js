import { StyleSheet } from "react-native"

const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputSearch: {
        marginTop: 70,

    },
    containerButtons: {
        height: 50
    }, 

    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 14,
        height: 42
    },

    atras: {
        zIndex: -1
    }
})

export { screenStyles }