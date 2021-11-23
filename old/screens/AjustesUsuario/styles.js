import { StyleSheet } from "react-native"

const screenStyles = StyleSheet.create({
    textInput:{
        flex:1,
        padding:10,
        fontSize:16,
    },
    titleText:{
        flex:1,
        padding:5,
        paddingTop: 10,
        paddingLeft:10,
        fontSize:18,
        fontWeight: "bold",
        borderTopWidth:2,
    },
    text:{
        flex:1,
        padding:5,
        paddingTop: 10,
        paddingLeft:10,
        fontSize:16
    },
    inputComponent: {
        flex:1,
        marginLeft:20,
        marginBottom:10,
        marginRight:30,
        marginTop:10,
        borderWidth:2,
        borderColor:'#cccccc'
    },
    button:{
        flex:1,
        marginRight:30,
        marginLeft:20,
        marginTop:10,
        marginBottom:10
    },
    scrollview:{
        flexDirection:"row",
        flex:1,
        marginLeft:20,
        marginBottom:10,
        marginRight:30,
        marginTop:10,
        borderWidth:2,
        borderColor:'#cccccc',
        justifyContent: "space-between"
    }
})

export { screenStyles }