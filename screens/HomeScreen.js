import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import './Login2';
import { dameeluser } from "./Login2";
const HomeScreen = ({navigation,route}) => {
    const [user, setState] = useState(route.params);
    

    
    console.log(route.params);
    console.log(user);
    //const ae =;

    //setState(ae);
    return(
        <ScrollView>
        <View>
            <Text>
                Popuuuuu
            </Text>

        </View>
        <View style={styles.button}>
                { user 
                  ?<Text>Hola,{user.displayName}</Text>
                  :<Text> Porfavor logueate</Text>
                }
        </View>
        </ScrollView>
    )


    

}

const styles = StyleSheet.create({
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
    }
})

export default HomeScreen