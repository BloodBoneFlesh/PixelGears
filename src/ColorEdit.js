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

let padding;

export class ColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.changeColor = this.changeColor.bind(this);

    this.state = {
      R: 0,
      G: 0,
      B: 0,

      size: {
        width: 250,
        height: 200,
        margin: 20,
      },
      color: '#FFF',
      padding: { width: 0, height: 0 }
    };
  }

  onLayout = (e) => {
    this.setState({ padding: e.nativeEvent.layout})
  }

  changeColor(NewColor) {
    this.setState({ color: NewColor });
  }

  render() {
    let w = this.state.size.width; /* border rect width */
    let h = this.state.size.height; /* border rect height */
    let f = this.state.size.margin; /* border line width */

    let p_x = (this.state.padding.width - w) / 2
    let p_y = (this.state.padding.height - h) / 2

    return (
      <Svg onLayout={(event) => this.onLayout(event)}
        style={{ flex: 1, }}
        /*height={h} width={w} viewBox={`0 0 ${w} ${h}`}*/>
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

          <Path
            id="shape"
            fill="none"
            x={f / 2} y={f / 2}
            d={`M ${(w - f) / 2} 0 
                C ${(w - f)} 0 ${(w - f)} 0 ${(w - f)} ${(h - f) / 2} 
                  ${(w - f)} ${(h - f)} ${(w - f)} ${(h - f)} ${(w - f) / 2} ${(h - f)} 
                  0 ${(h - f)} 0 ${(h - f)} 0 ${(h - f) / 2} 
                  0 0 0 0 ${(w - f) / 2} 0
                  `}
          />

          <Path
            id="shape2_shadow"
            fill="none"
            d={`M 99 50 
                L 201 50`}
          />
          <Path
            id="shape2"
            fill="none"
            d={`M 100 50 
                L 200 50`}
          />

          <Path
            id="shape3_shadow"
            fill="none"
            d={`M 50 49 
                L 50 151`}
          />
          <Path
            id="shape3"
            fill="none"
            d={`M 50 50 
                L 50 150`}
          />

          <Mask id="template_mask" x={0} y={0} width={w} height={h}>
            <Use href={`#shape`} stroke="#FFF" strokeWidth={f / 3} />
          </Mask>

          <G id="template">
            <G mask="url(#template_mask)">
              <Path
                d={`M ${f / 2} ${f / 2} H ${w / 2}`}
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

        <G x={p_x} y={p_y}>
          <SvgScroll
            type="superellipse"
            path="shape"
            pathSVG="template"
            width={w}
            height={h}
            callback={(x) => JSON.stringify(x)} />

          <SvgScroll
            type="line"
            path="shape2_shadow"
            pathSVG="shape2"
            line={{ type: 'horizontal', x1: 100, y1: 50, x2: 200, y2: 50 }}
            width={w}
            height={h}
            callback={(x) => JSON.stringify(x)} />

          <SvgScroll
            type="line"
            path="shape3_shadow"
            pathSVG="shape3"
            line={{ type: 'verical', x1: 50, y1: 50, x2: 50, y2: 150}}
            width={w}
            height={h}
            callback={(x) => JSON.stringify(x)} />
        </G>

      </Svg>
    );
  }
}
