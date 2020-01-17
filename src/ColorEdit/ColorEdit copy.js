import * as React from 'react';

import { View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Svg, {
  Line,
  Rect,
  Path,
  LinearGradient,
  Defs,
  Stop,
  Use,
  Mask,
  Image,
  Pattern,
  G,
} from 'react-native-svg';

import { SvgScroll } from '../SvgScroll';

export class ColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.changeColor = this.changeColor.bind(this);

    this.state = {
      size: {
        width: 300,
        height: 300,
        margin: 20,
      },
      color: {
        R: 255,
        G: 0,
        B: 255,
        A: 255
      },
      padding: { width: 0, height: 0 }
    };
  }

  onLayout = (e) => {
    this.setState({ padding: e.nativeEvent.layout })
  }

  changeColor(NewColor) {
    this.setState({ color: NewColor });
  }

  defineScrollCoordinates(x_start, y_start, step) {
    return {
      r: { x1: x_start, y1: y_start += step, x2: x_start + 100, y2: y_start },
      g: { x1: x_start, y1: y_start += step, x2: x_start + 100, y2: y_start },
      b: { x1: x_start, y1: y_start += step, x2: x_start + 100, y2: y_start },
      a: { x1: x_start, y1: y_start += step, x2: x_start + 100, y2: y_start },
    }
  }

  defineColorByAngle(angle) {
    function definePercent(left, right, value) {
      /*  x / y = n / 100  =>   x * 100 / y = n  
          x = value - left;    y = right - left  */
      return (value - left) * 100 / (right - left);
    }

    if (angle.angle >= 0 && angle.angle <= angle.bottom_right) {
      // "green_aqua" "rgb(0,255,0)" "rgb(0,255,255)" 
      let p = definePercent(0, angle.bottom_right, angle.angle);
      this.setState({ color: { R: 0, G: 255, B: Math.floor(p / 100 * 255), A: 255 } })
    }
    if (angle.angle <= 90 && angle.angle >= angle.bottom_right) {
      // "aqua_blue" "rgb(0,0,255)" "rgb(0,255,255)"
      let p = definePercent(angle.bottom_right, 90, angle.angle);
      this.setState({ color: { R: 0, G: 255 - Math.floor(p / 100 * 255), B: 255, A: 255 } })
    }
    if (angle.angle >= 90 && angle.angle <= angle.bottom_left) {
      // "blue_pink" "rgb(0,0,255)" "rgb(255,0,255)" 
      let p = definePercent(90, angle.bottom_left, angle.angle);
      this.setState({ color: { R: Math.floor(p / 100 * 255), G: 0, B: 255, A: 255 } })
    }
    if (angle.angle <= 180 && angle.angle >= angle.bottom_left) {
      // "pink_white" "rgb(255,255,255)" "rgb(255,0,255)"
      let p = definePercent(angle.bottom_left, 180, angle.angle);
      this.setState({ color: { R: 255, G: Math.floor(p / 100 * 255), B: 255, A: 255 } })
    }
    if (angle.angle >= 180 && angle.angle <= angle.top_left) {
      // "white_black" "rgb(255,255,255)" "rgb(0,0,0)"
      let p = Math.floor(definePercent(180, angle.top_left, angle.angle) / 100 * 255);
      this.setState({ color: { R: 255 - p, G: 255 - p, B: 255 - p, A: 255 } })
    }
    if (angle.angle <= 270 && angle.angle >= angle.top_left) {
      // "black_red"  "rgb(0,0,0)"  "rgb(255,0,0)"
      let p = definePercent(angle.top_left, 270, angle.angle);
      this.setState({ color: { R: Math.floor(p / 100 * 255), G: 0, B: 0, A: 255 } })
    }
    if (angle.angle >= 270 && angle.angle <= angle.top_right) {
      // "red_yellow" "rgb(255,0,0)" "rgb(255,255,0)"
      let p = definePercent(270, angle.top_right, angle.angle);
      this.setState({ color: { R: 255, G: Math.floor(p / 100 * 255), B: 0, A: 255 } })
    }
    if (angle.angle <= 360 && angle.angle >= angle.top_right) {
      // "yellow_green" "rgb(255,255,0)" "rgb(0,255,0)" 
      let p = definePercent(angle.top_right, 360, angle.angle);
      this.setState({ color: { R: 255 - Math.floor(p / 100 * 255), G: 255, B: 0, A: 255 } })
    }

    this.refs.red.setValue(this.state.color.R / 255)
    this.refs.green.setValue(this.state.color.G / 255)
    this.refs.blue.setValue(this.state.color.B / 255)
    this.refs.alpha.setValue(this.state.color.A / 255)
  }

  defineColorByValue(value, variable) {
    switch(variable){
      case 'red':{
        this.setState((prevState) => ({ color: { 
          R: Math.floor(value / 100 * 255), 
          G: prevState.color.G, 
          B: prevState.color.B, 
          A: prevState.color.A 
        } }))
        break;
      }
      case 'green':{
        this.setState((prevState) => ({ color: { 
          R: prevState.color.R, 
          G: Math.floor(value / 100 * 255),
          B: prevState.color.B, 
          A: prevState.color.A 
        } }))
        break;
      }
      case 'blue':{
        this.setState((prevState) => ({ color: { 
          R: prevState.color.R, 
          G: prevState.color.G, 
          B: Math.floor(value / 100 * 255),
          A: prevState.color.A 
        } }))
        break;
      }
      case 'alpha':{
        this.setState((prevState) => ({ color: { 
          R: prevState.color.R, 
          G: prevState.color.G, 
          B: prevState.color.B, 
          A: Math.floor(value / 100 * 255),
        } }))
        break;
      }
    }

    this.refs.circle.setValue(this.defineAngleByColor(this.state.color));
  }

  defineAngleByColor(color) { // RgbToHsl
    // http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
    let r = color.R / 255;
    let g = color.G / 255;
    let b = color.B / 255;

    let min = Math.min(r, g, b)
    let max = Math.max(r, g, b)

    let H;

    if (max == min) {
      H = 225 - max * 45;
      return H;
    } else {
      if (r == max) {
        H = (g - b) / (max - min);
        if (b == max){
          return H * 45 - 180 + g * 45;
        } else if( g == min ){
          if( b == min || b <= 0.5 )
            return H * 45 - 135 + r * 45;
          else
            return H * 45 - 225 + r * 45;
        }
        else
          return H * 45 - 90;
      } else if (g == max) {
        H = 2 + (b - r) / (max - min);
        return H * 45 - 90;
      } else {
        H = 4 + (r - g) / (max - min);
        return H * 45 - 90;
      }
    }
  }

  hexToRgb(color = "#FFFFFF") {
    /*http://www.javascripter.net/faq/hextorgb.htm*/
    function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }
    return {
      R: parseInt((cutHex(color)).substring(0, 2), 16),
      G: parseInt((cutHex(color)).substring(2, 4), 16),
      B: parseInt((cutHex(color)).substring(4, 6), 16),
    }
  }

  render() {
    let w = this.state.size.width; /* border rect width */
    let h = this.state.size.height; /* border rect height */
    let f = this.state.size.margin; /* border line width */

    let p_x = (this.state.padding.width - w) / 2
    let p_y = (this.state.padding.height - h) / 2

    let scrolls_coordinates = this.defineScrollCoordinates(150, 50, 27);

    let start_angle = this.defineAngleByColor(this.state.color)

    return (
      <View style={{flex:1, backgroundColor: 'yellow', margin: 25}}>

      <Svg onLayout={(event) => this.onLayout(event)}
        style={{ flex: 1, }}
      >
        <Defs>
          <Pattern
            id="transparent" patternUnits="userSpaceOnUse"
            x="0" y="0" width="8" height="8"
          >
            <Image
              x="0" y="0" width="8" height="8"
              href={require('../../pictures/pattern_8x8.png')}
            />
          </Pattern>

          <LinearGradient id="black_red" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0.25" stopColor="rgb(0,0,0)" stopOpacity="1" />
            <Stop offset="0.75" stopColor="rgb(255,0,0)" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="red_yellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0.25" stopColor="rgb(255,0,0)" stopOpacity="1" />
            <Stop offset="0.75" stopColor="rgb(255,255,0)" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="yellow_green" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0.25" stopColor="rgb(255,255,0)" stopOpacity="1" />
            <Stop offset="0.75" stopColor="rgb(0,255,0)" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="green_aqua" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0.25" stopColor="rgb(0,255,0)" stopOpacity="1" />
            <Stop offset="0.75" stopColor="rgb(0,255,255)" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="aqua_blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0.25" stopColor="rgb(0,0,255)" stopOpacity="1" />
            <Stop offset="0.75" stopColor="rgb(0,255,255)" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="blue_pink" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0.75" stopColor="rgb(0,0,255)" stopOpacity="1" />
            <Stop offset="0.25" stopColor="rgb(255,0,255)" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="pink_white" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0.25" stopColor="rgb(255,255,255)" stopOpacity="1" />
            <Stop offset="0.75" stopColor="rgb(255,0,255)" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="white_black" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0.75" stopColor="rgb(255,255,255)" stopOpacity="1" />
            <Stop offset="0.25" stopColor="rgb(0,0,0)" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="r" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor={`rgb(0, ${this.state.color.G}, ${this.state.color.B})`} stopOpacity="1" />
            <Stop offset="1" stopColor={`rgb(255, ${this.state.color.G}, ${this.state.color.B})`} stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor={`rgb(${this.state.color.R}, 0, ${this.state.color.B})`} stopOpacity="1" />
            <Stop offset="1" stopColor={`rgb(${this.state.color.R}, 255, ${this.state.color.B})`} stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="b" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor={`rgb(${this.state.color.R}, ${this.state.color.G}, 0)`} stopOpacity="1" />
            <Stop offset="1" stopColor={`rgb(${this.state.color.R}, ${this.state.color.G}, 255)`} stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="a" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor={`rgb(${this.state.color.R}, ${this.state.color.G}, ${this.state.color.B})`} stopOpacity="0" />
            <Stop offset="1" stopColor={`rgb(${this.state.color.R}, ${this.state.color.G}, ${this.state.color.B})`} stopOpacity="1" />
          </LinearGradient>

          <Path
            x={f / 2} y={f / 2}
            id="shape"
            d={`M ${(w - f) / 2} 0 
                C ${(w - f)} 0 ${(w - f)} 0 ${(w - f)} ${(h - f) / 2} 
                  ${(w - f)} ${(h - f)} ${(w - f)} ${(h - f)} ${(w - f) / 2} ${(h - f)} 
                  0 ${(h - f)} 0 ${(h - f)} 0 ${(h - f) / 2} 
                  0 0 0 0 ${(w - f) / 2} 0
              `}
          />

          <Path
            x={f} y={f}
            id="inner_shape"
            d={`M ${(w - f) / 2} 0 
                C ${(w - 2 * f)} 0 ${(w - 2 * f)} 0 ${(w - 2 * f)} ${(h - f) / 2} 
                  ${(w - 2 * f)} ${(h - 2 * f)} ${(w - 2 * f)} ${(h - 2 * f)} ${(w - f) / 2} ${(h - 2 * f)} 
                  0 ${(h - 2 * f)} 0 ${(h - 1.5 * f)} 0 ${(h - f) / 2} 
                  0 ${(-0.5 * f)} 0 0 ${(w - f) / 2} 0
              `}
          />

          <Mask id="color_mask" >
            <Rect x={0} y={0} width={w} height={h / 4} fill="#FFF" />
          </Mask>

          <Mask id="button_mask" >
            <Rect x={0} y={h - h / 4} width={w} height={h / 4} fill="#FFF" />
          </Mask>

          <Path
            id="top_bar_shape"
            x={f} y={f}
            d={`M 0 ${(h - f) / 2} 
            C 0 ${f} ${-f / 4} ${f / 8} ${50} 0 
            V ${(h - 2.05 * f)}
            C 0 ${(h - 2 * f - f / 8)} 0 ${(h - 3 * f)} 0 ${(h - f) / 2}  
             `}
          />

          <Path
            id="r_shape_shadow"
            fill="none"
            d={`M ${scrolls_coordinates.r.x1 - 1} ${scrolls_coordinates.r.y1} 
                L ${scrolls_coordinates.r.x2 + 1} ${scrolls_coordinates.r.y2}`}
          />
          <Path
            id="r_shape"
            fill="none"
            stroke="url(#r)"
            d={`M ${scrolls_coordinates.r.x1} ${scrolls_coordinates.r.y1} 
                L ${scrolls_coordinates.r.x2} ${scrolls_coordinates.r.y2}`}
          />

          <Path
            id="g_shape_shadow"
            fill="none"

            d={`M ${scrolls_coordinates.g.x1 - 1} ${scrolls_coordinates.g.y1} 
                L ${scrolls_coordinates.g.x2 + 1} ${scrolls_coordinates.g.y2}`}
          />
          <Path
            id="g_shape"
            fill="none"
            stroke="url(#g)"
            d={`M ${scrolls_coordinates.g.x1} ${scrolls_coordinates.g.y1} 
                L ${scrolls_coordinates.g.x2} ${scrolls_coordinates.g.y2}`}
          />

          <Path
            id="b_shape_shadow"
            fill="none"
            d={`M ${scrolls_coordinates.b.x1 - 1} ${scrolls_coordinates.b.y1} 
                L ${scrolls_coordinates.b.x2 + 1} ${scrolls_coordinates.b.y2}`}
          />
          <Path
            id="b_shape"
            fill="none"
            stroke="url(#b)"
            d={`M ${scrolls_coordinates.b.x1} ${scrolls_coordinates.b.y1} 
                L ${scrolls_coordinates.b.x2} ${scrolls_coordinates.b.y2}`}
          />

          <Path
            id="a_shape_shadow"
            fill="none"
            d={`M ${scrolls_coordinates.a.x1 - 1} ${scrolls_coordinates.a.y1} 
                L ${scrolls_coordinates.a.x2 + 1} ${scrolls_coordinates.a.y2}`}
          />
          <G id="a_shape" >
            <Path
              fill="none"
              stroke="url(#transparent)"
              d={`M ${scrolls_coordinates.a.x1} ${scrolls_coordinates.a.y1} 
                L ${scrolls_coordinates.a.x2} ${scrolls_coordinates.a.y2}`}
            />
            <Path
              fill="none"
              stroke="url(#a)"
              d={`M ${scrolls_coordinates.a.x1} ${scrolls_coordinates.a.y1} 
                L ${scrolls_coordinates.a.x2} ${scrolls_coordinates.a.y2}`}
            />
          </G>

          <Mask id="template_mask" >
            <Use href={`#shape`} stroke="#FFF" strokeWidth={f / 3} fill="none" />
          </Mask>

          <G id="template">
            <G mask="url(#template_mask)">
              <Path
                d={`M 0 0 H ${w / 2}`}
                fill="none"
                stroke="url(#black_red)"
                strokeWidth={5 * f}
              />

              <Path
                d={`M ${w} 0 V ${h / 2}`}
                fill="none"
                stroke="url(#yellow_green)"
                strokeWidth={f * 5}
              />
              <Path
                d={`M ${w / 2} 0 H ${w}`}
                fill="none"
                stroke="url(#red_yellow)"
                strokeWidth={f * 5}
              />
              <Path
                d={`M ${w} ${h / 2} V ${h}`}
                fill="none"
                stroke="url(#green_aqua)"
                strokeWidth={f * 5}
              />
              <Path
                d={`M ${w} ${h} H ${w / 2}`}
                fill="none"
                stroke="url(#aqua_blue)"
                strokeWidth={f * 5}
              />
              <Path
                d={`M 0 ${h} V ${h / 2}`}
                fill="none"
                stroke="url(#pink_white)"
                strokeWidth={f * 5}
              />
              <Path
                d={`M ${w / 2} ${h} H 0`}
                fill="none"
                stroke="url(#blue_pink)"
                strokeWidth={f * 5}
              />

              <Path
                d={`M 0 ${h / 2} V 0`}
                fill="none"
                stroke="url(#white_black)"
                strokeWidth={f * 5}
              />
            </G>
          </G>
        </Defs>

        <G>
          <Use href={`#inner_shape`} mask="url(#color_mask)"
            fill="url(#transparent)"
            stroke='black'
          />
          <Use href={`#inner_shape`} mask="url(#color_mask)"
            stroke='black'
            opacity={this.state.color.A / 255}
            fill={`rgb(${this.state.color.R},${this.state.color.G},${this.state.color.B},${this.state.color.A})`}
          />
          <Line x1={f + f / 8} y1={h / 4} x2={w - f - f / 8} y2={h / 4} stroke='black' />
        </G>

        <G>
          <SvgScroll
            type="superellipse"
            path="shape"
            pathSVG="template"
            width={w}
            height={h}
            callback={(x) => this.defineColorByAngle(x)}
            position={start_angle} 
            ref="circle" />

          <SvgScroll
            type="line"
            path="r_shape_shadow"
            pathSVG="r_shape"
            line={{
              type: 'horizontal',
              x1: scrolls_coordinates.r.x1,
              y1: scrolls_coordinates.r.y1,
              x2: scrolls_coordinates.r.x2,
              y2: scrolls_coordinates.r.y2,
            }}
            width={w}
            height={h}
            callback={(x) => this.defineColorByValue(x, 'red')} 
            position={this.state.color.R / 255 * 100} 
            ref="red"/>

          <SvgScroll
            type="line"
            path="g_shape_shadow"
            pathSVG="g_shape"
            line={{
              type: 'horizontal',
              x1: scrolls_coordinates.g.x1,
              y1: scrolls_coordinates.g.y1,
              x2: scrolls_coordinates.g.x2,
              y2: scrolls_coordinates.g.y2,
            }}
            width={w}
            height={h}
            callback={(x) => this.defineColorByValue(x, 'green')} 
            position={this.state.color.G / 255 * 100} 
            ref="green"/>

          <SvgScroll
            type="line"
            path="b_shape_shadow"
            pathSVG="b_shape"
            line={{
              type: 'horizontal',
              x1: scrolls_coordinates.b.x1,
              y1: scrolls_coordinates.b.y1,
              x2: scrolls_coordinates.b.x2,
              y2: scrolls_coordinates.b.y2,
            }}
            width={w}
            height={h}
            callback={(x) => this.defineColorByValue(x, 'blue')} 
            position={this.state.color.B / 255 * 100}
            ref="blue" />

          <SvgScroll
            type="line"
            path="a_shape_shadow"
            pathSVG="a_shape"
            line={{
              type: 'horizontal',
              x1: scrolls_coordinates.a.x1,
              y1: scrolls_coordinates.a.y1,
              x2: scrolls_coordinates.a.x2,
              y2: scrolls_coordinates.a.y2,
            }}
            width={w}
            height={h}
            callback={(x) => this.defineColorByValue(x, 'alpha')} 
            position={this.state.color.A / 255 * 100}
            ref="alpha"
            />
        </G>


        <Use href={`#shape2`} stroke='black' strokeWidth={5} fill="none" />

      </Svg>
      </View>
      
    );
  }
}
