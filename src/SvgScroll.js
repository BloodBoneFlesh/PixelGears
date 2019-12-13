import * as React from 'react';
import {View, Animated} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

let AnimatedCircle = Animated.createAnimatedComponent(Circle);
/* https://blog.reactnativecoach.com/creating-draggable-component-with-react-native-132d30c27cb0 */
/* https://github.com/react-native-community/react-native-svg/issues/986 */
export class SvgScroll extends React.Component {
  constructor(props) {
    super(props);

    if (!props.marker) this.marker = this.defaultMarker();
    if (!props.path) this.path = this.defaultPath(0);

    this.move = this.draw.bind(this);
    this.cx = new Animated.Value(0);
    this.cy = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.move(this.move);
  }

  move() {
    Animated.timing(this.cx, {toValue: 1, duration: 2000}).start();
  }

  componentWillMount() {
    this.definePathStart(this.path);
  }

  defaultMarker = () => (
    <Circle
      cx={this.state.cx}
      cy={this.state.cy}
      r={5}
      stroke="black"
      fill="grey"
    />
  );

  defaultPath = function(variant) {
    switch (variant) {
      case 1:
        return <Path d="M 5 5 L 5 55" stroke="black" fill="none" />;
      default:
        return <Path d="M 5 5 L 55 5" stroke="black" fill="none" />;
    }
  };

  definePathStart(path) {
    // eslint-disable-next-line prettier/prettier
    let regex = /m ([0-9\.]+)\s*[\,]?\s*([0-9\.]+)/i;
    let result = regex.exec(this.path.props.d);
    //this.setState(() => ({cx: result[1]}));
    //this.setState(() => ({cy: result[2]}));

    this.marker.setCx(result[1]);
    return {cx: result[1], cy: result[2]};
  }

  render() {
    console.warn(this.marker);
    return (
      <View style={{flex: 1}}>
        <Svg height={60} width={60} viewBox="0 0 60 60">
          {this.path}
          {this.marker}
        </Svg>
      </View>
    );
  }
}
