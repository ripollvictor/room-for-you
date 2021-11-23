import { StyleSheet } from "react-native"

const screenStyles = StyleSheet.create({
    pickerInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    textInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    titleText: {
        flex: 1,
        padding: 5,
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
        borderTopWidth: 2,
    },
    text: {
        flex: 1,
        padding: 5,
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 16
    },
    inputComponent: {
        flex: 1,
        marginLeft: 20,
        marginBottom: 10,
        marginRight: 30,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#cccccc'
    },
    selecionarImagen: {
        height: 70,
        width: 79,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: "#e3e3e3"
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30

    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    }


})

export { screenStyles }