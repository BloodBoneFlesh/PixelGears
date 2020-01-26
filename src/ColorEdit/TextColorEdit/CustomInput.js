import * as React from 'react';
import { View, Text, findNodeHandle } from 'react-native';

export class CustomInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      interval: 0,
      value: 0,
      prevValue: 0,
      changed: false
    }
    this.ping = this.ping.bind(this)
    this.press = this.press.bind(this)
  }

  ping(id) {
    let ids = [];
    ids.push(findNodeHandle(this.refs["cust_input_0"]))
    ids.push(findNodeHandle(this.refs["cust_input_1"]))
    ids.push(findNodeHandle(this.refs["cust_input_2"]))
    ids.push(findNodeHandle(this.refs["cust_input_3"]))

    if (ids.indexOf(id) > -1)
      return this.props.reference;
  }

  press(c) {
    console.log("press", c)
    if (!this.state.changed) {
      this.setState({ changed: true });
    }

    if (c == '<') {
      if (this.state.value.length > 0)
        this.props.setValue(this.state.value.substr(0, this.state.value.length - 1));
      return
    }

    if (this.state.value.length < this.props.length){
      console.warn(c, this.state.value + c)
      this.props.setValue(this.state.value + c);
    }
  }

  focus() {
    let blink = false;
    let interval = setInterval(() => {
      if(this.refs["cust_input_3"]){
      if (blink) this.refs["cust_input_3"].setNativeProps({ style: { opacity: 100 } });
      else this.refs["cust_input_3"].setNativeProps({ style: { opacity: 0 } });
      }
      blink = !blink;
    }, 750
    );
    if (!this.state.changed) {
      this.setState({ prevValue: this.state.value, value: '', focus: true, interval: interval });
    } else {
      this.setState({ focus: true, interval: interval });
    }
  }

  blur() {
    clearInterval(this.state.interval);
    if (this.state.changed) {
      this.props.setValue(this.state.value);
    }else{
      this.setState({ value: this.state.prevValue });
    }
    this.setState({ focus: false, text: false, interval: 0, changed: false });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps)
    if ((!this.state.focus || this.state.changed) &&
      this.state.value != nextProps.value)
      this.setState({ value: nextProps.value });
    return true
  }

  render() {
    //if( this.state.proxy.value != this.props.focus.value)
    return <View ref='cust_input_0'
      style={{
        borderBottomWidth: 1,
        width: 35,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }} >
      <Text ref='cust_input_1'>{this.state.value}</Text>
      <View ref='cust_input_3'>
        {this.state.focus ? <Text>|</Text> : <View ref='cust_input_2' />}
      </View>
    </View>
  }
}