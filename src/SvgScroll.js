import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import Svg, { Path, G, Circle, Text as SvgText, Rect, Line } from 'react-native-svg';

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
        angle: 0,
        mouse_x: 0,
        mouse_y: 0
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
    
    let result = this.findRelatedOnPath(
      evt.nativeEvent.locationX,
      evt.nativeEvent.locationY,
    );
    if (result)
      this.setState({
        position: { x: result.x, y: result.y, angle: result.angle, mouse_x: evt.nativeEvent.locationX,  mouse_y: evt.nativeEvent.locationY },
      });
  }
  componentDidMount() {
    this.definePathStart();
  }
  findRelatedOnPath(x, y) {
    let angle = this.angle(x, y);
    return {...this.calculatePolar(angle, this.state.size.width / 2, this.state.size.height / 2, 5), angle};
  }
  definePathStart() {
    // eslint-disable-next-line prettier/prettier
    //let regex = /m ([0-9\.]+)\s*[\,]?\s*([0-9\.]+)/i;
    //let result = regex.exec(this.path.props.d);
    //return {cx: result[1], cy: result[2]};

    this.setState({
      position: this.calculatePolar(0, this.state.size.width / 2, this.state.size.height / 2, 5)
    });
  }

  sgn(w) {
    if (w > 0) return 1;
    if (w < 0) return -1;
    return 0;
  }

  angle(x, y) {
    let center = {x:this.state.size.width / 2, y: this.state.size.height / 2}
    let AC = { x: center.x - x, y: center.y - y }
    let BC = { x: center.x - x, y: 0 }
    let result = Math.acos( ( AC.x * BC.x + AC.y * BC.y ) / ( Math.sqrt( AC.x * AC.x + AC.y * AC.y ) * Math.sqrt( BC.x * BC.x + BC.y * BC.y ))) * (180 / Math.PI) 
    //result in 1st quadrant
    if ( x > center.x && y < center.y ) // 4th quadrant
      result = 360 - result
    else 
      if ( x < center.x && y < center.y ) // 3rd quadrant
        result += 180
      else 
        if ( x < center.x && y > center.y ) // 2nd quadrant
          result = 180 - result
    
    return result;
  }

  calculate(angle, a, b, m, n) {
    let pp = -Math.abs(Math.sin(angle*Math.PI/45))+1
    //console.warn(pp)
    angle = angle * Math.PI/180;
    let x = Math.pow(Math.cos(angle), 2 / m) * a;
    //let x = Math.pow(Math.abs(Math.cos(angle)), 2 / m) * a * this.sgn(Math.cos(angle));
    let y = Math.pow(Math.sin(angle), 2 / n) * b ;
    //let y = Math.pow(Math.abs(Math.sin(angle)), 2 / n) * b * this.sgn(Math.sin(angle));
    return { x: x + a, y: y + b };
  }

  calculatePolar(angle, a, b, n) {
    //http://frink.machighway.com/~dynamicm/super-ellipse.html
    angle = angle * Math.PI/180;

    let r = Math.pow( 
        Math.pow( Math.abs(Math.cos(angle) / a), n  ) + 
        Math.pow( Math.abs(Math.sin(angle) / b), n  ),
        -1 / n
        );
    return { x: Math.cos(angle) * r + a, 
      y: Math.sin(angle) * r + b };
  }

  render() {
    let c0 = this.calculate(0, this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c1 = this.calculate(10 , this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c2 = this.calculate(20, this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c3 = this.calculate(30 , this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c4 = this.calculate(40 , this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c5 = this.calculate(50 , this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c6 = this.calculate(60 , this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c7 = this.calculate(70 , this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c8 = this.calculate(80, this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    let c9 = this.calculate(90, this.state.size.width / 2, this.state.size.height / 2, 5, 5)
    
    let r0 = this.calculatePolar(0  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r1 = this.calculatePolar(10  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r2 = this.calculatePolar(20  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r3 = this.calculatePolar(30  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r4 = this.calculatePolar(40  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r5 = this.calculatePolar(50  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r6 = this.calculatePolar(60  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r7 = this.calculatePolar(70  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r8 = this.calculatePolar(80  , this.state.size.width / 2, this.state.size.height / 2, 5)
    let r9 = this.calculatePolar(90  , this.state.size.width / 2, this.state.size.height / 2, 5)

    return (
      /* without viewBox */
      /* path should be drawn first somehow */

      <Svg style={{ flex: 1 }}>
        <SvgText x="20" y="75">
          x: {this.state.position.mouse_x} y:{this.state.position.mouse_y}
        </SvgText>
        <SvgText x="20" y="35">
          x: {this.state.position.x} y:{this.state.position.y}
        </SvgText>
        <SvgText x="20" y="55">
          angle: {this.state.position.angle}
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

          <Line
            x1={c0.x}
            x2={this.state.size.width / 2}
            y1={c0.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c1.x}
            x2={this.state.size.width / 2}
            y1={c1.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c2.x}
            x2={this.state.size.width / 2}
            y1={c2.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c3.x}
            x2={this.state.size.width / 2}
            y1={c3.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c4.x}
            x2={this.state.size.width / 2}
            y1={c4.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c5.x}
            x2={this.state.size.width / 2}
            y1={c5.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c6.x}
            x2={this.state.size.width / 2}
            y1={c6.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c7.x}
            x2={this.state.size.width / 2}
            y1={c7.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c8.x}
            x2={this.state.size.width / 2}
            y1={c8.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />
          <Line
            x1={c9.x}
            x2={this.state.size.width / 2}
            y1={c9.y}
            y2={this.state.size.height / 2}
            stroke="black"
          />

          <Circle
            cx={r0.x}
            cy={r0.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r1.x}
            cy={r1.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r2.x}
            cy={r2.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r3.x}
            cy={r3.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r4.x}
            cy={r4.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r5.x}
            cy={r5.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r6.x}
            cy={r6.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r7.x}
            cy={r7.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r8.x}
            cy={r8.y}
            r={5}
            fill="red"
          />
          <Circle
            cx={r9.x}
            cy={r9.y}
            r={5}
            fill="red"
          />
        </G>

      </Svg>
    );
  }
}
2