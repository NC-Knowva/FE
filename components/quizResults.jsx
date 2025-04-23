import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const QuizResults = ({score, len}) => {
  return (
    <View style={styles.container}>
        <View style={styles.Wrapper}>
            <Text style={{fontWeight:'500', fontSize:16, color:'#004643'}}>You completed the Quiz</Text>
            <Text style={{marginVertical: 20, fontWeight: '500', }}> Your score is: </Text>
            <Text style={{fontWeight: '650', fontSize: 16, color: '#004643'}}>{score} / {len}</Text>
        </View>
    </View>
  )
}

export default QuizResults

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c4c4c4',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Wrapper: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius:15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    
})