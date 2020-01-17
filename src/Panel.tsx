import React from 'react';
import {View} from 'react-native';
import {orientation, styles} from '../styles';

export class Panel extends React.Component {
  render() {
    return <View style={[styles.Panel, orientation.landscape ? { flexDirection: 'column', } : {}]}>{this.props.children}</View>;
  }
}
