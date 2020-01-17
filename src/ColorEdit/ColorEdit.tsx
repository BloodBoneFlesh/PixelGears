import * as React from 'react';

import { View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import { SvgScroll } from '../SvgScroll';
import { TileColorEdit } from './TileColorEdit'

export class ColorEdit extends React.Component {
  constructor(props) {
    super(props);

    this.changeColor = this.changeColor.bind(this);

    this.state = {
      color: {
        R: 0,
        G: 0,
        B: 0,
        A: 255
      },
    };
  }


  changeColor(NewColor) {
    this.setState({ color: NewColor });
  }


  render() {
    return (
      <View style={{ flex: 1, margin: 25 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 2, backgroundColor: 'red' }}>
            <View style={{
              flex: 1,  borderRadius: 10, margin:10,
              backgroundColor: `rgb(${this.state.color.R}, ${this.state.color.G}, ${this.state.color.B})`,
              borderWidth: 2
            }} />
          </View>
          <View style={{ flex: 1, backgroundColor: 'blue' }} />
        </View>
        <View style={{ flex: 4, }}>
          <TileColorEdit />
        </View>
      </View>

    );
  }
}
