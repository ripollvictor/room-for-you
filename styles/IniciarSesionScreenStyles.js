import { StyleSheet } from "react-native"

const screenStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingVertical: 32,
        flex: 1,
    },

    logo: {
        alignSelf: 'center',
        marginBottom: 32,
        width: 160,
        height: 127,
        resizeMode: 'contain'
    },

    mainText: {
        color: '#707070',
        fontSize: 36,
        fontWeight: "bold",
        alignSelf: 'center',
        marginBottom: 26
    },

    inputSpace: {
        marginBottom: 16
    },

    btnWrap: {
        flex: 1,
        justifyContent: "flex-end"
    }
})

export { screenStyles }