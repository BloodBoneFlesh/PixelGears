import * as React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
/*
http://facebook.github.io/react-native/docs/panresponder.html
http://facebook.github.io/react-native/docs/gesture-responder-system.html
https://developer.android.com/training/gestures/detector.html#java
https://material.io/design/interaction/gestures.html#types-of-gestures
*/
export class PanView extends React.Component {
  render() {
    return (
      <ScrollView horizontal>
        <ScrollView>
          <View style={styles.container}>
            {[...Array(20).keys()].map((value, index) => (
              <View style={styles.cell}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {index}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 20,
    width: 550,
  },
  cell: {
    textAlign: 'center',
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#BBB',
  },
});
