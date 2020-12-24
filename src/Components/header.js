import * as React from 'react';
import { Text, View,StyleSheet, } from 'react-native';

export default function header (){
   return(
    <View style={styles.header}>
        
        <Text style={{fontWeight:'bold',backgroundColor:'white',borderRadius:15,}}>  $  </Text>
        
    <Text style={{color:'white',fontWeight:'bold'}}>  US Dollar</Text>
    
    </View>
   )
}
const styles = StyleSheet.create({
  header:{
      flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#2e2e2e',
    width:'100%',
    height:'15%'
  }
})