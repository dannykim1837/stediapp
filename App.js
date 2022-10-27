import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage,AccessibilityProperties, TextInput, Button, Alter } from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';





const AppStack = createNativeStackNavigator();

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState("");      
  const [isLoggedIn, setIsLoggedIn] = React. useState(false);
  const [homeTodayScore, setHomeTodayScore] = React.useState(0);
  const [tempCode, setTempCode] = React.useState(null);

   if (isFirstLaunch == true){
return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
);
  }else if(isLoggedIn){
    return <Navigation/>
  }else{
    return (
      <View>
        <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        placeholderTextColor='#4251f5'
        placehoder='Cell Phone'>
        </TextInput>
        <Button
          title='Send'
          style={styles.button}
          onPress={async()=>{
            console.log(phoneNumber + 'Button was pressed')

            await fetch(    
              'https://dev.stedi.me/twofactorlogin/'+ phoneNumber,
             {
             
             method:'POST',
             headers:{
               'content-type' : 'application/text'
             }
           }
           )
            
          }}
        />
<TextInput
        value={tempCode}
        onChangeText={setTempCode}
        style={styles.input2}
        placeholderTextColor='#4251f5'
        placehoder='Enter Code'>
        </TextInput>
        <Button
          title='Verify'
          style={styles.button}
          onPress={async()=>{
            console.log('Button 2 was pressed')

            const loginResponse = await fetch(
              'https://dev.stedi.me/twofactorlogin',
             {
             
             method:'POST',
             headers:{
               'content-type' : 'application/text'
             },
             body:JSON.stringify({
              phoneNumber,
              oneTimePassword:tempCode
             })
           }
           )
            console.log("status", loginResponse.status)

            if(loginResponse.status == 200){
              const sessionToken = await loginResponse.text();
              console.log('Session token', sessionToken)
              setIsLoggedIn(true);
            }
            else(
              Alter.alter("Warning", 'An invalid Code was entered.')
            )
          }}
        />


      </View>
  )}
}
 export default App;
 const styles = StyleSheet.create({
  container:{
      flex:1, 
      alignItems:'center',
      justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 100,
    borderWidth: 1,
    padding: 10,
    
  },
  input2: {
    height: 40,
    margin: 12,
    marginTop: 50,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }    
})
