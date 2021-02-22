import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import SimonSaysScreen from './src/screens/SimonSaysScreen'
import ScoreScreen from './src/screens/ScoreScreen'
import {ParamList} from './src/utils/ParamList'

const Stack = createStackNavigator<ParamList>();


const App = () => {
  return (
    <NavigationContainer>
 
       <Stack.Navigator screenOptions={{headerShown:false}}>
         
          <Stack.Screen name="SimonSaysScreen" component={SimonSaysScreen} 
          options={{ cardStyle: { backgroundColor: 'transparent' },  
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid ,
          animationEnabled:true}}/>
          <Stack.Screen name="ScoreScreen" component={ScoreScreen} 
          options={{ cardStyle: { backgroundColor: 'transparent' },  
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid ,
          animationEnabled:true}}/>
      
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({


});

export default App;
