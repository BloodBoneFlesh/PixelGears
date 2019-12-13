import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {styles, PATTERN} from '../styles';

type CanvasProps = {
  width: number,
  height: number
}

type CanvasListProps = {
  canvas_list: Canvas[]
}

export class Canvas extends React.Component<CanvasProps> {
  height: number;
  width: number;
  constructor(props: CanvasProps) {
    super(props);
    this.width = props.width;
    this.height = props.height;
  }
  render() {
    return <View style={styles.Canvas} />;
  }
}

export class CanvasList extends React.Component<CanvasListProps> {
  constructor(props: CanvasListProps) {
    super(props);
  }
  render() {
    /*
    <View style={styles.CanvasList}>
        <Image style={styles.Background} source={PATTERN} />
        {this.props.canvas_list.map((c:Canvas) => (
          <Canvas width={c.width} height={c.height} />
        ))}
      </View>
    */
    return (
      <View style={styles.CanvasList}>
        <ScrollView style={{ position: 'absolute', top: 20, bottom: 20, left: 20, right: 20 , backgroundColor: '#999' }}>
          <View style={{ top: 50, left: 50, position: 'absolute', width: 50, height: 50, backgroundColor: '#FFF', zIndex: 500 }} />
        </ScrollView>
      </View>
    );
  }
}
