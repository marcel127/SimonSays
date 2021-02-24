

import React, { Dispatch, useEffect } from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { ParamList } from '../utils/ParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppReducer, Store, UserScore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/actions';

interface Props {
  navigation: StackNavigationProp<ParamList, 'EnterNamePopup'>,
  route: RouteProp<ParamList, 'EnterNamePopup'>,
}

const EnterNamePopup:React.FC<Props> = ({navigation, route}) => {
    const [playerName, setPlayerName] = React.useState<string>("")
    const [scoreTable, setScoreTable] = React.useState<UserScore[]>([])
    const playerScore = useSelector<Store, AppReducer> (state => state.App)
    const scoreDispatcher = useDispatch<Dispatch<Actions>>()


    useEffect(() => {
    
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('scoreTable')
                console.log("marcel"  + value)
                if(value !== null) {
                    setScoreTable( JSON.parse(value) )
                }
                  
            } catch(e) {
                Alert.alert("scoreTable error")
            }
        }

        getData()
        
    },[])

    const storeData = async (value : UserScore) => {

        let tempArray = scoreTable.slice(); //creates the clone of the state
        tempArray.push(value) 
        tempArray.sort(_compare)
        tempArray = tempArray.slice(0,10);

        try {
          const jsonValue = JSON.stringify(tempArray)
          console.log()
          await AsyncStorage.setItem('scoreTable', jsonValue)

        } catch (e) {
            Alert.alert("scoreTable error")
        }finally {
            scoreDispatcher({type : "RESET"})
        }
    }

    const _compare = ( a : UserScore, b : UserScore ) => {
	
		return b.score - a.score;
    }

  
    return (
    <View style={styles.container}>
        <View style={styles.ModalStyle}>
            <Text>You Lose!</Text>
            <TextInput
                placeholder={"Enter your name"}
                onChangeText={(text: string) => {
                    setPlayerName(text)
                }}/>
            
            <TouchableOpacity 
                disabled={playerName.length === 0}
                onPress = {async () => {
                    await storeData({score : playerScore.currentScore ,name : playerName})
                    // navigation.popToTop()
                    navigation.replace("ScoreScreen",{})
                }}>
                <Text style={{fontSize:40}}>Submit</Text>
            </TouchableOpacity>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        height:'100%',
        backgroundColor : 'rgba(52, 52, 52, 0.5)',
        alignItems: 'center',
        justifyContent:'center',

    },
    ModalStyle : {
        height:200,
        width : 200,
        marginHorizontal:20,
        justifyContent:'center',
        borderRadius:20,
        backgroundColor:'#fefefe',
        alignItems: 'center',
    }


});

export default EnterNamePopup;
