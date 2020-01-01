import React from 'react';
import { View, ScrollView } from 'react-native';

import { Panel } from './src/Panel';
import { CanvasList } from './src/Canvas';
import { styles } from './styles';
import { Palette } from './src/Palette';
import { ColorEdit } from './src/ColorEdit'
import { SvgScroll } from './src/SvgScroll'
import Svg, {
  Path, G, Circle, Line, Defs, LinearGradient,
  Stop, RadialGradient,
  Use,
} from 'react-native-svg';

//import styles from './styles';

export default class App extends React.Component {
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
  render() {
    return (
      <View style={styles.Screen}>
        <ColorEdit />

      </View>
    );
  }
}
