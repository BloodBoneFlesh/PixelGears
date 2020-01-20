import * as React from 'react';
import { View, Text, TouchableOpacity, findNodeHandle } from 'react-native';

class GroupBox extends React.Component {
  heading(headers) {
    if (String(typeof (headers)).toLowerCase().match("object")) {
      return <View style={{
        position: 'absolute',
        top: -10,
        left: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        {headers.map(el => <View style={{
          backgroundColor: 'black',
          color: 'white',
          paddingLeft: 3,
          paddingRight: 3,
          borderRadius: 5,
        }}>
          <Text style={{ color: 'white', }}>
            {el}
          </Text>
        </View>)
        }
      </View>
    } else {
      return <View style={{
        backgroundColor: 'black',
        color: 'white',
        position: 'absolute',
        top: -10,
        left: 10,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 5,
      }}>
        <Text style={{ color: 'white', }}>
          {headers}
        </Text>
      </View>
    }
  }

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
      {this.heading(this.props.text)}
      {this.props.children}
    </View>
  }
}

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.getStateFocus = this.getStateFocus.bind(this);
    this.state = {
      node_id: [],
      text: false,
      focus: false,
      interval: 0,
      proxy: { value: 0 }
    }
  }



  componentDidMount() {
    let ids = [];
    ids.push(findNodeHandle(this.refs["cust_input_0"]))
    ids.push(findNodeHandle(this.refs["cust_input_1"]))
    ids.push(findNodeHandle(this.refs["cust_input_2"]))

    let focus = this.focus;
    let blur = this.blur;
    let state_focus = this.getStateFocus;

    let focus_proxy = new Proxy(this.props.focus, {
      get(target, prop, receiver) {
        console.warn(`GET ${prop}`);
        return Reflect.get(target, prop, receiver); // (1)
      },
      set(target, prop, val, receiver) {
        console.warn(`SET ${prop}=${val}, FOCUS ${state_focus()}`);
        if (ids.indexOf(val) > -1) {
          if (!state_focus()) focus();
        } else {
          if (state_focus()) blur();
        }
        return Reflect.set(target, prop, val, receiver); // (2)
      }
    });
    this.setState({ proxy: focus_proxy });
  }

  getStateFocus(){
    return this.state.focus;
  }

  focus() {
    console.warn(`focus`);
    let interval = setInterval(() => {
      if (this.state.text) this.setState({ text: false })
      else this.setState({ text: '|' })
    }, 750
    );
    this.setState({ focus: true, interval: interval });
  }

  blur() {
    console.warn(`blur`);
    clearInterval(this.state.interval);
    this.setState({ focus: false, text: false, interval: 0 });
  }

  render() {
    //if( this.state.proxy.value != this.props.focus.value)
      this.state.proxy.value = this.props.focus.value
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
        R: 0,
        G: 0,
        B: 0,
        A: 255,
      },
      focus: {
        value: 0,
        press: function (value) {
          console.warn("press " + value)
        }
      }
    };
  }

  setFocus(id) {
    var focus = { ...this.state.focus }
    focus.value = id;
    this.setState({ focus })
  }

  render() {
    /* use invisible 'background' to alarm panresponder event 
       when clicking outside of forms. it will imitate focus/blur 
       effect */
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}
        onResponderStart={(evt) =>
          this.setFocus(evt.target)
        }
        onStartShouldSetResponder={() => true
        }
      >
        <View ref="background" style={{
          position: 'absolute',
          top: 0, left: 0,
          backgroundColor: 'transparent',
          height: '100%', width: '100%'
        }}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <GroupBox text={["R", "G", "B"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput focus={this.state.focus} value={this.state.color.R} />
              <CustomInput focus={this.state.focus} value={this.state.color.G} />
              <CustomInput focus={this.state.focus} value={this.state.color.B} />
            </GroupBox>
            <GroupBox text={["H", "E", "X"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput focus={this.state.focus} />
              <CustomInput focus={this.state.focus} />
              <CustomInput focus={this.state.focus} />
            </GroupBox>
            <GroupBox text={["H", "S", "L"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput focus={this.state.focus} />
              <CustomInput focus={this.state.focus} />
              <CustomInput focus={this.state.focus} />
            </GroupBox>
            <GroupBox text={["C", "M", "Y", "K"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput focus={this.state.focus} />
              <CustomInput focus={this.state.focus} />
              <CustomInput focus={this.state.focus} />
              <CustomInput focus={this.state.focus} />
            </GroupBox>
          </View>
          <View style={{ flex: 2 }}>
            <GroupBox text={["A"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput focus={this.state.focus} value={this.state.color.A} />
            </GroupBox>
          </View>
        </View>




        <View style={{ flexDirection: 'row' }}>
          {['0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
            .map((el) =>
              <Button text={el} press={() => this.state.focus.press(el)} />
            )}
        </View>



      </View >

    )
  }
}
