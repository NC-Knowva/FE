import { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView, Pressable, Appearance, Platform, SafeAreaView, FlatList } from "react-native";
import { useRouter } from 'expo-router'
import { Link } from "expo-router"

import { Colors } from "../constants/Colors";
import reactLogo from '../assets/images/react-logo.png'
import backgroungImg from '@/assets/images/adaptive-icon.png'
import numbersImages from "../constants/Images";
import ImageList from './ImageList';

//Shuffle images 
const shuffleImages = (array) => {
    let currentIndex = array.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      //console.log(randomIndex)
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }  
    return (array)
}
//Generates some random indices to to select images
const getRandomIndices = (data, indNum) => {
    let randomIndices = []

    for (let i = 0; i < indNum; i++) {
        const randNum = Math.floor(Math.random() * data.length)

        if (randomIndices.includes(randNum))
            i--
        else
            randomIndices.push(randNum)
    }
    return randomIndices
}
//Get images from the random indices
const getImagesToDisplay = (data, indices) => {
    return (indices.map((index) => data[index]))
}


const HomeScreen = () => {
    const colorScheme = Appearance.getColorScheme()
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView
    const router = useRouter()

    //const [displayedImg, setDisplayedImg] = useState(0) //initial state

    const randIndices = getRandomIndices (numbersImages, 8)
    const selectedImages = getImagesToDisplay (numbersImages, randIndices)
    const imagesData = shuffleImages([...selectedImages, ...selectedImages])
    //console.log(imagesData)
    //console.log(numbersImages[0].uri, reactLogo)
     
    return (
        <Container >
                <View>
                    {/* <Text>Press on image to start </Text> */}
                </View>
                <ImageList imagesData={imagesData} imgStyle= {styles.image}/>
        </Container>
    );

//   return (
//       <View style={styles.container}>
//         <ImageBackground 
//         source={backgroungImg}
//         resizeMode="cover"
//         style={styles.backImg}
//         >
//             <ScrollView contentContainerStyle={{
//                 flexDirection: "row",
//                 flexWrap: "wrap",
//                 justifyContent: "center",
//                 }}
//                 horizontal={false}>
//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[0]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[4]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[1]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[6]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[2]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[3]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[5]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[8]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[0]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[4]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[1]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[5]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[6]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[7]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[2]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[8]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[3]} style={styles.image}></Image>
//                 </Pressable>

//                 <Pressable onPress={() =>{console.log('pressed .....')}}>
//                     <Image source={numbersImages[7]} style={styles.image}></Image>
//                 </Pressable>

//           </ScrollView>
                 
//         </ImageBackground>
//     </View>
//   );
}

const styles =  
     StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: '#f8f9fa',
        },
        image: {
            width: 80,
            height: 80,
            marginBottom: 20,
            marginHorizontal: 'auto',
            borderRadius:10,
            justifyContent: 'center',
            alignItems: "center",
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 20,
            overflow: 'hidden',
            marginHorizontal: 'auto',
        },
        backImg: {
            width: '100%',
            height: '100%',
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: '#333'
        },
        link: {
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 10,
            marginHorizontal: 'auto',
            textAlign: 'center',
            color: '#333'
        },
        subtitle: {
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            marginBottom: 20,
        },
        button: {
            backgroundColor: '#007bff',
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 8,
            alignItems:'center',
        },
        buttonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold'
        },
    }) 

export default HomeScreen