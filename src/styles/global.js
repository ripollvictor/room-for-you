import { StyleSheet } from "react-native"
import { colors } from "./colors"
import { variables } from "./variables"

const global = StyleSheet.create({
    default: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: variables.spaceHorizontal,
    },
    
    font: {
        fontFamily: 'nk57-monospace'
    },

    bold: {
        fontFamily: 'nk57-monospace-bold'
    },

    textInContainer: {
        fontSize: variables.buttonFontSize
    }
})

export { global }