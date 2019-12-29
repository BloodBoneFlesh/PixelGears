import React from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../styles';
import data from '../pallets.json';

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

function Item({ title }) {
  return (
    <View style={styles.item} />
  );
}

export class PaletteChooser extends React.Component {
  render() {
    return (
      <View style={styles.Palette}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
