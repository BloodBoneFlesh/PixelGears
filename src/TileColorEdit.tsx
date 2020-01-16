import * as React from 'react';
import { View, TouchableOpacity  } from 'react-native';

function hslToRgb(_h: number, _s: number, _l: number, a: number) {
  const h = _h / 360;
  const s = _s / 100;
  const l = _l / 100;
  let t1;
  let t2;
  let t3;
  let rgb;
  let val;

  if (s === 0) {
    val = l;
    return [val, val, val, a];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  t1 = 2 * l - t2;

  rgb = [0, 0, 0, a];
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1);
    if (t3 < 0) {
      t3++;
    }
    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val;
  }

  return rgb;
}

class TileRow extends React.Component{
  constructor(props: Object[]) {
    super(props);
    this._onPress = this.props.press;
  }

  render() {
    return (<View style={{ flexDirection: 'row',flex:1 }} key={Math.random()}>
          {
            this.props.colors.map((r) => (
              <TouchableOpacity style={{ flex:1 }} key={r.join(',')}  onPress={()=>this._onPress(r[0], r[1], r[2])}>
                <View style={{ backgroundColor: `hsl(${r[0]}, ${r[1]}%, ${r[2]}%)`, flex:1 }} key={r.join(',')} />
              </TouchableOpacity>
              )
            )
          }
        </View>)
  }
}

class TilePanel extends React.Component{
  constructor(props: Object[]) {
    super(props);

    let l = 50;

    let colors = [];
    for (let h = 0; h < 360 + 1; h += 9) {
      let row = [];
      for (let s = 0; s < 100 + 1; s += 4) {
        row.push([h, s, l]);
      }
      colors.push(row);
    };

    this.state = {
      colors: colors
    };
  }

  render() {
    return (<View style={{
      flexDirection: 'column', flex:1
    }}>
      {
        this.state.colors.map((e) => <TileRow colors={e} press={this.props.press} key={Math.random()} />)
      }
    </View>)
  }
}

export class TileColorEdit extends React.Component {
  constructor(props: Object[]) {
    super(props);

    this.state = {
      color: {
        H: 0,
        S: 0,
        L: 0,
        A: 255,
      },
    };

    this._onPress = this._onPress.bind(this);
  }

  _onPress(H, S, L){
    this.setState({color: {
      H: H,
      S: S,
      L: L,
      A: 255,
    },})
  }

  render() {/*
    let colors_l = [];
    for (let l = 0; l < 100 + 1; l += 4) {
      colors_l.push([this.state.color.H, this.state.color.S, l]);
    }

    return (<View style={{
      flexDirection: 'column', flex:1
    }}>

        <View style={{ flexDirection: 'row',flex:1 }} key={Math.random()}>
          {
            colors_l.map((r) => <TouchableOpacity style={{ flex:1 }} key={r.join(',')}  onPress={()=>console.warn(1)}>
            <View style={{ backgroundColor: `hsl(${r[0]}, ${r[1]}%, ${r[2]}%)`, flex:1 }} key={r.join(',')} />
          </TouchableOpacity>)
          }
        </View>

        <View style={{ flex:1 }} key={'spacer'} /> 


      {
        colors.map((e) => <View style={{ flexDirection: 'row',flex:1 }} key={Math.random()}>
          {
            e.map((r) => <TouchableOpacity style={{ flex:1 }} key={r.join(',')}  onPress={()=>this._onPress(r[0], r[1], r[2])}>
                <View style={{ backgroundColor: `hsl(${r[0]}, ${r[1]}%, ${r[2]}%)`, flex:1 }} key={r.join(',')} />
              </TouchableOpacity>)
          }
        </View>)
      }
    </View>)*/
    return <TilePanel />
  }
}
