import React, { Component } from 'react';
import { PanResponder, findNodeHandle, UIManager } from 'react-native';
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
        margin: 20,
      },
      padding: { width: 0, height: 0 },

      line: {
        /* horizontal / vertical */
        type: this.props.line ? this.props.line.type : 'line',
        x1: this.props.line ? this.props.line.x1 : 0,
        x2: this.props.line ? this.props.line.x2 : 0,
        y1: this.props.line ? this.props.line.y1 : 0,
        y2: this.props.line ? this.props.line.y2 : 0,
      },
    };
    this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
    this.measure = this.measure.bind(this);
  }

  onLayout = (e) => {
    /*let padding = */
    this.setState({ padding: e.nativeEvent.layout })
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this._handlePanResponderMove,
    });
  }
  _handlePanResponderMove(evt, gestureState) {
    let result;
    let angle;

    if (this.state.type == 'superellipse') {
      angle = this.angle(evt.nativeEvent.pageX, evt.nativeEvent.pageY)
      result = this.calculatePolar(angle, (this.state.size.width - this.state.size.margin) / 2,
        (this.state.size.height - this.state.size.margin) / 2, 5)
    }
    else
      result = this.calculateLine(evt.nativeEvent.pageX, evt.nativeEvent.pageY)


    if (result) {
      this.setState({
        position: { x: result.x, y: result.y, },
      });
      this.state.callback(this.state.type == 'superellipse' ?
        { ...this.cornerAngles(), angle, } :
        (this.state.position.x - this.props.line.x1) * (this.props.line.x2 - this.props.line.x1) / 100
        )
    }
  }

  defineLineParameters() {
    /*let regex = /m ([0-9\.]+)\s*[\,]?\s*([0-9\.]+) l ([0-9\.]+)\s*[\,]?\s*([0-9\.]+)/i;;
    let result = regex.exec(this.state.path);
    console.warn( {x1: result[1], y1: result[2], x2: result[3], y2: result[4]} );*/
    this.setState({
      position: { x: this.state.line.x1, y: this.state.line.y1 },
    });
  }

  componentDidMount() {
    let result;
    if (this.state.type == 'superellipse')
      result = this.calculatePolar(this.props.position, (this.state.size.width - this.state.size.margin) / 2, (this.state.size.height - this.state.size.margin) / 2, 5)
    else {
      this.defineLineParameters()
      result = this.calculateLine(0, 0)
    }

    setTimeout(this.measure);
    this.setState({
      position: { x: result.x, y: result.y, },
    });
  }

  setValue(value){
    let result;
    if (this.state.type == 'superellipse')
      result = this.calculatePolar(value, (this.state.size.width - this.state.size.margin) / 2, (this.state.size.height - this.state.size.margin) / 2, 5)
    else {
      result = this.calculateLine(
        this.state.line.x1 + (this.state.line.x2 - this.state.line.x1) * value +  this.state.size.margin/2, 
        0)
    }
    this.setState({
      position: { x: result.x, y: result.y, },
    });
  }

  measure() {
    UIManager.measure(findNodeHandle(this.refs['Marker']), (fx, fy, width, height, px, py) => {
      /*    
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to frame: ' + fx)
            console.log('Y offset to frame: ' + fy)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
      */
      this.setState({
        measure: { fx, fy, width, height, px, py }
      });
    });
  }

  angle(x, y) {
    let center = {
      x: this.state.padding.width / 2 + this.state.measure.px + this.state.padding.x,
      y: this.state.padding.height / 2 + this.state.measure.py + this.state.padding.y
    }
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

  cornerAngles() {
    let bottom_right = Math.atan2(this.state.size.height / 2, this.state.size.width / 2) * 180 / Math.PI;

    return {
      top_left: 180 + bottom_right,
      top_right: 360 - bottom_right,
      bottom_left: 180 - bottom_right,
      bottom_right,
    }
  }

  calculateLine(x, y) {
    //console.log(x, y, this.state.padding, this.state.measure)

    if (this.state.measure && this.state.padding) {
      x -= this.state.measure.px + this.state.padding.width - this.state.size.margin;
      y -= this.state.measure.py + this.state.padding.height;
    }


    if (this.state.line.type == 'horizontal' ? x < this.state.line.x1 : y < this.state.line.y1)
      return { x: this.state.line.x1, y: this.state.line.y1 }
    if (this.state.line.type == 'horizontal' ? x > this.state.line.x2 : y > this.state.line.y2)
      return { x: this.state.line.x2, y: this.state.line.y2 }
    return this.state.line.type == 'horizontal' ? { x: x, y: this.state.line.y2 } : { x: this.state.line.x2, y: y };
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
    let s_dx = -0.25; /* shadow dx*/
    let s_dy = 0.25; /* shadow dy*/

    return (
      /* without viewBox */
      /* path should be drawn first somehow */

      <G onLayout={(event) => this.onLayout(event)} ref="Marker">
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
          <G id="shadows" x={s_dx} y={s_dy}>
            {[
              'FFF0', 'EEE1', 'DDD2', 'CCC3', 'BBB4', 'AAA5', '9996', '8887',
              '7778', '6669', '555A', '444B', '333C', '222D', '111E', '000F'].map((e, i) => {
                return <Use href={`#${this.state.path}`} fill="none" stroke={`#${e}`} strokeWidth={f / 3 + 6 - i * 0.5} />
              }
              )
            }
          </G>
          <Use href={`#${this.state.pathSVG}`} strokeWidth={5} fill="none"/>

          <G id="pointer">
            <Circle
              cx={this.state.position.x}
              cy={this.state.position.y}
              r={this.state.size.radius * 1.3}
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
