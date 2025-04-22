import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const QuizOptions = ({option, isSelected, isSelectedAnswer}) => {

    const handleSelected = () => {
        isSelectedAnswer()
    }

  return (
    <TouchableOpacity onPress={handleSelected} activeOpacity={0.7} style={[styles.options, {backgroundColor: isSelected? '#109F00' : '#fff'}]}>
      <Text style={{fontWeight: '500'}}>{option}</Text>
    </TouchableOpacity>
  )
}

export default QuizOptions

const styles = StyleSheet.create({
    options: {
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: 20,
    }
})