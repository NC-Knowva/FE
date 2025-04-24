import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

const QuizResults = ({
  score,
  len,
  setCurrQuestionIndex,
  setScore,
  setPercentageAnswered,
  setShowResult,
  SetSelectedAnswer,
}) => {
  const router = useRouter();

  function handleReset(
    setCurrQuestionIndex,
    setScore,
    setPercentageAnswered,
    setShowResult,
    SetSelectedAnswer
  ) {
    setCurrQuestionIndex(0);
    setScore(0);
    setPercentageAnswered(0);
    setShowResult(false);
    SetSelectedAnswer({
      A: false,
      B: false,
      C: false,
      D: false,
    });
    router.navigate(`../quiz`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.Wrapper}>
        <Text style={{ fontWeight: "500", fontSize: 16, color: "#004643" }}>
          You completed the Quiz
        </Text>
        <Text style={{ marginVertical: 20, fontWeight: "500" }}>
          {" "}
          Your score is:{" "}
        </Text>
        <Text style={{ fontWeight: "650", fontSize: 16, color: "#004643" }}>
          {score} / {len}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.actionButton}
          onPress={() => {
            handleReset(
              setCurrQuestionIndex,
              setScore,
              setPercentageAnswered,
              setShowResult,
              SetSelectedAnswer
            );
          }}
        >
          <Text>Play Again</Text>
        </Pressable>

        <Link style={styles.actionButton} href="/revision" asChild>
          <Pressable>
            <Text>Exit</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default QuizResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c4c4c4",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  Wrapper: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    width: 100,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
});
