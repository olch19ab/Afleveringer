//Her importere jeg de nødvendige dependencies for projektet.
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import Add_Universities from "./components/Add_Universities";
import UniList from "./components/UniList";
import Icon from 'react-native-vector-icons/Ionicons';
import { getDatabase } from "firebase/database";


// Dette er config-oplysningerne, som jeg har fra min firebase database
const firebaseConfig = {
  apiKey: "AIzaSyDAP_XHPJdwjMhJW8we7UJsjjDhSPkFIds",
  authDomain: "exercise-5-v2.firebaseapp.com",
  databaseURL: "https://exercise-5-v2-default-rtdb.firebaseio.com",
  projectId: "exercise-5-v2",
  storageBucket: "exercise-5-v2.appspot.com",
  messagingSenderId: "378224061040",
  appId: "1:378224061040:web:2071f934a9ca3606a9e2b5"
};

// Konstanter for stac- og tabnavigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

// Her initialisere jeg applikationen

export default function App() {
  
  function StackNavigation() {

    return (

      // Stack.navigatoren med de to tilhørended screens, for de to sides i projektet.

      <Stack.Navigator>
        
  
        <Stack.Screen name="UniList" component={UniList} />
       
        
        <Stack.Screen name="Add_Universities" component={Add_Universities} />

      
      </Stack.Navigator>
    );
  }

  return (
    // Her retunere jeg de to tab screens, som er menu bare ikonerne i applikationen.
<NavigationContainer>
        <Tab.Navigator>
           
           <Tab.Screen name={'University List'} component={UniList} options={{tabBarIcon: () => ( <Icon name="home" size={32}/>)}}/>
           <Tab.Screen name={'Add'} component={Add_Universities} options={{tabBarIcon: () => ( <Icon name="book" size={20} />)}}/>

        </Tab.Navigator>
      </NavigationContainer>
   
  );
}


