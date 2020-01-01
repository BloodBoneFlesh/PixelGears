import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import Svg, {
  Path, G, Circle, Line, Defs, LinearGradient,
  Stop, RadialGradient,
  Use,
} from 'react-native-svg';

/*https://facebook.github.io/react-native/docs/panresponder*/
let pathElement;

export class SvgScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* line / superellipse */
      type: props.type,
      path: props.path,
      pathSVG: props.pathSVG,
      callback: props.callback,
      position: {
        x: 0,
        y: 0,
      },
      size: {
        radius: 9,
        width: props.width,
        height: props.height,
        margin: 20
      },
      line: {
        start: props.lineStart,
        end: props.lineEnd,
      },
      pathPoints: [],
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
    let result;
    if(this.state.type == 'superellipse')
       result = this.calculatePolar(this.angle(evt.nativeEvent.locationX, evt.nativeEvent.locationY),
      (this.state.size.width - this.state.size.margin) / 2, (this.state.size.height - this.state.size.margin) / 2, 5)

      else
      result = this.calculateLine(evt.nativeEvent.locationX, evt.nativeEvent.locationY)
    

    if (result){
      this.setState({
        position: { x: result.x, y: result.y, },
      });
      this.state.callback(this.state.position)
    }
  }
  componentDidMount() {
    let result;
    if(this.state.type == 'superellipse')
      result =  this.calculatePolar(0, (this.state.size.width - this.state.size.margin) / 2, (this.state.size.height - this.state.size.margin) / 2, 5)
    else
      result = this.calculateLine(evt.nativeEvent.locationX, evt.nativeEvent.locationY)
    
    this.setState({
      position: { x: result.x, y: result.y, },
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

  calculateLine(x, y){
    if( x < this.state.line.start )
      return { x: this.state.line.start, y: this.state.position.y }
    if( x > this.state.line.end )
      return { x: this.state.line.end, y: thisthis.state.position.y }
    return { x: x, y: thisthis.state.position.y }
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

  render() {
    let w = this.state.size.width; /* border rect width */
    let h = this.state.size.height; /* border rect height */
    let f = this.state.size.margin; /* border line width */
    let s_dx = -1; /* shadow dx*/
    let s_dy = 1; /* shadow dy*/

    return (
      /* without viewBox */
      /* path should be drawn first somehow */

      <G>
        <Defs>
          <LinearGradient id="pointer_fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor="rgb(240,240,240)" stopOpacity="1" />
            <Stop offset="1" stopColor="rgb(120,120,120)" stopOpacity="1" />
          </LinearGradient>
          <RadialGradient id="pointer_shadow">
            <Stop offset="0.75" stopColor="rgb(0,0,0)" stopOpacity="1" />
            <Stop offset="1" stopColor="rgb(255,255,255)" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <G>
          <G id="shadows" x={f / 2 + s_dx} y={f / 2 + s_dy}>
            {[
              'FFF0', 'EEE1', 'DDD2', 'CCC3', 'BBB4', 'AAA5', '9996', '8887',
              '7778', '6669', '555A', '444B', '333C', '222D', '111E', '000F'].map((e, i) => {
                return <Use href={`#${this.state.path}`} stroke={`#${e}`} strokeWidth={f / 3 + 6 - i * 0.5} />
              }
              )
            }
          </G>
          <Use x={f / 2} y={f / 2} href={`#${this.state.pathSVG}`} stroke={`#0F0`} strokeWidth={5} />

          <G id="pointer">
            <Circle
              cx={this.state.position.x}
              cy={this.state.position.y}
              r={this.state.size.radius*1.3}
              fill="url(#pointer_shadow)"
              stroke="none"
            />
            <Circle
              cx={this.state.position.x}
              cy={this.state.position.y}
              r={this.state.size.radius}
              fill="url(#pointer_fill)"
              stroke="none"
              {...this._panResponder.panHandlers}
            />
          </G>
        </G>
      </G>
    );
  }
}
