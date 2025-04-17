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

const dummyUser = {
  username: "iheartsocio",
  name: "sara",
  avatar_img_url:
    "https://i.pinimg.com/236x/a9/24/01/a924011ac7bbcf9159a7544abb1def06.jpg",
  message: "bvcxb xcbxkjbxcvj ibpxvc gfsdddddd ddddddddd",
  timestamp: "2024-10-04T00:00:00.000Z",
};

function TimeAgo({ timestamp }) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 360 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return (
        <Text>
          {interval} {unit.name}
          {interval !== 1 ? "s" : ""} ago
        </Text>
      );
    }
  }
  return <Text>Just now</Text>;
}

function FriendActivity({ user }) {
  return (
    <View style={styles.row}>
      <View style={styles.friendImageContainer}>
        <Image
          style={styles.friendAvatarImage}
          source={{ uri: user.avatar_img_url }}
        />
      </View>
      <View style={styles.activityInfoContainer}>
        <TimeAgo timestamp={user.timestamp} />
        <Text>
          <Text style={styles.friendName}>{user.name} </Text>
          <Text>sent a message</Text>
        </Text>
        <Text style={styles.friendUsername}>@{user.username}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  if (user) {
    return (
      <ScrollView>
        <SafeAreaView>
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
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Continue Activity</Text>
            <View style={styles.activityRow}>
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

          <View style={styles.friendActivityContainer}>
            <Text style={styles.title}>Friend Activity</Text>
            <View style={styles.friendContainer}>
              <FriendActivity user={dummyUser} />
            </View>
            <View style={styles.friendContainer}>
              <FriendActivity user={dummyUser} />
            </View>
            <View style={styles.friendContainer}>
              <FriendActivity user={dummyUser} />
            </View>
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
    marginRight: 8,
  },
  stepContainer: {
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
    paddingVertical: 10,
    width: "100%",
  },
  friendContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 4,
    backgroundColor: "linen",
    padding: 6,
    borderRadius: 5,
    width: "90%",
    maxWidth: 600,
  },
  friendActivityContainer: {
    backgroundColor: "lightgrey",
    paddingTop: 10,
    paddingBottom: 60
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
  },
  exams: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  imageContainer: {
    flex: 1,
  },
  friendImageContainer: {
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },
  activityInfo: {
    fontSize: 16,
    paddingBottom: 5,
  },
  activityInfoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "white",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
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
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  examContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 5,
    width: "90%",
    maxWidth: 600,
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
    paddingHorizontal: 10,
  },
  friendAvatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  friendName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  friendUsername: {
    fontSize: 13,
    color: "grey",
  },
});
