import { StyleSheet } from "react-native"
import { colors } from "../colors"
import { variables } from "../variables"

const defaultButton = StyleSheet.create({
    container: {
        paddingHorizontal: 14,
        paddingVertical: 2,
        backgroundColor: colors.white,
        borderWidth: 2,
        borderRadius: variables.borderRadius,
        minHeight: variables.elementMinHeight,
        justifyContent: 'center',
    },

    centerText: {
        alignItems: 'center'
    }
})

const btnImg = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: variables.borderRadius
    }
})

export { defaultButton, btnImg }