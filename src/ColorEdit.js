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
      
      size: {
        width: 250,
        height: 200,
        margin: 20
      },
      color: '#FFF',
    };
  }
 
  changeColor(NewColor) {
    this.setState({ color: NewColor });
  }

  render() {
    let w = this.state.size.width; /* border rect width */
    let h = this.state.size.height; /* border rect height */
    let f = this.state.size.margin; /* border line width */
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
            <Use x={f / 2} y={f / 2}  href={`#shape`} stroke="#FFF" strokeWidth={f / 3}/>
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
        
        <SvgScroll
            type="superellipse"
            path="shape"
            pathSVG="template"
            width={w}
            height={h}
            callback={(x) => JSON.stringify(x)} />

       
      </Svg>
    );
  }
}
