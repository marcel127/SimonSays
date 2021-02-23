

import React, { useEffect, useRef, useState } from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Alert} from 'react-native';
import { ParamList } from '../utils/ParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { CurrentRenderContext, RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GREEN,YELLOW,BLUE,RED, SIMON_TURN, USER_TURN } from '../utils/Constant';
import { Store } from 'redux';
import SimonColor from '../redux/reducers';
import {  useDispatch, useSelector } from 'react-redux';
import { SimonColorChoose } from '../redux/actions';

import Sound from 'react-native-sound';





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
  Sound.setCategory("Playback");
  const successSound = new Sound('success.wav')
  const failureSound = new Sound('game_over.wav')
  const blueRef = useRef<TouchableOpacity>(null);
  const yellowRef = useRef<TouchableOpacity>(null); 
  const redRef = useRef<TouchableOpacity>(null);
  const greenRef = useRef<TouchableOpacity>(null);

  const colorsLUT = 
                    [
                      {colorRef : greenRef , simonSound: new Sound('green_simon.wav'), playerSound : new Sound('green_user.wav') },
                      {colorRef : blueRef , simonSound: new Sound('blue_simon.wav') , playerSound : new Sound('blue_user.wav')  },
                      {colorRef : yellowRef , simonSound: new Sound('yellow_simon.wav') , playerSound : new Sound('yellow_user.wav') },
                      {colorRef : redRef , simonSound: new Sound('red_simon.wav') , playerSound : new Sound('red_user.wav') },
                    ]
	
  const [state,setState] = useState<State>(initialState)
  


  useEffect(() => {
    showSimonChoose();
  },[state.stepsArray])

  useEffect(() => {

    const checkLastStep = async () => {
      if(state.isStarted && state.currentStep === state.stepsArray.length){
        setState(prevState => ({...prevState,score : state.score + 1, playerTurn : SIMON_TURN}))
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        simonTurn();
      }
    }

    checkLastStep();
  },[state.currentStep])

  const isCorrectPress = (sequence : number) => {
    colorsLUT[sequence].playerSound.play()

    if(state.stepsArray[state.currentStep] !== sequence){
      Alert.alert("you lose")
      failureSound.play()
    }

    else{
      setState(prevState => ({...prevState,currentStep : state.currentStep + 1}))
    }
  }

  const simonTurn = async () => { 
    console.log(colorsLUT[0].playerSound)

      setState(prevState => ({
        ...prevState,
        stepsArray : [...state.stepsArray, Math.floor(Math.random() * 4)],
      }))
    
  }

  const showSimonChoose = async () =>{
    console.log(state.stepsArray)

    for(var i = 0; i < state.stepsArray.length ; ++i){
        colorsLUT[state.stepsArray[i]].simonSound.play()
        colorsLUT[state.stepsArray[i]].colorRef.current?.setOpacityTo(0.1,1000);
        await new Promise(resolve => setTimeout(resolve, 1000));
        colorsLUT[state.stepsArray[i]].colorRef.current?.setOpacityTo(1,1000);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setState(prevState => ({...prevState, playerTurn : USER_TURN, currentStep : 0}))
  }

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={[styles.StartButtonStyle]}
          disabled={state.isStarted}
          onPress={() => {
              setState(prevState => ({...prevState, isStarted : true}))
              simonTurn()}
          }>
        <Text style={{alignSelf:'center', fontSize:20}}>{!state.isStarted ? "start" : state.playerTurn === SIMON_TURN ? "Simon say...." : "Your turn"}</Text>
      </TouchableOpacity>
      
      <View style={{backgroundColor:'black',justifyContent : 'center',height:'60%',width:"70%",alignItems:'center',borderRadius:20}}>
        <View style={{flexDirection : 'row'}}>
            <TouchableOpacity
                ref = {greenRef}
                disabled = {state.playerTurn === SIMON_TURN}
                style={[styles.ButtonStyle,{backgroundColor : "green" }]}
                onPress={ () => isCorrectPress(0)  }>
            </TouchableOpacity>
                  
            <TouchableOpacity
                ref = {blueRef}
                disabled = {state.playerTurn === SIMON_TURN}
                style={[styles.ButtonStyle,{backgroundColor : "blue" }]}
                onPress={ () => isCorrectPress(1)  }>

            </TouchableOpacity>
        </View>

        <View style={{flexDirection : 'row'}}>
            <TouchableOpacity
                ref = {yellowRef}
                disabled = {state.playerTurn === SIMON_TURN}
                style={[styles.ButtonStyle,{backgroundColor : "yellow" }]}
                onPress={ () => isCorrectPress(2)  }>

            </TouchableOpacity>

            <TouchableOpacity
                ref = {redRef}
                disabled = {state.playerTurn === SIMON_TURN}
                style={[styles.ButtonStyle,{backgroundColor : "red" }]}
                onPress={ () => isCorrectPress(3)  }>

            </TouchableOpacity>
        </View>
      </View>

      <Text style={{fontSize:30,marginTop:10}}>your score is : {state.score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    alignItems : 'center',
  },
  StartButtonStyle : {
    marginTop : 20,
    marginBottom:50,
    backgroundColor:'cyan',
    width:"100%"
  },
  ButtonStyle : {
    height : 100,
    width : 100,
    marginVertical : 10,
    marginHorizontal : 10,
    borderRadius: 20,
  }
});

export default SimonSaysScreen;
