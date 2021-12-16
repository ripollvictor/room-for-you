import { StyleSheet } from "react-native"
import { colors } from "./colors"
import { variables } from "./variables"

const global = StyleSheet.create({
    default: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: variables.spaceHorizontal,
    },

    inputSearch: {
        marginTop: 70,

    },
    
    font: {
        fontFamily: 'nk57-monospace'
    },

    bold: {
        fontFamily: 'nk57-monospace-bold'
    },

    textInContainer: {
        fontSize: variables.buttonFontSize
    },

    title: {
        fontFamily: 'millimetre',
        fontSize: 52,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'nk57-monospace',
        fontSize: 14,
        textAlign: 'center'
    }
})

export { global }