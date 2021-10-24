import { StyleSheet } from "react-native"

const buttonStyles = StyleSheet.create({
    normal: {
        backgroundColor: '#FFF',
        borderRadius: 4,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row',
        height: 52,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    text: {
        fontSize: 16,
    },

    img: {
        width: 24,
        height: 24,
        marginLeft: 10
    }
})

export { buttonStyles }