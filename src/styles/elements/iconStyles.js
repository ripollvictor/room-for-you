import { StyleSheet } from "react-native"
import { colors } from "../colors"

export const icon = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    img: {
        width: 31,
        height: 31,
        marginBottom: 9,
        resizeMode: 'contain'
    },

    focused: {
        width: 25,
        height: 2,
        borderRadius: 2,
        backgroundColor: colors.primary
    }
})