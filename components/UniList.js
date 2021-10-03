//Her importere jeg de nødvendige dependencies for projektet.
import { StyleSheet, Text, View, FlatList} from 'react-native';
import * as React from 'react';
import firebase from "firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import Add_Universities from './Add_Universities';
import {useEffect, useState} from "react";

// Opretter UniList komponenten

const UniList = () => { 

    const [University, setUniversity] = useState();

//Der anvendeds .on for at kunne tilgå data i firebase

    useEffect(() => {
        if(!University){
            firebase
                .database()
                .ref('University')
                .on('value', snapshot => {
                    setUniversity(snapshot.val())
                });
        }
    }, []);

    //Guldkorn fra øvelser som får koden til, at køre assynkront - da applikationen loader før databasen.
    if(!University){
        return <Text>Loading...</Text>
    }
    return (
        //Der oprettes tekstelementer for at vise universitetet fra firbase databasen.
        <View>
          
               <Text>{University.School}</Text>
               <Text>{University.Location}</Text>
               <Text>{University.Education}</Text>
               
           
       </View>
    );
};

//Funktionen ekspoteres, så den kan bruges i app.js
export default UniList; 
