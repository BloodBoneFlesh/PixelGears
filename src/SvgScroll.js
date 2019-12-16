import * as React from 'react';
import {View, Animated, PanResponder} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

let AnimatedCircle = Animated.createAnimatedComponent(Circle);
/* https://blog.reactnativecoach.com/creating-draggable-component-with-react-native-132d30c27cb0 */
/* https://github.com/react-native-community/react-native-svg/issues/986 */

let pathElement;
let pointer = 0;

export class SvgScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      marker: null,
      path: null,
    };
  }

  componentWillMount() {
    //this.definePathStart(this.path);
    // Add a listener for the delta value change
    this._val = {x: 0, y: 0};
    this.state.pan.addListener(value => (this._val = value));
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            /*dx: this.state.pan.x,
            dy: this.state.pan.y,*/
          },
        ],
        {
          listener: (event, gestureState) => {
            console.warn(this.state.pan);
            if (event.dx > 0 && pointer < this.pathElement.getTotalLength())
              pointer++;
            else if (pointer > 0) pointer--;
            this.state.pan = this.pathElement.getPointAtLength(pointer);
          },
        },
      ),
      // adjusting delta value
    });

    /*if (!this.state.marker) */ this.state.marker = this.defaultMarker();
    /*if (!this.state.path) */ this.state.path = this.defaultPath(0);
  }

  componentDidMount() {
    this.definePathStart();
  }

  definePathStart() {
    // eslint-disable-next-line prettier/prettier
    //let regex = /m ([0-9\.]+)\s*[\,]?\s*([0-9\.]+)/i;
    //let result = regex.exec(this.path.props.d);
    //return {cx: result[1], cy: result[2]};
    this.state.pan.setValue(this.pathElement.getPointAtLength(0));
  }

  defaultMarker = function() {
    return (
      <AnimatedCircle
        {...this.panResponder.panHandlers}
        cx={this.state.pan.x}
        cy={this.state.pan.y}
        r={5}
        stroke="black"
        fill="grey"
      />
    );
  };

  defaultPath = function(variant) {
    switch (variant) {
      case 1:
        return (
          <Path
            ref={element => (this.pathElement = element)}
            d="M 5 5 L 5 55"
            stroke="black"
            fill="none"
          />
        );
      default:
        return (
          <Path
            ref={element => (this.pathElement = element)}
            d="M 5 5 L 55 5"
            stroke="black"
            fill="none"
          />
        );
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Svg height={60} width={60} viewBox="0 0 60 60">
          {this.state.path}
          {this.state.marker}
          <Circle
            cx={50}
            cy={50}
            r={10}
            onPress={() => {
              console.warn(
                'path' + JSON.stringify(this.pathElement.getPointAtLength(50)),
                // 'path' + JSON.stringify(this.pathElement.getTotalLength()),
              );
            }}
          />
        </Svg>
      </View>
    );
  }
}
