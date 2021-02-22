

import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import { ParamList } from '../utils/ParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';



interface Props {
  navigation: StackNavigationProp<ParamList, 'ScoreScreen'>,
  route: RouteProp<ParamList, 'ScoreScreen'>,
}

const ScoreScreen:React.FC<Props> = ({navigation, route}) => {
  return (
    <View style={{height : "100%",backgroundColor:'white'}}>
      <Text>ScoreScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({


});

export default ScoreScreen;
