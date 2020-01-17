import React from 'react';
import { View, Text } from 'react-native';
import { orientation, styles } from '../styles';

export class TestView1 extends React.Component {
  render() {
    return (
      <View style={[styles.Screen,{alignItems: 'center',}]}>
      <View style={styles.TestElement1}>
        <Text>TestView1</Text>
      </View>
    </View>
    );
  }
}

export class TestView2 extends React.Component {
  render() {
    return (
      <View style={[styles.Screen,{alignItems: 'center',}]}>
        <View style={styles.TestElement2}>
          <Text>TestView2</Text>
        </View>
      </View>
    );
  }
}
