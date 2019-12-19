import React, {Component} from 'react';
import {PanResponder} from 'react-native';
import Svg, {Path, Circle, Text as SvgText, Rect} from 'react-native-svg';

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
        position: {x: result.x, y: result.y},
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

  render() {
    return (
      /* without viewBox */
      /* path should be drawn first somehow */

      <Svg style={{flex: 1}}>
        <SvgText x="20" y="35">
          x: {this.state.position.x} y:{this.state.position.y}
        </SvgText>

        <Rect
          ref={element => (this.pathElement = element)}
          stroke="#FFF"
          fill="none"
          strokeWidth={5}
          width={300}
          height={300}
          x={50}
          y={50}
          ry={50}
        />

        <Circle
          cx={this.state.position.x}
          cy={this.state.position.y}
          r={this.state.size.radius}
          {...this._panResponder.panHandlers}
        />
      </Svg>
    );
  }
}
