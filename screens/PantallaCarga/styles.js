import { StyleSheet } from "react-native"

const screenStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        flex: 1,
    },
    logo: {
        alignSelf: 'center',
        width: "100%",
        height: "100%",
        resizeMode: 'contain'
    }
})

export { screenStyles }