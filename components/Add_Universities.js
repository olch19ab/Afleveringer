//Her importere jeg de nødvendige dependencies for projektet.
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import { getDatabase } from "firebase/database";


// Opretter Add_Universities komponenten
const Add_Universities = ({navigation,route}) => { 
    
    const initialState = { School: '', Location: '', Education: ''}

    const [newUni,setNewUni] = useState(initialState);

    const isEditUni = route.name === "Edit University";

    useEffect(() => {
        if(isEditUni){
            const University = route.params.University[1];
            setNewUni(University)
        }
       
        return () => {
            setNewUni(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewUni({...newUni, [name]:event})
    }


    //HandleSave funktionen er ansvarlig for at tilføje data Firebase.
const handleSave = () => {
    
    const {School, Location, Education} = newUni;

    if(School.length === 0 || Location.length === 0 || Education.length === 0){
return ('One the the inputs are missing')
    }

    if(isEditUni){
        const id = route.params.University[0];
//Firebase push anvendedns for at tilføje data til firebase
        try{
            firebase.database().ref(`University`).push({School, Location, Education});
            const University = [id, newUni]
            navigation.navigate("UniList", {University});
        }
        catch (error) {
            console.log(error);
        }
//Firebase set anvendes for at opdatere data i firebase.
    }else{
        firebase.database().ref(`University`).set({School, Location, Education});
        setNewUni(initialState);
    }
    }

    //Her oprettes der et to forskellige view for at vise inputfelterne.
    //Der anvendes også map, for at lave en inputfelt for hver attribut af intitial state.
    return (
        <SafeAreaView>
        <ScrollView>
            {
                Object.keys(initialState).map((key,index) =>{
                    return(
                        <View>
                            <Text></Text>
                            <TextInput
                                value={newUni[key]}
                                onChangeText={(event) => changeTextInput(key,event)}
                            />
                        </View>
                    )
                })
            }
        
            <Button title={ isEditUni ? "Save changes" : "Add University"} onPress={() => handleSave()} />
        </ScrollView>
    </SafeAreaView>
);

};

//Funktionen ekspoteres, så den kan bruges i app.js
export default Add_Universities; 

