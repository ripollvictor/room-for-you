import { StyleSheet } from "react-native"

const screenStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingTop: 32
    },

    buttonSpace: {
        marginBottom: 16
    },

    googleIcon: {
        width: 24,
        height: 24,
        marginLeft: 10
    },

    logo: {
        alignSelf: 'center',
        marginBottom: 48
    },

    welcomeText: {
        color: '#707070',
        fontSize: 36,
        fontWeight: "bold",
        alignSelf: 'center',
        marginBottom: 26
    }
})

export { screenStyles }