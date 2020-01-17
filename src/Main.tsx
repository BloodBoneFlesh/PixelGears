import React from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Panel } from './Panel';
import { CanvasList } from './Canvas';
import { orientation, styles } from '../styles';
import { Palette } from './Palette';
import { navigate } from './Navigation';



export class Main extends React.Component {
  /*
  screen
  +-top_panel
    +-palette
    +-?controls
  +-canvas_list
    +-canvas_n
      +-background
      +-reference
      +-layer_list
        +-layer_n
      +-selection
  +-bottom_panel
    +-preview
    +-?menu
    +-?controls
 */

  /*<Panel>
           <Palette />
         </Panel>
         <CanvasList canvas_list={[]} />
         <Panel />*/

  constructor(props: Object[]) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    let { width, height } = Dimensions.get("window");
    if (width < height) {
      orientation.landscape = false;
      this.setState({})
    } else {
      orientation.landscape = true;
      this.setState({})
    }
  }

  render() {
    return (
      <View style={[styles.Screen, orientation.landscape ? { flexDirection: 'row', } : {}]} onLayout={this.onLayout} >
        <Panel>
        <TouchableOpacity onPress={() => navigate("modalScreen", [])}>
            <View style={styles.TestElement1} />
          </TouchableOpacity>
          
          <View style={styles.TestElement1} />
          <View style={styles.TestElement1} />
        </Panel>
        <CanvasList canvas_list={[]} />
        <Panel>
          <TouchableOpacity onPress={() => navigate("TestView1", [])}>
            <View style={styles.TestElement2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("TestView2", [])}>
            <View style={styles.TestElement2} />
          </TouchableOpacity>
        </Panel>
      </View>
    );
  }
}
