import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles';

export class Palette extends React.Component {
  render() {
    return (
      <View style={styles.Palette}>
        <View style={styles.Palette_Control}>
          <View style={styles.Palette_Color} />
        </View>
        <View style={styles.Palette_Color} />
        <View style={styles.Palette_Color} />
        <View style={styles.Palette_Color} />
        <View style={styles.Palette_Color} />
        <View style={styles.Palette_Color} />
      </View>
    );
  }
}
