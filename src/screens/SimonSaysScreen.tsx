

import React, { Dispatch, useEffect, useRef, useState ,} from 'react';
import { StyleSheet,  View, Text, Alert, FlatList} from 'react-native';
import { ParamList } from '../utils/ParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import {  RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {  SIMON_TURN, USER_TURN } from '../utils/Constant';
import {  useDispatch, useSelector } from 'react-redux';
import Sound from 'react-native-sound';
import { AppReducer, Store } from '../types';
import { Actions } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props {
  navigation: StackNavigationProp<ParamList, 'SimonSaysScreen'>,
  route: RouteProp<ParamList, 'SimonSaysScreen'>,
}

interface State  {
  stepsArray : number []
  playerTurn : number,
  currentStep : number,
  isStarted : boolean,
}

const initialState:State ={
  stepsArray : [],
  playerTurn : SIMON_TURN,
  currentStep : 0,
  isStarted : false,
}

const SimonSaysScreen:React.FC<Props> = ({navigation, route}) => {
  Sound.setCategory("Playback");
  const blueRef = useRef<TouchableOpacity>(null);
  const yellowRef = useRef<TouchableOpacity>(null); 
  const redRef = useRef<TouchableOpacity>(null);
  const greenRef = useRef<TouchableOpacity>(null);

  const playerScore = useSelector<Store, AppReducer> (state => state.App)
  const scoreDispatcher = useDispatch<Dispatch<Actions>>()

  const colorsLUT = 
                    [
                      {color : "green", colorRef : greenRef , simonSound: new Sound('green_simon.wav'), playerSound : new Sound('green_user.wav') },
                      {color : "blue", colorRef : blueRef , simonSound: new Sound('blue_simon.wav') , playerSound : new Sound('blue_user.wav')  },
                      {color : "yellow", colorRef : yellowRef , simonSound: new Sound('yellow_simon.wav') , playerSound : new Sound('yellow_user.wav') },
                      {color : "red", colorRef : redRef , simonSound: new Sound('red_simon.wav') , playerSound : new Sound('red_user.wav') },
                    ]
	
  const [state,setState] = useState<State>(initialState)
  const [highestScore,setHighestScore] = useState<State>(0)

  
  useEffect(() => {
    showSimonChoose();
  },[state.stepsArray])

  
  useEffect(() => {
    
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('scoreTable')
            console.log("marcel"  + value)
            if(value !== null) {
              let temp = JSON.parse(value)
              setHighestScore(temp[0].score)
                
            }
              
        } catch(e) {
            Alert.alert("scoreTable error")
        }
    }

    getData()
    
},[])

  useEffect(() => {

    const checkLastStep = async () => {
        if(state.isStarted && state.currentStep === state.stepsArray.length){
          setState(prevState => ({...prevState, playerTurn : SIMON_TURN}))
          scoreDispatcher({type : "INCREMENT"})
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          simonTurn();
        }
    }

    checkLastStep();
  },[state.currentStep])

  const isCorrectPress = (sequence : number) => {
    colorsLUT[sequence].playerSound.play()

    if(state.stepsArray[state.currentStep] !== sequence && state.isStarted){
      navigation.push("EnterNamePopup",{})
      setState(initialState)
    }

    else{
      setState(prevState => ({...prevState,currentStep : state.currentStep + 1}))
    }
  }

  const simonTurn = async () => { 
      setState(prevState => ({
        ...prevState,
        stepsArray : [...state.stepsArray, Math.floor(Math.random() * 4)],
      }))
  }

  const showSimonChoose = async () =>{
    console.log(state.stepsArray)

    for(var i = 0; i < state.stepsArray.length ; ++i){
      colorsLUT[state.stepsArray[i]].colorRef.current?.setOpacityTo(0.1,1000);
      await new Promise(resolve => setTimeout(resolve, 1000));
      colorsLUT[state.stepsArray[i]].colorRef.current?.setOpacityTo(1,1000);
      colorsLUT[state.stepsArray[i]].simonSound.play()
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
                simonTurn()}}>
          <Text style={{alignSelf:'center', fontSize:20}}>{!state.isStarted ? "start" : state.playerTurn === SIMON_TURN ? "Simon say...." : "Your turn"}</Text>
      </TouchableOpacity>
      
      
        <FlatList
            numColumns ={2}
            data={colorsLUT}
            keyExtractor = {item => item.color}
            style={{backgroundColor : 'black',padding:10,borderRadius:20}}

            renderItem={ ({ item ,index }) => (
                <TouchableOpacity
                  ref = {item.colorRef}
                  disabled = {state.playerTurn === SIMON_TURN ? true : false}
                  style={[styles.ButtonStyle,{backgroundColor : item.color}]}
                  onPress={ () => isCorrectPress(index)  }>
                </TouchableOpacity>
            )}/>

      <Text style={{fontSize:30,marginTop:10}}>your score is : {playerScore.currentScore} </Text>
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
