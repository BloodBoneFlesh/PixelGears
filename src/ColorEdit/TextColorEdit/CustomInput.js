import * as React from 'react';
import { View, Text, findNodeHandle } from 'react-native';

export class CustomInput extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        text: false,
        focus: false,
        interval: 0,
      }
      this.ping = this.ping.bind(this)
      this.press = this.press.bind(this)
    }
  
    ping(id) {
      let ids = [];
      ids.push(findNodeHandle(this.refs["cust_input_0"]))
      ids.push(findNodeHandle(this.refs["cust_input_1"]))
      ids.push(findNodeHandle(this.refs["cust_input_2"]))
  
      if (ids.indexOf(id) > -1)
        return this.props.reference;
    }
  
    press(c) {
      if (c == '<') {
        if (this.props.value.length > 0)
          this.props.setValue(this.props.value.substr(0, this.props.value.length - 1));
        return
      }
  
      if (this.props.value.length < this.props.length)
        this.props.setValue(this.props.value + c);
    }
  
    focus() {
      let interval = setInterval(() => {
        if (this.state.text) this.setState({ text: false })
        else this.setState({ text: '|' })
      }, 750
      );
      this.setState({ focus: true, interval: interval });
    }
  
    blur() {
      clearInterval(this.state.interval);
      this.setState({ focus: false, text: false, interval: 0 });
    }
  
    render() {
      //if( this.state.proxy.value != this.props.focus.value)
      return <View ref='cust_input_0'
        style={{
          borderBottomWidth: 1,
          width: 35,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }} >
        <Text ref='cust_input_1'>{this.props.value}</Text>
        {this.state.focus ? <Text>{this.state.text}</Text> : <View ref='cust_input_2' />}
      </View>
    }
  }