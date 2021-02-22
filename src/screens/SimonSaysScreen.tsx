

import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import { ParamList } from '../utils/ParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { CurrentRenderContext, RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ColorMap, SIMON_TURN, USER_TURN } from '../utils/Constant';



interface Props {
  navigation: StackNavigationProp<ParamList, 'SimonSaysScreen'>,
  route: RouteProp<ParamList, 'SimonSaysScreen'>,
}

interface State  {
  score : number,
  stepsArray : number []
  playerTurn : number,
  currentStep : number,
  isStarted : boolean,
}

const initialState:State ={
  score : 0,
  stepsArray : [],
  playerTurn : SIMON_TURN,
  currentStep : 0,
  isStarted : false,
}

const SimonSaysScreen:React.FC<Props> = ({navigation, route}) => {

  const [state,setState] = useState<State>(initialState)
  const [currentColor, setCurrentColor] = useState<number>(0)
  // Math.floor(Math.random() * 4)

  useEffect(() => {
    console.log(state.stepsArray)
  },[currentColor])

  const isLastStep = () => {

  }

  const isCorrectPress = () => {

  }

  const simonChoose = async () => { 
    setState(prevState => ({
      ...prevState,
      stepsArray : [...state.stepsArray, Math.floor(Math.random() * 4)],
      // intervalNumber : setTimeout(() => showSimonChoose(),1000 ),
      score : state.currentStep + 1,
      currentStep : state.currentStep + 1,
    }))
    setCurrentColor(state.stepsArray[state.stepsArray.length - 1])
    console.log(state.stepsArray)
    console.log("current step" + state.currentStep)
    showSimonChoose();   
  }

  const showSimonChoose = () =>{
 
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.StartButtonStyle, {display : state.isStarted ? 'none' : 'flex'}]} onPress={() => simonChoose()}>
        <Text style={{alignSelf:'center', fontSize:20,}}>start</Text>
      </TouchableOpacity>
      
      {ColorMap.map(data => (
          <TouchableOpacity
              key={data.id}
              style={[styles.ButtonStyle,{backgroundColor : data.color ,opacity: currentColor === data.id ? 0.5 : 1 }]}
              // disabled={ state.playerTurn !== USER_TURN }
              onPress={ () => {   

                              }}>
            </TouchableOpacity>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    alignItems : 'center',
  },
  StartButtonStyle : {
    marginTop : 20,
    backgroundColor:'cyan',
    width:70
  },
  ButtonStyle : {
    height : 100,
    width : 100,
    marginTop : 30,
  }


});

export default SimonSaysScreen;
