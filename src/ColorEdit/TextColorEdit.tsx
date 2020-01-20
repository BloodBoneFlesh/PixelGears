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
    this.state = {
      value: this.props.value,
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
    this.setState({ value: this.state.value + c });
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
      <Text ref='cust_input_1'>{this.state.value}</Text>
      {this.state.focus ? <Text>{this.state.text}</Text> : <View ref='cust_input_2' />}
    </View>
  }
}

class Button extends React.Component {
  render() {
    return <TouchableOpacity onPress={this.props.press}>
      <View style={{ backgroundColor: 'black', width: 30, height: 20 }}>
        <Text style={{ color: 'white' }}>{this.props.text}</Text>
      </View>
    </TouchableOpacity>
  }
}

export class TextColorEdit extends React.Component {
  //https://css-tricks.com/converting-color-spaces-in-javascript/
  rgbToHex(r, g, b) {
    function hex(v) {
      var hex = Number(v).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      return hex;
    };
    return [hex(r), hex(g), hex(b)];
  }

  hexToRGB(h, e, x) {
    return ["0x" + h[0] + h[1], "0x" + e[0] + e[1], "0x" + x[0] + h[1]];
  }

  rgbToHSL(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
      h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
  }

  hslToRGB(h, s, l) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
  }

  rgbToCmyk(r, g, b){
    var c = 1 - (r / 255);
    var m = 1 - (g / 255);
    var y = 1 - (b / 255);
    var k = Math.min(c, Math.min(m, y));
    
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    
    c = isNaN(c) ? 0 : c;
    m = isNaN(m) ? 0 : m;
    y = isNaN(y) ? 0 : y;
    k = isNaN(k) ? 0 : k;
    
    return [c,m,,y,k]
  }

  cmykToRgb(c, m, y, k){
    c = (c / 100);
    m = (m / 100);
    y = (y / 100);
    k = (k / 100);
    
    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;
    
    return [1 - c , 1 - m, 1 - y]
}

  constructor(props: Object) {
    super(props);

    this.state = {
      color: {
        R: 0,
        G: 0,
        B: 0,
        A: 255,
        C: 0,
        M: 0,
        Y: 0,
        K: 0,
        HH: 0,
        S: 0,
        L: 0,
        H: 0,
        E: 0,
        X: 0,
      },
      active: false
    };
  }

  press(key) {
    if (this.state.active) this.state.active.press(key)
  }

  getInputFieldById(id) {
    for (let ref in this.refs) {
      if (this.refs[ref].ping(id))
        return this.refs[ref];
    }
  }

  setActive(field) {
    if (this.state.active) this.state.active.blur();
    this.setState({ active: field })
    if (field) field.focus();
  }

  render() {
    /* use invisible 'background' to alarm panresponder event 
       when clicking outside of forms. it will imitate focus/blur 
       effect */
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}
        onResponderStart={(evt) =>
          this.setActive(this.getInputFieldById(evt.target))
        }
        onStartShouldSetResponder={() => true
        }
      >
        <View style={{
          position: 'absolute',
          top: 0, left: 0,
          backgroundColor: 'transparent',
          height: '100%', width: '100%'
        }}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <GroupBox text={["R", "G", "B"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput ref="R" reference="R" value={this.state.color.R} />
              <CustomInput ref="G" reference="G" value={this.state.color.G} />
              <CustomInput ref="B" reference="B" value={this.state.color.B} />
            </GroupBox>
            <GroupBox text={["H", "E", "X"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput ref="HH" reference="HH" value={this.state.color.HH} />
              <CustomInput ref="E" reference="E" value={this.state.color.E} />
              <CustomInput ref="X" reference="X" value={this.state.color.X} />
            </GroupBox>
            <GroupBox text={["H", "S", "L"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput ref="H" reference="H" value={this.state.color.H} />
              <CustomInput ref="S" reference="S" value={this.state.color.S} />
              <CustomInput ref="L" reference="L" value={this.state.color.L} />
            </GroupBox>
            <GroupBox text={["C", "M", "Y", "K"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput ref="C" reference="C" value={this.state.color.C} />
              <CustomInput ref="M" reference="M" value={this.state.color.M} />
              <CustomInput ref="Y" reference="Y" value={this.state.color.Y} />
              <CustomInput ref="K" reference="K" value={this.state.color.K} />
            </GroupBox>
          </View>
          <View style={{ flex: 2 }}>
            <GroupBox text={["A"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomInput ref="A" reference="A" value={this.state.color.A} />
            </GroupBox>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {['0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', '<']
            .map((el) =>
              <Button text={el} press={() => this.press(el)} />
            )}
        </View>

      </View >

    )
  }
}
