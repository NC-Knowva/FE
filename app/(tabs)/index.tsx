import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { createContext, useContext, useState } from "react";
import { Redirect, Link } from "expo-router";
import { UserContext } from "../../context/User";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function HomeScreen() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  if (user) {
    return (
      <ScrollView>
        <SafeAreaView>
          {/* <Text>Home</Text>
            <Text>Username: {user.username}</Text>
            <Text>User Name: {user.name}</Text> */}

          <View style={styles.container}>
            <Text style={styles.title}>Daily Revision Progress</Text>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require("../../assets/images/percentageLoading.png")}
                />
              </View>

              <View style={styles.activityInfoContainer}>
                <Text style={styles.activityInfo}>Activity Information:</Text>
                {[
                  { key: "History 15%" },
                  { key: "French 87%" },
                  { key: "Chemistry 54%" },
                ].map((item, index) => (
                  <Text key={index}>{`\u2022 ${item.key}`}</Text>
                ))}

                {/* <FlatList
                  data={[
                    { key: "History 15%" },
                    { key: "French 87%" },
                    { key: "Chemistry 54%" },
                  ]}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <Text>{`\u2022 ${item.key}`}</Text>
                      </View>
                    );
                  }}
                /> */}
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Continue Activity</Text>
            <View style={styles.row}>
              <Link style={styles.subjectButton} href="/revision" asChild>
                <Pressable>
                  <Text>Maths</Text>
                </Pressable>
              </Link>
              <Link style={styles.subjectButton} href="/revision" asChild>
                <Pressable>
                  <Text>English</Text>
                </Pressable>
              </Link>
              <Link style={styles.subjectButton} href="/revision" asChild>
                <Pressable>
                  <Text>Economics</Text>
                </Pressable>
              </Link>
            </View>
            <Link style={styles.button} href="/revision" asChild>
              <Pressable>
                <Text>See More...</Text>
              </Pressable>
            </Link>
          </View>

          <View style={styles.exams}>
            <Link style={styles.examContainer} href="/calendar" asChild>
              <Pressable>
                <View style={styles.row}>
                  <View style={styles.examButton}>
                    <Text>Art </Text>
                  </View>
                  <View style={styles.column}>
                    <Text>Impressionism II</Text>
                    <Text> 5 days away</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}> 21st April at 9:00am</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
            <Link style={styles.examContainer} href="/calendar" asChild>
              <Pressable>
                <View style={styles.row}>
                  <View style={styles.examButton}>
                    <Text>Maths </Text>
                  </View>
                  <View style={styles.column}>
                    <Text>Number Theory I</Text>
                    <Text> 6 days away</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}> 22st April at 9:00am</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
            <Link style={styles.examContainer} href="/calendar" asChild>
              <Pressable>
                <View style={styles.row}>
                  <View style={styles.examButton}>
                    <Text>Chemistry </Text>
                  </View>
                  <View style={styles.column}>
                    <Text>Alkenes</Text>
                    <Text> 3 weeks away</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}> 7th May at 10:00am</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Friend Activity</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  } else {
    return <Redirect href="../loginUser" />;
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "lightgrey",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    height: "auto",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  exams: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 5,
  },
  imageContainer: {
    flex: 1,
    flexGrow: 1,
  },
  image: {
    width: "auto",
    height: 130,
    objectFit: "contain",
  },
  activityInfo: {
    fontSize: 16,
    paddingBottom: 5,
  },
  activityInfoContainer: {
    flex: 1,
    flexGrow: 1,
  },
  button: {
    backgroundColor: "white",
    alignItems: "center",
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  subjectButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: 100,
    height: 80,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  examButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  examContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "lightblue",
    padding: 5,
  },
  date: {
    color: "grey",
    fontSize: 12,
    textAlign: "center",
    padding: 10,
  },
  dateContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
