//import { SafeAreaView } from "react";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import quizData from "@/constants/quizQuestions.json";

import QuizResults from "@/components/quizResults";
import QuizOptions from "@/components/quizOptions";

import { shuffleEntries, getDataToDisplay, getRandomIndices } from "./utils";

// const randIndices = getRandomIndices(quizData.length, 10);
// //const selectedQuizData = getDataToDisplay (quizData, randIndices)
// const Data = getDataToDisplay(quizData, randIndices); //shuffleEntries(selectedQuizData)
let randIndices = getRandomIndices(quizData.length, 10);
let Data = getDataToDisplay(quizData, randIndices);

const Quiz = () => {
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [percentageAnswered, setPercentageAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, SetSelectedAnswer] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      randIndices = getRandomIndices(quizData.length, 10);
      Data = getDataToDisplay(quizData, randIndices);
    }, [showResult])
  );

  const selectedAnswerA = () => {
    SetSelectedAnswer({ A: true, B: false, C: false, D: false });
  };
  const selectedAnswerB = () => {
    SetSelectedAnswer({ A: false, B: true, C: false, D: false });
  };
  const selectedAnswerC = () => {
    SetSelectedAnswer({ A: false, B: false, C: true, D: false });
  };
  const selectedAnswerD = () => {
    SetSelectedAnswer({ A: false, B: false, C: false, D: true });
  };

  useEffect(() => {
    let percentage = ((currQuestionIndex + 1) / Data.length) * 100;
    setPercentageAnswered(percentage);
  }, [currQuestionIndex]);

  let currQuestion = Data[currQuestionIndex].question;

  const handleNext = () => {
    let correctAnswer = Data[currQuestionIndex].answer;

    if (
      Object.keys(selectedAnswer).find(
        (key) => selectedAnswer[key] === true
      ) === correctAnswer
    )
      setScore((prev) => prev + 1);

    if (currQuestionIndex < Data.length - 1) {
      setCurrQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    SetSelectedAnswer({ A: false, B: false, C: false, D: false });
  };

  if (showResult) {
    return (
      <QuizResults
        score={score}
        len={Data.length}
        setCurrQuestionIndex={setCurrQuestionIndex}
        setScore={setScore}
        setPercentageAnswered={setPercentageAnswered}
        setShowResult={setShowResult}
        SetSelectedAnswer={SetSelectedAnswer}
      />
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.countWrapper}>
          <Text style={{ fontWeight: "500" }}>
            {currQuestionIndex + 1}/{Data.length}
          </Text>
        </View>

        <View style={styles.questionWrapper}>
          <View style={styles.progressWrapper}>
            <View
              style={[styles.progressBar, { width: `${percentageAnswered}%` }]}
            ></View>
            <View style={styles.progressCount}>
              <Text style={styles.percentage}>{percentageAnswered}%</Text>
            </View>
          </View>
          <Text style={{ fontWeight: "500", textAlign: "center" }}>
            {currQuestion}
          </Text>
        </View>

        <View style={styles.optionsWrapper}>
          <QuizOptions
            isSelectedAnswer={selectedAnswerA}
            isSelected={selectedAnswer.A}
            option={Data[currQuestionIndex].A}
          />
          <QuizOptions
            isSelectedAnswer={selectedAnswerB}
            isSelected={selectedAnswer.B}
            option={Data[currQuestionIndex].B}
          />
          <QuizOptions
            isSelectedAnswer={selectedAnswerC}
            isSelected={selectedAnswer.C}
            option={Data[currQuestionIndex].C}
          />
          <QuizOptions
            isSelectedAnswer={selectedAnswerD}
            isSelected={selectedAnswer.D}
            option={Data[currQuestionIndex].D}
          />
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.7}
          style={styles.quizBtn}
        >
          <Text style={{ color: "#fff", fontWeight: "500" }}> Next </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edede4",
    padding: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  countWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  questionWrapper: {
    marginTop: 30,
    width: "100%",
    height: 180,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    alignItems: "center",
  },
  progressWrapper: {
    width: 70,
    height: 70,
    backgroundColor: "#ABD1C6",
    borderRadius: 50,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    marginBottom: "30",
    marginTop: -50,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#884643",
    alignSelf: "flex-end",
    //width: '65%'
  },
  progressCount: {
    height: 58,
    width: 58,
    borderRadius: 50,
    backgroundColor: "#fff",
    zIndex: 10,
    position: "absolute",
    top: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    fontWeight: "500",
    fontSize: 18,
    color: "#884643",
  },
  optionsWrapper: {
    marginTop: 30,
    width: "100%",
  },
  quizBtn: {
    width: "100%",
    height: 45,
    borderRadius: 15,
    backgroundColor: "#004643",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Quiz;
