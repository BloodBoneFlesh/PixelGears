import * as React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';

class GroupBox extends React.Component {
  render() {
    return <View style={[
      {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        margin: 5
      },
      this.props.style
    ]} >
      <View style={{
        backgroundColor: 'black',
        color: 'white',
        position: 'absolute',
        top: -10,
        left: 10,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 5,
      }}>
        <Text style={{ color: 'white', }}>{this.props.text}</Text>
      </View>
      {this.props.children}
    </View>
  }
}

class CustomInput extends React.Component {
  render() {
    return <TouchableWithoutFeedback
    hasTVPreferredFocus={true} 
    onPress={() => this.refs.r.focus()}
    >
      <View hasTVPreferredFocus={true}  ref="r" style={{
        borderBottomWidth: 1,
        width: 35,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      }} onFocus={() => console.warn(3)}
      onBlur={() => console.warn(1)}>
        <Text>{this.props.value}</Text>
        <Text>|</Text>
      </View>
    </TouchableWithoutFeedback>
  }
}

export class TextColorEdit extends React.Component {
  constructor(props: Object) {
    super(props);

    this.state = {
      color: {
        H: 0,
        S: 0,
        L: 0,
        A: 255,
      },
    };
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <GroupBox text="RGB(A)">
          <Text>123</Text>
        </GroupBox>
        <GroupBox text="HEX">
          <Text>123</Text>
        </GroupBox>
        <GroupBox text="HSL(A)">
          <Text>123</Text>
        </GroupBox>
        <GroupBox text="CMYK">
          <Text>123</Text>
        </GroupBox>
        <CustomInput />
        <TextInput />
      </View>
    )
  }
}
