import * as React from 'react';

import { PanResponder } from 'react-native';
import Svg, {
  Circle,
  Path,
  LinearGradient,
  Defs,
  Stop,
  Use,
  Line,
  Mask,
  G,
} from 'react-native-svg';

import { SvgScroll } from './SvgScroll';

export class ColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.changeColor = this.changeColor.bind(this);

    this.state = {
      R: 0,
      G: 0,
      B: 0,
      position: {
        x: 0,
        y: 0,
      },
      size: {
        radius: 8,
        width: 250,
        height: 400,
        margin: 20
      },
      color: '#FFF',
    };
    this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this._handlePanResponderMove,
    });
  }
  _handlePanResponderMove(evt, gestureState) {
    let result = this.calculatePolar(this.angle(evt.nativeEvent.locationX, evt.nativeEvent.locationY),
      (this.state.size.width - this.state.size.margin) / 2, (this.state.size.height - this.state.size.margin) / 2, 5)

    if (result)
      this.setState({
        position: { x: result.x, y: result.y, },
      });
  }
  componentDidMount() {
    this.setState({
      position: this.calculatePolar(0, (this.state.size.width - this.state.size.margin) / 2, (this.state.size.height - this.state.size.margin) / 2, 5)
    });
  }
  angle(x, y) {
    let center = { x: this.state.size.width / 2, y: this.state.size.height / 2 }
    let AC = { x: center.x - x, y: center.y - y }
    let BC = { x: center.x - x, y: 0 }
    let result = Math.acos((AC.x * BC.x + AC.y * BC.y) / (Math.sqrt(AC.x * AC.x + AC.y * AC.y) * Math.sqrt(BC.x * BC.x + BC.y * BC.y))) * (180 / Math.PI)
    //result in 1st quadrant
    if (x > center.x && y < center.y) // 4th quadrant
      result = 360 - result
    else
      if (x < center.x && y < center.y) // 3rd quadrant
        result += 180
      else
        if (x < center.x && y > center.y) // 2nd quadrant
          result = 180 - result

    return result;
  }

  calculatePolar(angle, a, b, n) {
    //http://frink.machighway.com/~dynamicm/super-ellipse.html
    angle = angle * Math.PI / 180;

    let r = Math.pow(
      Math.pow(Math.abs(Math.cos(angle) / a), n) +
      Math.pow(Math.abs(Math.sin(angle) / b), n),
      -1 / n
    );
    return {
      x: Math.cos(angle) * r + a + this.state.size.margin / 2,
      y: Math.sin(angle) * r + b + this.state.size.margin / 2
    };
  }

  changeColor(NewColor) {
    this.setState({ color: NewColor });
  }

