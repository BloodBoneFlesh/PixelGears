import React, { Component } from 'react';
import { View, } from 'react-native';
import Svg, { Path,} from 'react-native-svg';

export class SuperEllipse extends Component{
    render(){
        return (
            <View style={{ aspectRatio: 1, flex: 1 }}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100">
                    <Path
                        x = {1.5}
                        y = {2.5}
                        d={`M 50 3 
                        C 97 3 97 3 97 50 
                        97 97 97 97 50 97 
                        3 97 3 97 3 50 
                        3 3 3 3 50 3`}
                        fill="#666" stroke="none"
                    />
                    <Path
                        d={`M 50 3 
                        C 97 3 97 3 97 50 
                        97 97 97 97 50 97 
                        3 97 3 97 3 50 
                        3 3 3 3 50 3`}
                        fill={this.props.color} stroke="none"
                    />
                </Svg>
            </View>
        )
    }
}

