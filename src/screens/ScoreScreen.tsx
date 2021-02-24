

import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Alert, Modal,FlatList,TouchableOpacity } from 'react-native';
import { ParamList } from '../utils/ParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserScore } from '../types';

interface Props {
  navigation: StackNavigationProp<ParamList, 'ScoreScreen'>,
  route: RouteProp<ParamList, 'ScoreScreen'>,
}

const ScoreScreen:React.FC<Props> = ({navigation, route}) => {
  const [scoreTable, setScoreTable] = React.useState<UserScore[]>([])


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

  return (
    <Modal style={styles.container}
      visible={true}
      onRequestClose={() => navigation.pop()}
    >
      <View style={styles.ModalStyle}>

      <View style={{flexDirection:'row'}}>
            <Text style={{textAlign:'center',width:'20%'}}> rank </Text>
            <Text style={{textAlign:'center',width:'50%'}}>  name </Text>
            <Text style={{textAlign:'center',width:'30%'}}>  score</Text>
      </View>

      <FlatList
            numColumns ={1}
            data={scoreTable}
            
            style={{ padding:10,borderRadius:20}}

            renderItem={ ({ item,index }) => (
              <View style={{flexDirection:'row'}}>
                <Text style={{textAlign:'center',width:'20%'}}> {index + 1} </Text>
                <Text style={{textAlign:'center',width:'50%'}}>  {item.name} </Text>
                <Text style={{textAlign:'center',width:'30%'}}>  {item.score}</Text>
              </View>
                
            )}/>

            <TouchableOpacity onPress={()=> navigation.pop()}>
                <Text style={{textAlign:'center',fontSize:30}}>Back to home page</Text>
            </TouchableOpacity>
    </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  container : { 
    
  },
  ModalStyle : {
    
    marginTop : 20,
    height:"80%",
    width : "100%",
    alignSelf: 'center',
}


});

export default ScoreScreen;
