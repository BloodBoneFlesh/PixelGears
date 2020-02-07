import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { GroupBox } from './GroupBox'
import { CustomInput } from './CustomInput'
import {SuperEllipse} from '../../SuperEllipse'

class Button extends React.Component {
  render() {
    return <TouchableOpacity onPress={this.props.press}>
      <View style={{ backgroundColor: 'black', width: 30, height: 20 }}>
        <Text style={{ color: 'white' }}>{this.props.text}</Text>
      </View>
    </TouchableOpacity>
  }
}

export class TextColorEdit extends React.Component {

  FieldsGroup(array, len) {
    return <GroupBox text={array} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {
        array.map((el) => <CustomInput
          ref={el}
          reference={el}
          value={String(this.state.color[el])}
          length={len}
          setValue={(v) => this.setColor(el, v)} />
        )}
    </GroupBox>
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      color: {
        R: 0,
        G: 0,
        B: 0,
        A: 255,
        C: 0,
        M: 0,
        Y: 0,
        K: 0,
        HH: 0,
        S: 0,
        L: 0,
        H: 0,
        E: 0,
        X: 0,
      },
      active: false
    };

    this.setColor = this.setColor.bind(this)
  }

  press(key) {
    if (this.state.active) this.state.active.press(key)
  }

  getInputFieldById(id) {
    for (let ref in this.refs) {
      if (this.refs[ref].ping(id))
        return this.refs[ref];
    }
  }

  setActive(field) {
    if (this.state.active) this.state.active.blur();
    this.setState({ active: field })
    if (field) field.focus();
  }

  setColor(c, val) {
    let color = this.state.color;
    color[c] = val;
    this.setState({ color })
    console.log(this.state.color)
  }

  render() {
    /* use invisible 'background' to alarm panresponder event 
       when clicking outside of forms. it will imitate focus/blur 
       effect */
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}
        onResponderStart={(evt) =>
          this.setActive(this.getInputFieldById(evt.target))
        }
        onStartShouldSetResponder={() => true
        }
      >
        <View style={{
          position: 'absolute',
          top: 0, left: 0,
          backgroundColor: 'transparent',
          height: '100%', width: '100%'
        }}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            {this.FieldsGroup(["R", "G", "B"], 3)}
            <GroupBox text={["HEX"]} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {
                ["HH", "E", "X"].map((el) => <CustomInput
                  ref={el}
                  reference={el}
                  value={String(this.state.color[el])}
                  length={2}
                  setValue={(v) => this.setColor(el, v)} />
                )}
            </GroupBox>
            {this.FieldsGroup(["H", "S", "L"], 3)}
            {this.FieldsGroup(["C", "M", "Y", "K"], 3)}
          </View>
          <View style={{ flex: 2 }}>
            {this.FieldsGroup(["A"], 3)}
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {['0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', '<']
            .map((el) =>
              <Button text={el} press={() => this.press(el)} />
            )}
        </View>
        <View style={{ flexDirection: 'row'}}>
          <SuperEllipse />
        </View>
      </View >

    )
  }
}
