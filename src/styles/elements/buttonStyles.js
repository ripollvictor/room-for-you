import { StyleSheet } from "react-native"
import { colors } from "../colors"
import { variables } from "../variables"

const defaultButton = StyleSheet.create({
    container: {
        paddingHorizontal: 14,
        paddingVertical: 2,
        backgroundColor: colors.white,
        borderWidth: 2,
        borderRadius: 14,
        minHeight: variables.elementMinHeight,
        justifyContent: 'center',
    },

    centerText: {
        alignItems: 'center'
    }
})

export { defaultButton }