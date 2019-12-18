import * as React from 'react';
import Svg, {
  Circle,
  Path,
  LinearGradient,
  RadialGradient,
  Defs,
  Stop,
  Use,
  Mask,
  Rect,
  G,
} from 'react-native-svg';

import {SvgScroll} from './SvgScroll';

export class ColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.changeColor = this.changeColor.bind(this);
  }

  state = {
    R: 0,
    G: 0,
    B: 0,
    values: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ],
    angle: 2.995,
    current_angle: 0,
    margin: 5,
    color: '#FFF',
  };

  element(R, G, B) {
    this.state.current_angle += this.state.angle;
    let radius = this.props.radius;

    let left_far =
      Math.cos((this.state.current_angle * Math.PI) / 180) * radius +
      radius +
      this.state.margin;
    let top_far =
      Math.sin((this.state.current_angle * Math.PI) / 180) * radius +
      radius +
      +this.state.margin;

    let left_inner =
      (Math.cos((this.state.current_angle * Math.PI) / 180) * radius) / 2 +
      radius +
      +this.state.margin;
    let top_inner =
      (Math.sin((this.state.current_angle * Math.PI) / 180) * radius) / 2 +
      radius +
      this.state.margin;

    return (
      <Path
        d={`M ${left_far} ${top_far} L ${left_inner} ${top_inner}`}
        stroke={
          '#' +
          this.state.values[R] +
          this.state.values[G] +
          this.state.values[B]
        }
        strokeWidth={10}
        onPressIn={() =>
          this.changeColor(
            '#' +
              this.state.values[R] +
              this.state.values[G] +
              this.state.values[B],
          )
        }
      />
    );
  }

  changeColor(NewColor) {
    this.setState({color: NewColor});
  }

  render() {
    let w = 400;
    let h = 650;
    let f = 80;
    const shadowOpt = {
      width: 160,
      height: 170,
      color: '#000',
      border: 2,
      radius: 3,
      opacity: 0.2,
      x: 0,
      y: 3,
      style: {marginVertical: 5},
    };
    return (
      <Svg style={{flex: 1}} height={h} width={w} viewBox={`0 0 ${w} ${h}`}>
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

          <LinearGradient
            id="shadow_vertical"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%">
            <Stop offset="0" stopColor="rgb(255,255,255)" stopOpacity="0" />
            <Stop offset="0.5" stopColor="rgb(0,0,0)" stopOpacity="1" />
            <Stop offset="1" stopColor="rgb(255,255,255)" stopOpacity="0" />
          </LinearGradient>
          <LinearGradient
            id="shadow_horizontal"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0" stopColor="rgb(255,255,255)" stopOpacity="0" />
            <Stop offset="0.5" stopColor="rgb(0,0,0)" stopOpacity="1" />
            <Stop offset="1" stopColor="rgb(255,255,255)" stopOpacity="0" />
          </LinearGradient>
          <RadialGradient
            id="shadow_corner_1"
            cx="100%"
            cy="100%"
            rx="95%"
            ry="95%">
            <Stop offset="1" stopColor="rgb(255,255,255)" stopOpacity="1" />
            <Stop offset="0.5" stopColor="rgb(120,120,120)" stopOpacity="1" />
            <Stop offset="0" stopColor="rgb(255,255,255)" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient
            id="shadow_corner_2"
            cx="0%"
            cy="100%"
            rx="95%"
            ry="95%">
            <Stop offset="1" stopColor="rgb(255,255,255)" stopOpacity="1" />
            <Stop offset="0.5" stopColor="rgb(120,120,120)" stopOpacity="1" />
            <Stop offset="0" stopColor="rgb(255,255,255)" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient
            id="shadow_corner_3"
            cx="100%"
            cy="0%"
            rx="95%"
            ry="95%">
            <Stop offset="1" stopColor="rgb(255,255,255)" stopOpacity="1" />
            <Stop offset="0.5" stopColor="rgb(120,120,120)" stopOpacity="1" />
            <Stop offset="0" stopColor="rgb(255,255,255)" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient
            id="shadow_corner_4"
            cx="0%"
            cy="0%"
            rx="95%"
            ry="95%">
            <Stop offset="1" stopColor="rgb(255,255,255)" stopOpacity="1" />
            <Stop offset="0.5" stopColor="rgb(120,120,120)" stopOpacity="1" />
            <Stop offset="0" stopColor="rgb(255,255,255)" stopOpacity="0" />
          </RadialGradient>

          <Mask id="template" x={0} y={0} width={w} height={h}>
            <Rect
              stroke="#FFF"
              fill="none"
              strokeWidth={f / 3}
              width={w - f}
              height={h - f}
              x={f / 2}
              y={f / 2}
              ry={f / 2}
            />
          </Mask>
        </Defs>
        <G id="shadows">
          <Rect
            x={f / 2 - f / 3}
            y={f / 2}
            width={f / 1.5}
            height={h - f}
            fill="url(#shadow_vertical)"
            stroke="none"
          />
          <Rect
            x={f / 2 - f / 3 + w - f}
            y={f / 2}
            width={f / 1.5}
            height={h - f}
            fill="url(#shadow_vertical)"
            stroke="none"
          />
          <Rect
            x={f / 2}
            y={f / 2 - f / 3}
            width={w - f}
            height={f / 1.5}
            fill="url(#shadow_horizontal)"
            stroke="none"
          />
          <Rect
            x={f / 2}
            y={f / 2 - f / 3 + h - f}
            width={w - f}
            height={f / 1.5}
            fill="url(#shadow_horizontal)"
            stroke="none"
          />

          <Rect
            x={f / 2 - f / 3}
            y={f / 2 - f / 3}
            width={f / 1.5}
            height={f / 1.5}
            fill="url(#shadow_corner_1)"
            stroke="none"
          />
          <Rect
            x={w - f / 2 - f / 3}
            y={f / 2 - f / 3}
            width={f / 1.5}
            height={f / 1.5}
            fill="url(#shadow_corner_2)"
            stroke="none"
          />
          <Rect
            x={f / 2 - f / 3}
            y={h - f / 2 - f / 3}
            width={f / 1.5}
            height={f / 1.5}
            fill="url(#shadow_corner_3)"
            stroke="none"
          />
          <Rect
            x={w-f / 2 - f / 3}
            y={h- f / 2 - f / 3}
            width={f / 1.5}
            height={f / 1.5}
            fill="url(#shadow_corner_4)"
            stroke="none"
          />
        </G>
        <G mask="url(#template)">
          <Path
            d={`M ${0 + f / 2} ${0 + f / 2} H ${w / 2}`}
            fill="none"
            stroke="url(#black_red)"
            strokeWidth={f}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w / 2} ${f / 2} H ${w - f / 2}`}
            fill="none"
            stroke="url(#red_yellow)"
            strokeWidth={f}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w - f / 2} ${f / 2} V ${h / 2}`}
            fill="none"
            stroke="url(#yellow_green)"
            strokeWidth={f}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w - f / 2} ${h / 2} V ${h - f / 2}`}
            fill="none"
            stroke="url(#green_aqua)"
            strokeWidth={f}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w - f / 2} ${h - f / 2} H ${w / 2}`}
            fill="none"
            stroke="url(#aqua_blue)"
            strokeWidth={f}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${w / 2} ${h - f / 2} H ${f / 2}`}
            fill="none"
            stroke="url(#blue_pink)"
            strokeWidth={f}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <Path
            d={`M ${f / 2} ${h - f / 2} V ${h / 2}`}
            fill="none"
            stroke="url(#pink_white)"
            strokeWidth={f}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d={`M ${f / 2} ${h / 2} V ${f / 2}`}
            fill="none"
            stroke="url(#white_black)"
            strokeWidth={f}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </G>
      </Svg>

      /*
      <G>
        <Use href="#arrow_back" x="50" y="275" />
        <Use href="#arrow_forward" x="100" y="275" />
      </G>
      */

      /*
      <Svg style={{flex: 1}}>
        <Circle
          style={{zIndex: -10}}
          cx={this.props.radius + 5}
          cy={this.props.radius + 5}
          r={this.props.radius}
          stroke="black"
          fill="none"
          strokeWidth={5}
        />
        {[...new Array(15)].map(() =>
          this.element(this.state.R++, this.state.G, this.state.B),
        )}
        {[...new Array(15)].map(() =>
          this.element(this.state.R, this.state.G++, this.state.B),
        )}
        {[...new Array(15)].map(() =>
          this.element(this.state.R--, this.state.G, this.state.B),
        )}
        {[...new Array(15)].map(() =>
          this.element(this.state.R, this.state.G, this.state.B++),
        )}
        {[...new Array(15)].map(() =>
          this.element(this.state.R, this.state.G--, this.state.B),
        )}
        {[...new Array(15)].map(() =>
          this.element(this.state.R++, this.state.G, this.state.B),
        )}
        {[...new Array(15)].map(() =>
          this.element(this.state.R, this.state.G++, this.state.B),
        )}
        {[...new Array(15)].map(() =>
          this.element(this.state.R--, this.state.G--, this.state.B--),
        )}
        <Circle
          cx={this.props.radius + this.state.margin}
          cy={this.props.radius + this.state.margin}
          r={this.props.radius / 2}
          stroke="black"
          fill={this.state.color}
          strokeWidth={this.state.margin / 2}
        />
      </Svg>
      */
    );
  }
}
