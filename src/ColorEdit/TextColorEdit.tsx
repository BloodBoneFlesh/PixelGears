import * as React from 'react';
import { View, Text, TouchableOpacity, findNodeHandle } from 'react-native';

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
  state = {
    node_id: [],
    text: false
  }

  componentDidMount() {
    let ids = [];
    ids.push(findNodeHandle(this.refs["cust_input_0"]))
    ids.push(findNodeHandle(this.refs["cust_input_1"]))
    ids.push(findNodeHandle(this.refs["cust_input_2"]))
    this.setState({ node_id: ids });

    setInterval(() => {
      if (this.state.text) this.setState({ text: false })
      else this.setState({ text: '|' })
    }, 500
    );
  }

  render() {
    return <View ref='cust_input_0'
      style={{
        borderBottomWidth: 1,
        width: 35,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      }} >
      <Text ref='cust_input_1'>{this.props.value}</Text>
      {this.state.node_id.indexOf(this.props.focus) > -1 ? <Text>{this.state.text}</Text> : <View ref='cust_input_2' />}
    </View>
  }
}

class Button extends React.Component {
  render() {
    return <TouchableOpacity onPress={this.props.press}>
      <View style={{ backgroundColor: 'black', width: 20, height: 20 }}>
        <Text style={{ color: 'white' }}>{this.props.text}</Text>
      </View>
    </TouchableOpacity>
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
      focus: 0
    };
  }

  render() {
    /* use invisible 'background' to alarm panresponder event 
       when clicking outside of forms. it will imitate focus/blur 
       effect */
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}
        onResponderStart={(evt) =>
          this.setState({ focus: evt.target })
        }
        onStartShouldSetResponder={() => true}
      >
        <View ref="background" style={{
          position: 'absolute',
          top: 0, left: 0,
          backgroundColor: 'transparent',
          height: '100%', width: '100%'
        }}
        />

        <GroupBox text="RGB" style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CustomInput focus={this.state.focus} />
          <CustomInput focus={this.state.focus} />
          <CustomInput focus={this.state.focus} />
        </GroupBox>
        <GroupBox text="HEX" style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CustomInput focus={this.state.focus} />
          <CustomInput focus={this.state.focus} />
          <CustomInput focus={this.state.focus} />
        </GroupBox>
        <GroupBox text="HSL" style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CustomInput focus={this.state.focus} />
          <CustomInput focus={this.state.focus} />
          <CustomInput focus={this.state.focus} />
        </GroupBox>
        <GroupBox text="CMYK" style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CustomInput focus={this.state.focus} />
          <CustomInput focus={this.state.focus} />
          <CustomInput focus={this.state.focus} />
        </GroupBox>

        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'].map((el) => <Button text={el} press={() => console.warn(el)} />)}
        </View>

        <GroupBox text="A" style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CustomInput focus={this.state.focus} />
        </GroupBox>

      </View>

    )
  }
}
