import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { React, useState } from "react";
import { Stack } from "expo-router";

import ItemsSelect from "@/components/ItemsSelect";

function handleSubmit(
  name,
  topic,
  description,
  education,
  visibility,
  questions
) {
  const data = {
    name,
    topic: topic.name,
    description,
    education: education.name,
    visibility: visibility.name,
    questions,
  };
  console.log(data);
}

function PackData({
  onChangeName,
  name,
  onChangeTopic,
  topic,
  onChangeDescription,
  description,
  onChangeEducation,
  education,
  onChangeVisibility,
  visibility,
}) {
  const topics = [
    { name: "Maths", id: 1 },
    { name: "Art", id: 2 },
  ];

  const educationLevels = [
    { name: "GCSE", id: 1 },
    { name: "A-Level", id: 2 },
    { name: "Degree", id: 3 },
  ];

  const visibilityOptions = [
    { name: "Private", id: 1 },
    { name: "Public", id: 2 },
  ];

  return (
    <>
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Pack Name:</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={onChangeName}
          value={name}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Topic:</Text>
        <ItemsSelect
          items={topics}
          itemSelected={topic}
          setItemSelected={onChangeTopic}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Description:</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={onChangeDescription}
          value={description}
          multiline={true}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Education Level:</Text>
        <ItemsSelect
          items={educationLevels}
          itemSelected={education}
          setItemSelected={onChangeEducation}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Pack Visibility:</Text>
        <ItemsSelect
          items={visibilityOptions}
          itemSelected={visibility}
          setItemSelected={onChangeVisibility}
        />
      </View>
    </>
  );
}

function handleChangeText(
  prevQuestions,
  onChangeQuestions,
  text,
  index,
  isAnswer
) {
  const questions = prevQuestions.map((element, i) => {
    if (i === index) {
      if (isAnswer) {
        return { question: element.question, answer: text };
      } else {
        return { question: text, answer: element.answer };
      }
    } else {
      return element;
    }
  });
  onChangeQuestions(questions);
}

function QuestionInputs({ questions, onChangeQuestions }) {
  const length = [];
  for (let i = 0; i < questions.length; i++) {
    length.push(i);
  }
  return (
    <View>
      {length.map((index) => {
        if (index === 0) {
          return (
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Question:</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={(text) =>
                  handleChangeText(
                    questions,
                    onChangeQuestions,
                    text,
                    index,
                    false
                  )
                }
                value={questions[0].question}
              />

              <Text style={styles.inputLabel}>Answer:</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={(text) =>
                  handleChangeText(
                    questions,
                    onChangeQuestions,
                    text,
                    index,
                    true
                  )
                }
                value={questions[0].answer}
                multiline={true}
              />
            </View>
          );
        } else {
          return (
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Question:</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={(text) =>
                  handleChangeText(
                    questions,
                    onChangeQuestions,
                    text,
                    index,
                    false
                  )
                }
                value={questions[index].question}
              />

              <Text style={styles.inputLabel}>Answer:</Text>
              <TextInput
                style={styles.inputBox}
                multiline={true}
                onChangeText={(text) =>
                  handleChangeText(
                    questions,
                    onChangeQuestions,
                    text,
                    index,
                    true
                  )
                }
                value={questions[index].answer}
              />

              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  onChangeQuestions(
                    questions.filter((element, i) => {
                      return i !== index;
                    })
                  );
                }}
              >
                <Text style={styles.deleteButtonText}>Delete Question</Text>
              </Pressable>
            </View>
          );
        }
      })}
    </View>
  );
}

export default function newCard() {
  const [name, onChangeName] = useState("");
  const [topic, onChangeTopic] = useState("");
  const [description, onChangeDescription] = useState("");
  const [education, onChangeEducation] = useState("");
  const [visibility, onChangeVisibility] = useState("");
  const [questions, onChangeQuestions] = useState([
    { question: "", answer: "" },
  ]);

  return (
    <ScrollView>
      <Stack.Screen options={{ title: "Create Card Pack" }} />

      <PackData
        onChangeName={onChangeName}
        name={name}
        onChangeTopic={onChangeTopic}
        topic={topic}
        onChangeDescription={onChangeDescription}
        description={description}
        onChangeEducation={onChangeEducation}
        education={education}
        onChangeVisibility={onChangeVisibility}
        visibility={visibility}
      />

      <QuestionInputs
        questions={questions}
        onChangeQuestions={onChangeQuestions}
      />

      <Pressable
        style={styles.addButton}
        onPress={() =>
          onChangeQuestions([...questions, { question: "", answer: "" }])
        }
      >
        <Text style={styles.addButtonText}>Add another Question</Text>
      </Pressable>
      <Pressable
        style={styles.submitButton}
        onPress={() => {
          handleSubmit(
            name,
            topic,
            description,
            education,
            visibility,
            questions
          );
        }}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    backgroundColor: "#bfbfbd",
    margin: 10,
  },
  inputLabel: {
    marginLeft: 10,
    marginTop: 10,
  },
  inputBox: {
    backgroundColor: "white",
    borderWidth: 1,
    margin: 10,
  },
  addButton: { margin: 10, width: 150 },
  addButtonText: {
    backgroundColor: "white",
    padding: 5,
    borderWidth: 1,
  },
  submitButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  submitButtonText: {
    backgroundColor: "lightgreen",
    padding: 20,

    fontSize: 20,
    borderWidth: 1,
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  deleteButtonText: {
    backgroundColor: "red",
    padding: 10,
    borderWidth: 1,
  },
});
