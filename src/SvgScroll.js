import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import Svg, { Path, G, Circle, Text as SvgText, Rect } from 'react-native-svg';

/*https://facebook.github.io/react-native/docs/panresponder*/
let pathElement;
let pointer = 0;
let pathTotalLength = 5000;

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
    let result = this.findRelatedOnPath(
      evt.nativeEvent.locationX,
      evt.nativeEvent.locationY,
    );
    if (result)
      this.setState({
        position: { x: result.x, y: result.y },
      });
  }
  componentDidMount() {
    this.definePathStart();
  }
  findRelatedOnPath(x, y) {
    // TODO


    for (let point of this.state.pathPoints) {
      if (point.x > x) return point;
    }
    for (let point of this.state.pathPoints) {
      if (point.y > y) return point;
    }
    return false;
  }
  definePathStart() {
    // eslint-disable-next-line prettier/prettier
    //let regex = /m ([0-9\.]+)\s*[\,]?\s*([0-9\.]+)/i;
    //let result = regex.exec(this.path.props.d);
    //return {cx: result[1], cy: result[2]};

    //this.state.pan.setValue(this.pathElement.getPointAtLength(0));

    pathTotalLength = this.getTotalLength();
    let points = [];
    for (
      let i = 0;
      i < pathTotalLength;
      i += pathTotalLength / this.state.size.pathLength
    ) {
      points.push(this.pathElement.getPointAtLength(i));
    }
    this.setState({
      position: points[0],
      pathPoints: points,
    });
  }

  getTotalLength() {
    console.warn(this.pathElement.getTotalLength());
    return this.pathElement.getTotalLength();
  }

  _found(trigger, x1, x2, debug = false) {
    let middle = Math.floor(x1 + (x2 - x1) / 2);
    if (x2 < 1) return 0;
    let middle_point = this.pathElement.getPointAtLength(middle);
    if (middle_point.x == trigger.x && middle_point.y == trigger.y) {
      if (debug)
        console.log(`1 : ${this.pathElement.getPointAtLength(middle)}`);
      let middle_minus_point = this.pathElement.getPointAtLength(middle - 1);
      if (
        middle_minus_point.x != trigger.x ||
        middle_minus_point.y != trigger.y
      ) {
        if (debug) console.log(`check range ${x1} : ${middle}`);
        return this._found(trigger, x1, middle);
      } else {
        return middle;
      }
    } else {
      let x2_point = this.pathElement.getPointAtLength(x2);
      if (x2_point.x == trigger.x && x2_point.y == trigger.y) {
        if (debug) console.log(`2 : ${this.pathElement.getPointAtLength(x2)}`);

        let x2_minus_point = this.pathElement.getPointAtLength(x2 - 1);
        if (x2_minus_point.x != trigger.x || x2_minus_point.y != trigger.y) {
          return x2;
        } else {
          if (debug) console.log(`check range ${middle} : ${x2}`);
          return this._found(trigger, middle, x2);
        }
      } else {
        if (debug) console.log(`3 : ${this.pathElement.getPointAtLength(x2)}`);
        console.log('Check in debug mode');
      }
    }
  }

  /*
  
    1 = | x |^m + | y |^n
        | a |     | b |
  
  */

  sgn(w) {
    if (w > 0) return 1;
    if (w < 0) return -1;
    return 0;
  }

  angle(x, y) {
    return Math.atan(y / x);
  }

  calculate(angle, a, b, m, n) {
    let x = Math.pow(Math.abs(Math.cos(angle)), 2 / m) * a * this.sgn(Math.cos(angle));
    let y = Math.pow(Math.abs(Math.sin(angle)), 2 / n) * b * this.sgn(Math.sin(angle));
    return { x, y };
  }

  render() {
    let width = 200;
    let height = 400;

    let c1 = this.calculate(0*Math.PI/180 , 100, 200, 5, 5);
    let c2 = this.calculate(180*Math.PI/180, 100, 200, 5, 5);
    let c3 = this.calculate(30*Math.PI/180, 100, 200, 5, 5);
    let c4 = this.calculate(15*Math.PI/180, 100, 200, 5, 5);
    let c5 = this.calculate(45*Math.PI/180, 100, 200, 5, 5);
    let c6 = this.calculate(60*Math.PI/180, 100, 200, 5, 5);
    let c7 = this.calculate(75*Math.PI/180, 100, 200, 5, 5);
    let c8 = this.calculate(90*Math.PI/180, 100, 200, 5, 5);
    let c9 = this.calculate(270*Math.PI/180, 100, 200, 5, 5);

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
            d={`M ${width / 2} 0 
                C ${width} 0 ${width} 0 ${width} ${height / 2} 
                  ${width} ${height} ${width} ${height} ${width / 2} ${height} 
                  0 ${height} 0 ${height} 0 ${height / 2} 
                  0 0 0 0 ${width / 2} 0
                  `}
          />

          <Circle
            cx={this.state.position.x}
            cy={this.state.position.y}
            r={this.state.size.radius}
            {...this._panResponder.panHandlers}
          />

          <Circle
            cx={c1.x+ width / 2}
            cy={c1.y + height / 2}
            r={5}
          />

          <Circle
            cx={c2.x+ width / 2}
            cy={c2.y + height / 2}
            r={5}
          />

          <Circle
            cx={c3.x + width / 2}
            cy={c3.y + height / 2}
            r={5}
          />

          <Circle
            cx={c4.x+ width / 2}
            cy={c4.y + height / 2}
            r={5}
          />

          <Circle
            cx={c5.x+ width / 2}
            cy={c5.y + height / 2}
            r={5}
          /><Circle
            cx={c6.x+ width / 2}
            cy={c6.y + height / 2}
            r={5}
          /><Circle
            cx={c7.x+ width / 2}
            cy={c7.y + height / 2}
            r={5}
          /><Circle
            cx={c8.x+ width / 2}
            cy={c8.y + height / 2}
            r={5}
          /><Circle
            cx={c9.x+ width / 2}
            cy={c9.y + height / 2}
            r={5}
          />
        </G>

      </Svg>
    );
  }
}
2