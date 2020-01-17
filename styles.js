import React from 'react';
import {StyleSheet} from 'react-native';

export const PATTERN = require('./pictures/pattern_24x24.png');

export let orientation =  {
  landscape: false
};

export const styles = StyleSheet.create({
  Screen: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  Panel: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#EEE',
  },
  Canvas: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  CanvasList: {
    display: 'flex',
    flexDirection: 'column',
    flex: 9,
  },
  Background: {
    height: 800,
    width: 800,
    resizeMode: 'repeat',
  },
  Palette: {
    flex: 0.5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  Palette_Control: {
    flex: 3,
  },
  Palette_Color: {
    flex: 2,
    borderWidth: 0.5,
    aspectRatio: 1,
    backgroundColor: '#FFFF',
    transform: [{rotate: '45deg'}],
  },
  TestElement1:{
    width: 50,
    height: 50,
    backgroundColor: 'red',
    aspectRatio: 1,
    margin: 10
  },
  TestElement2:{
    width: 50,
    height: 50,
    backgroundColor: 'green',
    aspectRatio: 1,
    margin: 10
  }
});
