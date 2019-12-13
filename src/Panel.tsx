import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles';

export class Panel extends React.Component {
  render() {
    return <View style={styles.Panel}>{this.props.children}</View>;
  }
}
