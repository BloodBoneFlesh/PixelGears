import * as React from 'react';
import { View, Text} from 'react-native';

export class GroupBox extends React.Component {
    heading(headers) {
      if (String(typeof (headers)).toLowerCase().match("object")) {
        return <View style={{
          position: 'absolute',
          top: -10,
          left: 10,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          {headers.map(el => <View style={{
            backgroundColor: 'black',
            color: 'white',
            paddingLeft: 3,
            paddingRight: 3,
            borderRadius: 5,
          }}>
            <Text style={{ color: 'white', }}>
              {el}
            </Text>
          </View>)
          }
        </View>
      } else {
        return <View style={{
          backgroundColor: 'black',
          color: 'white',
          position: 'absolute',
          top: -10,
          left: 10,
          paddingLeft: 3,
          paddingRight: 3,
          borderRadius: 5,
        }}>
          <Text style={{ color: 'white', }}>
            {headers}
          </Text>
        </View>
      }
    }
  
    render() {
      return <View style={[
        {
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          margin: 5
        },
        this.props.style
      ]} >
        {this.heading(this.props.text)}
        {this.props.children}
      </View>
    }
  }