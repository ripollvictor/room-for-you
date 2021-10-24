import React, { Component } from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { buttonStyles } from "../styles/ButtonStyles"

export default class Button extends Component {
    constructor(props) { super(props) }

    render() {

        return(
            <TouchableOpacity style={[buttonStyles.normal, this.props.style]} onPress={this.props.onPress}>
                <Text style={buttonStyles.text}>
                    {this.props.children}
                </Text>
                {this.props.imgSrc ? <Image style={buttonStyles.img} source={this.props.imgSrc} /> : null}
            </TouchableOpacity>
        )
    }
}