/*  <View style={{ flex: 1 }}></View>
        <Svg style={{ margin: 30, flex: 1 }}>
        <Defs>
          <Path
            id="shape"
            fill="none"
            d={`M ${90} 0 
                C ${180} 0 ${180} 0 ${180} ${90} 
                  ${180} ${180} ${180} ${180} ${90} ${180} 
                  0 ${180} 0 ${180} 0 ${90} 
                  0 0 0 0 ${90} 0
                  `}
          />
        </Defs>
          <SvgScroll
            type="superellipse"
            path="shape"
            pathSVG="shape"
            width={200}
            height={200}
            callback={(x: Object) => JSON.stringify(x)} />
        </Svg> */

  render() {
    let w = this.state.size.width; /* border rect width */
    let h = this.state.size.height; /* border rect height */
    let f = this.state.size.margin; /* border line width */
    let s_dx = -1; /* shadow dx*/
    let s_dy = 1; /* shadow dy*/
    return (
      <Svg style={{ flex: 1 }} height={h} width={w} viewBox={`0 0 ${w} ${h}`}>
        <Defs>
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

          <LinearGradient id="pointer_fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="1" stopColor="rgb(120,120,120)" stopOpacity="1" />
            <Stop offset="0" stopColor="rgb(240,240,240)" stopOpacity="1" />
          </LinearGradient>

          <Path
            id="shape"
            fill="none"
            d={`M ${(w - f) / 2} 0 
                C ${(w - f)} 0 ${(w - f)} 0 ${(w - f)} ${(h - f) / 2} 
                  ${(w - f)} ${(h - f)} ${(w - f)} ${(h - f)} ${(w - f) / 2} ${(h - f)} 
                  0 ${(h - f)} 0 ${(h - f)} 0 ${(h - f) / 2} 
                  0 0 0 0 ${(w - f) / 2} 0
                  `}
          />

          <Mask id="template_mask" x={0} y={0} width={w} height={h}>
            <Use href={`#shape`} stroke="#FFF" x={f / 2} y={f / 2} strokeWidth={f / 3}/>
          </Mask>

          <G id="template">
            <G mask="url(#template_mask)">
          <Path
            d={`M ${0 + f / 2} ${0 + f / 2} H ${w / 2}`}
            fill="none"
            stroke="url(#black_red)"
            strokeWidth={f * 3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w / 2} ${f / 2} H ${w - f / 2}`}
            fill="none"
            stroke="url(#red_yellow)"
            strokeWidth={f * 3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w - f / 2} ${f / 2} V ${h / 2}`}
            fill="none"
            stroke="url(#yellow_green)"
            strokeWidth={f * 3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w - f / 2} ${h / 2} V ${h - f / 2}`}
            fill="none"
            stroke="url(#green_aqua)"
            strokeWidth={f * 3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w - f / 2} ${h - f / 2} H ${w / 2}`}
            fill="none"
            stroke="url(#aqua_blue)"
            strokeWidth={f * 3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w / 2} ${h - f / 2} H ${f / 2}`}
            fill="none"
            stroke="url(#blue_pink)"
            strokeWidth={f * 3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <Path
            d={`M ${f / 2} ${h - f / 2} V ${h / 2}`}
            fill="none"
            stroke="url(#pink_white)"
            strokeWidth={f * 3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${f / 2} ${h / 2} V ${f / 2}`}
            fill="none"
            stroke="url(#white_black)"
            strokeWidth={f * 3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </G>
        </G>
        </Defs>
        <G id="shadows" x={f / 2 + s_dx} y={f / 2 + s_dy}>
          {[
            'FFF0', 'EEE1', 'DDD2', 'CCC3', 'BBB4', 'AAA5', '9996', '8887',
            '7778', '6669', '555A', '444B', '333C', '222D', '111E', '000F'].map((e, i) => {
              return <Use href="#shape" stroke={`#${e}`} strokeWidth={f / 3 + 6 - i * 0.5} />
            }
            )
          }
        </G>
        <Use href={`#template`} />

        <G id="pointer">
          {[
            'FFF0', 'EEE1', 'DDD2', 'CCC3', 'BBB4', 'AAA5', '9996', '8887',
            '7778', '6669', '555A', '444B', '333C', '222D', '111E', '000F'].map((e, i) => {
              return (
                
                <Circle
                  cx={this.state.position.x}
                  cy={this.state.position.y}
                  r={this.state.size.radius}
                  fill='none'
                  stroke={`#${e}`}
                  strokeWidth={this.state.size.radius*1.5  - i *1.2}
                />
              )
            }
            )
          }
          <Circle
            cx={this.state.position.x}
            cy={this.state.position.y}
            r={this.state.size.radius}
            fill="url(#pointer_fill)"
            stroke="none"
            {...this._panResponder.panHandlers}
          />
          
        </G>

        <G>
          <Line />
          <Circle
            cx={20}
            cy={20}
            r={this.state.size.radius}
            fill="url(#pointer_fill)"
            stroke="none"
            {...this._panResponder.panHandlers}
          />
        </G>

       
      </Svg>
    );
  }
}
