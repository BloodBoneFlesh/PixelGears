import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import Svg, { Path, G, Circle, Text as SvgText, Rect, Line } from 'react-native-svg';

/*https://facebook.github.io/react-native/docs/panresponder*/
let pathElement;

export class SvgScroll extends Component {
  constructor() {
    super();
    this.state = {
      position: {
        x: 0,
        y: 0,
      },
      size: {
        radius: 15,
        pathLength: 40,
        width: 250,
        height: 400
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
    let result = this.calculatePolar(this.angle(evt.nativeEvent.locationX, evt.nativeEvent.locationY), this.state.size.width / 2, this.state.size.height / 2, 5)

    if (result)
      this.setState({
        position: { x: result.x, y: result.y, },
      });
  }
  componentDidMount() {
    this.setState({
      position: this.calculatePolar(0, this.state.size.width / 2, this.state.size.height / 2, 5)
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
      x: Math.cos(angle) * r + a,
      y: Math.sin(angle) * r + b
    };
  }

  render() {
    return (
      /* without viewBox */
      /* path should be drawn first somehow */

      <Svg style={{ flex: 1 }}>
        <SvgText x="20" y="35">
          x: {this.state.position.x} y:{this.state.position.y}
        </SvgText>
        <G x={10} y={10}>
          <Path
            ref={element => (this.pathElement = element)}
            stroke="#000"
            fill="none"
            strokeWidth={5}
            d={`M ${this.state.size.width / 2} 0 
                C ${this.state.size.width} 0 ${this.state.size.width} 0 ${this.state.size.width} ${this.state.size.height / 2} 
                  ${this.state.size.width} ${this.state.size.height} ${this.state.size.width} ${this.state.size.height} ${this.state.size.width / 2} ${this.state.size.height} 
                  0 ${this.state.size.height} 0 ${this.state.size.height} 0 ${this.state.size.height / 2} 
                  0 0 0 0 ${this.state.size.width / 2} 0
                  `}
          />

          <Circle
            cx={this.state.position.x}
            cy={this.state.position.y}
            r={this.state.size.radius}
            {...this._panResponder.panHandlers}
          />
        </G>
      </Svg>
    );
  }
}
