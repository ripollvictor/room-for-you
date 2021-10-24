import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { textInputStyles } from "../styles/InputStyles"

export default class Input extends Component {
    constructor(props) { super(props) }

    render() {

        if (this.props.inputType === 'password') {
            return(
                <TextInput onChangeText={this.props.onChangeText} secureTextEntry={true} style={[textInputStyles.normal, this.props.style]} placeholder={this.props.placeholder} />
            )
        }

        return(
            <TextInput onChangeText={this.props.onChangeText} style={[textInputStyles.normal, this.props.style]} placeholder={this.props.placeholder} />
        )
    }
}




