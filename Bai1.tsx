import { Button, StyleSheet, Text, View, Image, Alert, PermissionsAndroid } from 'react-native'
import React from 'react'
import { OptionsCommon } from 'react-native-image-picker'
import * as ImagePicker from 'react-native-image-picker';

const Bai1 = () => {
    const [response, setResponse] = React.useState<any>(null);

   const checkCamera = async()=>{
     try {
        const result:any = await ImagePicker.launchCamera({mediaType: 'photo', cameraType: 'back'})
        console.log(result.assets[0].uri)
        setResponse(result.assets[0].uri)
     } catch (error) {
        console.log(error)
     }
   }

   const checkLibrary = async()=>{
    try {
       const result:any = await ImagePicker.launchImageLibrary({mediaType: 'photo'})
       console.log(result.assets[0].uri)
       setResponse(result.assets[0].uri)
    } catch (error) {
       console.log(error)
    }
  }
  return (
    <View style ={{ alignItems: 'center'}}>
        <Image 
        source={{uri: response || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSErd3GQcEwGOfzFCIS2BdXBdOHHPIFwTBdMg&usqp=CAU'}}
        style = {styles.image}
        />

      <Button title='Chup anh' onPress={() => checkCamera()}/>
      <Button title='Chon anh' onPress={() => checkLibrary()}/>
    </View>
  )
}

const commonOption: OptionsCommon = {
    mediaType:'photo',
    maxWidth: 500,
    maxHeight: 500,
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'aliceblue',
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 8,
    },
    imageContainer: {
      marginVertical: 24,
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
    },
  });

export default Bai1

